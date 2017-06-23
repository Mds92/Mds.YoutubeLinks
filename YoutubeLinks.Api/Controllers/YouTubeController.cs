using System;
using System.Web;
using System.Linq;
using System.Web.Http;
using Newtonsoft.Json;
using OpenQA.Selenium;
using System.Collections;
using OpenQA.Selenium.Chrome;
using YoutubeLinks.Api.Models;
using YoutubeLinks.Api.Filters;
using System.Collections.Generic;
using OpenQA.Selenium.Support.UI;
using System.Diagnostics;
using System.Threading.Tasks;
using VideoLibrary;
using ZetaLongPaths;

namespace YoutubeLinks.Api.Controllers
{
    [RequestAuthorization]
    public class YouTubeController : BaseController
    {
        private YoutubeVideoPageModel GetLinksArchived(YoutubeGetLinksModel model)
        {
            if (!ModelState.IsValid)
                throw new Exception("Data is invalid");

            var chromeDriverExePath = ZlpPathHelper.Combine(HttpRuntime.AppDomainAppPath, "Assets");
            var chromeDriverService = ChromeDriverService.CreateDefaultService(chromeDriverExePath);
            chromeDriverService.SuppressInitialDiagnosticInformation = true;

            var chromeOptions = new ChromeOptions();
            chromeOptions.AddArgument("--log-level=3");

            var youtubeVideoPageModel = new YoutubeVideoPageModel();
            Exception exception = null;

            using (var chromeDriver = new ChromeDriver(chromeDriverService, chromeOptions))
            {
                try
                {
                    chromeDriver.Navigate().GoToUrl(model.VideoUrl);
                    var webDriverWait = new WebDriverWait(chromeDriver, TimeSpan.FromSeconds(5));
                    webDriverWait.Until(ExpectedConditions.ElementExists(By.Id("player-mole-container")));
                    var js = (IJavaScriptExecutor)chromeDriver;
                    var videosObjectList = (IList)js.ExecuteScript(
                        @"return ytplayer.config.args.url_encoded_fmt_stream_map
                            .split(',')
                            .map(item => item
                            .split('&')
                            .reduce((prev, curr) => (curr = curr.split('='),
                                Object.assign(prev, {[curr[0]]: decodeURIComponent(curr[1])})
                            ), {}))");
                    var pageTitle = (string)js.ExecuteScript(@"return document.title");
                    var videosObjectJson = JsonConvert.SerializeObject(videosObjectList);
                    var internalVideos = JsonConvert.DeserializeObject<List<YoutubeVideoInternalModel>>(videosObjectJson);
                    youtubeVideoPageModel.PageTitle = pageTitle.Trim();
                    youtubeVideoPageModel.Links.AddRange(internalVideos.Select(youtubeVideoInternalModel => new YoutubeLinkModel
                    {
                        ITag = youtubeVideoInternalModel.itag,
                        DownloadUrl = youtubeVideoInternalModel.url.ToBase64(),
                        Quality = youtubeVideoInternalModel.quality.FirstCharToUpper(),
                        Title = youtubeVideoInternalModel.quality.FirstCharToUpper(),
                        Type = youtubeVideoInternalModel.type.FirstCharToUpper()
                    }));
                }
                catch (Exception ex)
                {
                    exception = ex;
                }
            }
            if (exception != null) throw exception;
            return youtubeVideoPageModel;
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

            return videos.OrderByDescending(q => q.Resolution).ToList();
        }

        [HttpPost]
        public string DownloadVideo(YoutubeDownloadModel model)
        {
            if (!ModelState.IsValid)
                throw new Exception("Data is invalid");
            var youtube = YouTube.Default;
            var allVideos = youtube.GetAllVideos(model.VideoUrl).ToList();
            var video = allVideos.FirstOrDefault(q => q.FormatCode == model.FormatCode);
            if (video == null)
                throw new Exception("Selected video not found");
            var destinationDirectory = ZlpPathHelper.Combine(HttpRuntime.AppDomainAppPath, "DownloadTemp");
            var videoFileName = ZlpPathHelper.Combine(destinationDirectory, $"{video.Title.RemoveIllegalCharsForUrl()}-{Guid.NewGuid()}{video.FileExtension}");
            YouTubeVideo sound = null;
            if (video.AudioFormat == AudioFormat.Unknown)
            {
                sound = allVideos.FirstOrDefault(q => q.Resolution < 0 && q.AudioFormat != AudioFormat.Unknown && q.Format == VideoFormat.Mp4);
                if (sound == null)
                    throw new Exception("Selected video not found");
            }
            var downloadVideoTask = Task.Run(() =>
            {
                Aria2Downloader.DownloadFile(video.Uri, videoFileName, "", 0, message => { Trace.Write(message); });
            });
            Task downloadSoundTask = null;
            if (sound != null)
            {
                var soundFileName = ZlpPathHelper.Combine(destinationDirectory, $"Sound-{sound.Title.RemoveIllegalCharsForUrl()}-{Guid.NewGuid()}{sound.FileExtension}");
                downloadSoundTask = Task.Run(() =>
                {
                    Aria2Downloader.DownloadFile(sound.Uri, soundFileName, "", 0, message => { Trace.Write(message); });
                });
            }
            downloadVideoTask.Wait();
            downloadSoundTask?.Wait();

            return "/DownloadTemp/Angular-2-Tutorial-1-Introduction-YouTube_5923fd9f-4499-4c21-9a53-fea29cc003cb.mp4";
        }
    }
}
