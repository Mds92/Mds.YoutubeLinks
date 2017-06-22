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

namespace YoutubeLinks.Api.Controllers
{
    [RequestAuthorization]
    public class YouTubeController : BaseController
    {
        [HttpPost]
        public List<YoutubeVideoModel> GetLinks(YoutubeGetLinksModel model)
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
            //        Type = "Video",
            //        DownloadUrl = ""
            //    },
            //    new YoutubeVideoModel
            //    {
            //        ITag = "33",
            //        Title = "Test2",
            //        Quality = "Mp4",
            //        Type = "Video",
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

            var videos = new List<YoutubeVideoModel>();
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
                    var videosObjectJson = JsonConvert.SerializeObject(videosObjectList);
                    var internalVideos = JsonConvert.DeserializeObject<List<YoutubeVideoInternalModel>>(videosObjectJson);
                    videos.AddRange(internalVideos.Select(youtubeVideoInternalModel => new YoutubeVideoModel
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
            if(exception != null) throw exception;
            return videos;
        }

        [HttpPost]
        public string DownloadLink(string url)
        {
            if (string.IsNullOrWhiteSpace(url))
                throw new Exception("Data is invalid");
            var plainUrl = url.Base64ToPlainText();

            return "";
        }
    }
}
