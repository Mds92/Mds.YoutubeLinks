using System;
using System.Web;
using System.Linq;
using System.Web.Http;
using YoutubeLinks.Api.Models;
using YoutubeLinks.Api.Filters;
using System.Collections.Generic;
using System.Diagnostics;
using System.Threading.Tasks;
using YoutubeExplode;
using YoutubeExplode.Models;
using YoutubeLinks.Common;
using YoutubeExplode.Models.MediaStreams;
using ZetaLongPaths;

namespace YoutubeLinks.Api.Controllers
{
    [RequestAuthorization]
    public class YouTubeController : BaseController
    {
        private static string NormalizeId(string input)
        {
            if (!YoutubeClient.TryParseVideoId(input, out string id))
                id = input;
            return id;
        }
        private static string NormalizeFileSize(long fileSize)
        {
            string[] units = { "B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB" };
            double size = fileSize;
            var unit = 0;
            while (size >= 1024)
            {
                size /= 1024;
                ++unit;
            }
            return $"{size:0.#} {units[unit]}";
        }
        private static Task<VideoInfo> GetVideoInfo(string videoUrl)
        {
            var youtubeClient = new YoutubeClient();
            return youtubeClient.GetVideoInfoAsync(NormalizeId(videoUrl));
        }

        [HttpPost]
        public async Task<YoutubeVideoInfoModel> GetLinks(YoutubeGetLinksModel model)
        {
            if (!ModelState.IsValid)
                throw new Exception("Data is invalid");
            var videoInfo = await GetVideoInfo(model.VideoUrl);
            var newImageHighResUrl = "";
            if (!string.IsNullOrWhiteSpace(videoInfo.ImageHighResUrl))
            {
                var destinationDirectory = ZlpPathHelper.Combine(HttpRuntime.AppDomainAppPath, "DownloadTemp");
                var thumbnailFilePath = ZlpPathHelper.Combine(destinationDirectory, $"{Guid.NewGuid()}{ZlpPathHelper.GetExtension(videoInfo.ImageHighResUrl)}");
                Aria2Downloader.DownloadFile(videoInfo.ImageHighResUrl, thumbnailFilePath, "", 0, message => { Trace.Write(message); });
                newImageHighResUrl = $"/DownloadTemp/{ZlpPathHelper.GetFileNameFromFilePath(thumbnailFilePath)}";
            }
            var youtubeVideoInfoModel = new YoutubeVideoInfoModel
            {
                Id = videoInfo.Id,
                Title = videoInfo.Title,
                VideoStreams = new List<YoutubeVideoStreamModel>(),
                AudioStreams = new List<YoutubeAudioStreamModel>(),
                AverageRating = Math.Round(videoInfo.AverageRating, 2),
                Description = videoInfo.Description,
                DislikeCount = videoInfo.DislikeCount.ToString().ToMoneyFormat(),
                Duration = $"{videoInfo.Duration.Hours:00}:{videoInfo.Duration.Minutes:00}:{videoInfo.Duration.Seconds:00}",
                ImageThumbnailUrl = newImageHighResUrl,
                LikeCount = videoInfo.LikeCount.ToString().ToMoneyFormat(),
                ViewCount = videoInfo.ViewCount.ToString().ToMoneyFormat()
            };
            youtubeVideoInfoModel.VideoStreams.AddRange(
                videoInfo.VideoStreams
                .Where(q => q.Container == Container.Mp4)
                .Select(q => new YoutubeVideoStreamModel
                {
                    Resolution = $"{q.VideoResolution.Width}×{q.VideoResolution.Height}",
                    Bitrate = q.Bitrate,
                    VideoQuality = q.VideoQualityLabel,
                    Itag = q.Itag,
                    Size = NormalizeFileSize(q.ContentLength)
                }));
            youtubeVideoInfoModel.AudioStreams.AddRange(
                videoInfo.AudioStreams
                    .Where(q => q.Container == Container.Mp4 || q.Container == Container.M4A)
                    .Select(q => new YoutubeAudioStreamModel
                    {
                        Bitrate = q.Bitrate,
                        Itag = q.Itag,
                        Size = NormalizeFileSize(q.ContentLength)
                    }));
            return youtubeVideoInfoModel;
        }

        [HttpPost]
        public async Task<string> DownloadVideo(YoutubeDownloadModel model)
        {
            if (!ModelState.IsValid)
                throw new Exception("Data is invalid");
            var proxy = "";
#if DEBUG
            proxy = "http://127.0.0.1:57716";
#endif
            var videoInfo = await GetVideoInfo(model.VideoUrl);
            if (videoInfo == null)
                throw new Exception("Selected video not found");

            AudioStreamInfo audioStreamInfo = null;
            var audioFilePath = "";
            var destinationDirectory = ZlpPathHelper.Combine(HttpRuntime.AppDomainAppPath, "DownloadTemp");

            if (model.IsAudio)
            {
                audioStreamInfo = videoInfo.AudioStreams.FirstOrDefault(q => q.Itag == model.Itag);
                if (audioStreamInfo == null)
                    throw new Exception("Selected audio not found");
                audioFilePath = ZlpPathHelper.Combine(destinationDirectory, $"{videoInfo.Title.RemoveIllegalCharsForUrl()}-Audio.{audioStreamInfo.Container.ToString().ToLower()}");
                Aria2Downloader.DownloadFile(audioStreamInfo.Url, audioFilePath, proxy, 0, message => { Trace.Write(message); });
                return $"/DownloadTemp/{ZlpPathHelper.GetFileNameFromFilePath(audioFilePath)}";
            }
            var videoStreamInfo = videoInfo.VideoStreams.FirstOrDefault(q => q.Itag == model.Itag);
            if (videoStreamInfo == null)
                throw new Exception("Selected video not found");
            var videoFileName = $"{videoInfo.Title.RemoveIllegalCharsForUrl()}-{videoStreamInfo.VideoQualityLabel}.{videoStreamInfo.Container.ToString().ToLower()}";
            var videoTempFileName = $"{Guid.NewGuid()}.{videoStreamInfo.Container.ToString().ToLower()}";
            var videoTempFilePath = ZlpPathHelper.Combine(destinationDirectory, videoTempFileName);
            var finalVideoFilePath = ZlpPathHelper.Combine(destinationDirectory, videoFileName);
            if (ZlpIOHelper.FileExists(finalVideoFilePath))
                return $"/DownloadTemp/{ZlpPathHelper.GetFileNameFromFilePath(finalVideoFilePath)}";
            var tasks = new List<Task>();
            audioStreamInfo = videoInfo.AudioStreams.OrderByDescending(q => q.Bitrate).FirstOrDefault(q => q.Container == Container.M4A || q.Container == Container.Mp4);
            tasks.Add(Task.Run(() =>
            {
                Aria2Downloader.DownloadFile(videoStreamInfo.Url, videoTempFilePath, proxy, 0, message => { Trace.Write(message); });
            }));
            if (audioStreamInfo != null)
            {
                audioFilePath = ZlpPathHelper.Combine(destinationDirectory, $"{videoInfo.Title.RemoveIllegalCharsForUrl()}-Audio.{audioStreamInfo.Container.ToString().ToLower()}");
                tasks.Add(Task.Run(() =>
                {
                    Aria2Downloader.DownloadFile(audioStreamInfo.Url, audioFilePath, proxy, 0, message => { Trace.Write(message); });
                }));
            }
            Parallel.ForEach(tasks, task => task.Wait());
            if (audioFilePath == "")
            {
                ZlpIOHelper.CopyFile(videoTempFilePath, finalVideoFilePath, true);
                ZlpIOHelper.DeleteFile(videoTempFilePath);
                return $"/DownloadTemp/{ZlpPathHelper.GetFileNameFromFilePath(finalVideoFilePath)}";
            }
            FFmpeg.MergeVideoAudio(videoTempFilePath, audioFilePath, finalVideoFilePath, message => { Trace.Write(message); });
            ZlpIOHelper.DeleteFile(videoTempFilePath);
            return $"/DownloadTemp/{ZlpPathHelper.GetFileNameFromFilePath(finalVideoFilePath)}";
        }
    }
}
