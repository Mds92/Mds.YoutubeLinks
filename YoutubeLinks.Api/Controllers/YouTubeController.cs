using System;
using System.Web;
using System.Linq;
using System.Web.Http;
using YoutubeLinks.Api.Models;
using YoutubeLinks.Api.Filters;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using VideoLibrary;
using ZetaLongPaths;

namespace YoutubeLinks.Api.Controllers
{
    [RequestAuthorization]
    public class YouTubeController : BaseController
    {
        private string GetVideoFileName(YouTubeVideo video, bool useGuid = false)
        {
            if (useGuid)
            {
                return video.Resolution < 0
                    ? $"{video.Title.RemoveIllegalCharsForUrl()}-Audio-{Guid.NewGuid().ToString().RemoveIllegalCharsForUrl()}{video.FileExtension}"
                    : $"{video.Title.RemoveIllegalCharsForUrl()}-{video.Resolution}p-{Guid.NewGuid().ToString().RemoveIllegalCharsForUrl()}{video.FileExtension}";
            }
            return video.Resolution < 0 
                ? $"{video.Title.RemoveIllegalCharsForUrl()}-Audio{video.FileExtension}" 
                : $"{video.Title.RemoveIllegalCharsForUrl()}-{video.Resolution}p{video.FileExtension}";
        }

        [HttpPost]
        public List<YouTubeVideo> GetLinks(YoutubeGetLinksModel model)
        {
            if (!ModelState.IsValid)
                throw new Exception("Data is invalid");

            var youtube = YouTube.Default;
            var videos = youtube.GetAllVideos(model.VideoUrl)
                .Where(q => !string.IsNullOrWhiteSpace(q.FileExtension) && q.Format == VideoFormat.Mp4)
                .ToList();

            // حذف رزولوشن های تکراری فاقد صدا
            foreach (var youTubeVideo in videos.ToList())
            {
                if (youTubeVideo.AudioFormat != AudioFormat.Unknown) continue;
                var theSameResolution = videos.FirstOrDefault(q => q.Resolution == youTubeVideo.Resolution && q.Format == youTubeVideo.Format);
                if (theSameResolution == null) continue;
                if (theSameResolution.AudioFormat != AudioFormat.Unknown)
                    videos.Remove(youTubeVideo);
            }

#if DEBUG
            foreach (var youTubeVideo in videos)
            {
                Trace.WriteLine(youTubeVideo.Uri);
            }
#endif

            return videos.OrderByDescending(q => q.Resolution).ToList();
        }

        [HttpPost]
        public string DownloadVideo(YoutubeDownloadModel model)
        {
            if (!ModelState.IsValid)
                throw new Exception("Data is invalid");
            var proxy = "";
#if DEBUG
            proxy = "http://127.0.0.1:56215";
#endif
            var youtube = YouTube.Default;
            var allVideos = youtube.GetAllVideos(model.VideoUrl).ToList();
            var video = allVideos.FirstOrDefault(q => q.FormatCode == model.FormatCode);
            if (video == null)
                throw new Exception("Selected video not found");
            var destinationDirectory = ZlpPathHelper.Combine(HttpRuntime.AppDomainAppPath, "DownloadTemp");
            var videoFilePath = ZlpPathHelper.Combine(destinationDirectory, GetVideoFileName(video));
            var finalFilePath = ZlpPathHelper.Combine(destinationDirectory, GetVideoFileName(video, true));
            var audioFilePath = "";

            if(ZlpIOHelper.FileExists(videoFilePath))
                return $"/DownloadTemp/{ZlpPathHelper.GetFileNameFromFilePath(videoFilePath)}";

            var tasks = new List<Task>();
            YouTubeVideo audio = null;
            if (video.AudioFormat == AudioFormat.Unknown)
            {
                audio = allVideos.FirstOrDefault(q => q.Resolution < 0 && q.AudioFormat != AudioFormat.Unknown && q.Format == VideoFormat.Mp4);
                if (audio == null)
                    throw new Exception("Selected video not found");
            }
            tasks.Add(Task.Run(() =>
            {
                Aria2Downloader.DownloadFile(video.Uri, videoFilePath, proxy, 0, message => { Trace.Write(message); });
            }));
            if (audio != null)
            {
                audioFilePath = ZlpPathHelper.Combine(destinationDirectory, GetVideoFileName(audio));
                tasks.Add(Task.Run(() =>
                {
                    Aria2Downloader.DownloadFile(audio.Uri, audioFilePath, proxy, 0, message => { Trace.Write(message); });
                }));
            }
            Parallel.ForEach(tasks, task => task.Wait());
            if (audioFilePath != "")
            {
                FFmpeg.MergeVideoAudio(videoFilePath, audioFilePath, finalFilePath, message => { Trace.Write(message); });
                ZlpIOHelper.CopyFile(finalFilePath, videoFilePath, true);
                ZlpIOHelper.DeleteFile(finalFilePath);
            }
            return $"/DownloadTemp/{ZlpPathHelper.GetFileNameFromFilePath(videoFilePath)}";
        }
    }
}
