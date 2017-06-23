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
using ZetaLongPaths;

namespace YoutubeLinks.Api.Controllers
{
    [RequestAuthorization]
    public class YouTubeController : BaseController
    {
        [HttpPost]
        public YoutubeVideoPageModel GetLinks(YoutubeGetLinksModel model)
        {
            if (!ModelState.IsValid)
                throw new Exception("Data is invalid");

            //return new List<YoutubeVideoModel>
            //{
            //    new YoutubeVideoModel
            //    {
            //        ITag = "22",
            //        Title = "Test1",
            //        Quality = "Mp4",
            //        Type = "Video/mp4;+codecs=\"avc1.64001F,+mp4a.40.2\"",
            //        DownloadUrl = ""
            //    },
            //    new YoutubeVideoModel
            //    {
            //        ITag = "33",
            //        Title = "Test2",
            //        Quality = "Mp4",
            //        Type = "Video/webm;+codecs=\"vp8.0,+vorbis\"",
            //        DownloadUrl = ""
            //    },
            //    new YoutubeVideoModel
            //    {
            //        ITag = "44",
            //        Title = "Test3",
            //        Quality = "Mp4",
            //        Type = "Video",
            //        DownloadUrl = ""
            //    },
            //};

            var chromeDriverExePath = ZetaLongPaths.ZlpPathHelper.Combine(HttpRuntime.AppDomainAppPath, "Assets");
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
        public string GetDownloadLink(YoutubeDownloadModel model)
        {
            if (!ModelState.IsValid)
                throw new Exception("Data is invalid");

            var downloadUrl = model.Url.Base64ToPlainText();
            var type = model.Type;
            var destinationDirectory = ZlpPathHelper.Combine(HttpRuntime.AppDomainAppPath, "DownloadTemp");

            // Video/mp4;+codecs="avc1.64001F,+mp4a.40.2"
            var extension = type.Substring(0, type.IndexOf(";", StringComparison.InvariantCultureIgnoreCase));
            extension = extension.Remove(0, extension.IndexOf("/", StringComparison.InvariantCultureIgnoreCase) + 1);
#if !DEBUG
            var fullFileName = ZlpPathHelper.Combine(destinationDirectory, $"{model.PageTitle.RemoveIllegalCharsForUrl()}_{Guid.NewGuid()}.{extension}");
            Aria2Downloader.DownloadFile(downloadUrl, fullFileName, "", 0, message => { Trace.Write(message); });
            return fullFileName.Remove(0, fullFileName.IndexOf("DownloadTemp", StringComparison.InvariantCultureIgnoreCase));
#else
            return "/DownloadTemp/Angular-2-Tutorial-1-Introduction-YouTube_5923fd9f-4499-4c21-9a53-fea29cc003cb.mp4";
#endif
        }
    }
}
