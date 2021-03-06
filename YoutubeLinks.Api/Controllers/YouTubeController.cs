﻿using System;
using System.Web;
using System.Linq;
using System.Web.Http;
using YoutubeLinks.Api.Models;
using YoutubeLinks.Api.Filters;
using System.Collections.Generic;
using System.Data.Entity;
using System.Diagnostics;
using System.Threading;
using System.Threading.Tasks;
using YoutubeExplode;
using YoutubeExplode.Models;
using YoutubeLinks.Common;
using YoutubeExplode.Models.MediaStreams;
using YoutubeLinks.Data;
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
        private static string GetAbsoluteFilePath(string filePath)
        {
            var destinationDirectory = ZlpPathHelper.Combine(HttpRuntime.AppDomainAppPath, "DownloadTemp");
            return ZlpPathHelper.Combine(destinationDirectory, filePath);
        }
        private static string GetRelativeFilePath(string fileName)
        {
            return $"/DownloadTemp/{fileName}";
        }
        private static YoutubeVideoInfoModel GetDummyYoutubeVideoInfoModel()
        {
            return new YoutubeVideoInfoModel
            {
                Id = "1231231",
                AverageRating = 4.75,
                Description = "This is footage that we captured while in Costa Rica at 5K 60FPS. All 4K content is available for commercial licensing upon",
                DislikeCount = "7,306",
                LikeCount = "107,719",
                Title = "COSTA RICA IN 4K 60fps (ULTRA HD) w/ Freefly Movi",
                Duration = "00:05:09",
                ImageThumbnailUrl = "https://dummyimage.com/600x400/000/fff",
                ViewCount = "55,734,114",
                VideoStreams = new List<YoutubeVideoStreamModel>
                {
                    new YoutubeVideoStreamModel
                    {
                        Resolution = "3840×2160",
                        VideoQuality = "4320p",
                        Itag = 1,
                        Bitrate = 4320,
                        Size = "573.8 MB"
                    },
                    new YoutubeVideoStreamModel
                    {
                        Resolution = "3840×2160",
                        VideoQuality = "2160p",
                        Itag = 2,
                        Bitrate = 2160,
                        Size = "669.9 MB"
                    },
                    new YoutubeVideoStreamModel
                    {
                        Resolution = "2560×1440",
                        VideoQuality = "1440p",
                        Itag = 3,
                        Bitrate = 1440,
                        Size = "473.5 MB"
                    },
                    new YoutubeVideoStreamModel
                    {
                        Resolution = "1920×1080",
                        VideoQuality = "1080p",
                        Itag = 4,
                        Bitrate = 1080,
                        Size = "102.2 MB"
                    },
                    new YoutubeVideoStreamModel
                    {
                        Resolution = "1280×720",
                        VideoQuality = "720p",
                        Itag = 5,
                        Bitrate = 1080,
                        Size = "55.1 MB"
                    },
                    new YoutubeVideoStreamModel
                    {
                        Resolution = "854×480",
                        VideoQuality = "480p",
                        Itag = 6,
                        Bitrate = 480,
                        Size = "28.4 MB"
                    },
                    new YoutubeVideoStreamModel
                    {
                        Resolution = "640×360",
                        VideoQuality = "360p",
                        Itag = 7,
                        Bitrate = 360,
                        Size = "14.5 MB"
                    },
                    new YoutubeVideoStreamModel
                    {
                        Resolution = "426×240",
                        VideoQuality = "240p",
                        Itag = 8,
                        Bitrate = 240,
                        Size = "8.3 MB"
                    },
                    new YoutubeVideoStreamModel
                    {
                        Resolution = "256×144",
                        VideoQuality = "144p",
                        Itag = 9,
                        Bitrate = 144,
                        Size = "3.8 MB"
                    }
                },
                AudioStreams = new List<YoutubeAudioStreamModel>
                {
                    new YoutubeAudioStreamModel
                    {
                        Bitrate = 128128,
                        Size = "4.7 MB",
                        Itag = 1
                    },
                    new YoutubeAudioStreamModel
                    {
                        Bitrate = 48740,
                        Size = "1.8 MB",
                        Itag = 2
                    }
                }
            };
        }
        private static string GetProxy
        {
            get
            {
                var proxy = "";
#if DEBUG
                proxy = "http://127.0.0.1:51733";
#endif
                return proxy;
            }
        }
        private static Task<Video> GetVideoInfo(string videoUrl)
        {
            var youtubeClient = new YoutubeClient();
            return youtubeClient.GetVideoAsync(NormalizeId(videoUrl));
        }
        private const string DomainName = "youtube.2tera.com";

#if DEBUG

#endif

        [HttpPost]
        public async Task<YoutubeVideoInfoModel> GetLinks(YoutubeGetLinksModel model)
        {
            if (!ModelState.IsValid)
                throw new Exception("Data is invalid");
#if DEBUG
            //return GetDummyYoutubeVideoInfoModel();
#endif
            var videoInfo = await GetVideoInfo(model.VideoUrl);
            var newImageHighResUrl = "";
            if (!string.IsNullOrWhiteSpace(videoInfo.Thumbnails?.StandardResUrl))
            {
                var thumbnailFilePath = GetAbsoluteFilePath($"{Guid.NewGuid()}{ZlpPathHelper.GetExtension(videoInfo.Thumbnails.StandardResUrl)}");
                Aria2Downloader.DownloadFile(videoInfo.Thumbnails.StandardResUrl, thumbnailFilePath, GetProxy, 0, message => { Trace.Write(message); });
                newImageHighResUrl = GetRelativeFilePath(ZlpPathHelper.GetFileNameFromFilePath(thumbnailFilePath));
            }
            var youtubeVideoInfoModel = new YoutubeVideoInfoModel
            {
                Id = videoInfo.Id,
                Title = videoInfo.Title,
                VideoStreams = new List<YoutubeVideoStreamModel>(),
                AudioStreams = new List<YoutubeAudioStreamModel>(),
                AverageRating = Math.Round(videoInfo.Statistics.AverageRating, 2),
                Description = videoInfo.Description,
                DislikeCount = videoInfo.Statistics.DislikeCount.ToString().ToMoneyFormat(),
                Duration = $"{videoInfo.Duration.Hours:00}:{videoInfo.Duration.Minutes:00}:{videoInfo.Duration.Seconds:00}",
                ImageThumbnailUrl = newImageHighResUrl,
                LikeCount = videoInfo.Statistics.LikeCount.ToString().ToMoneyFormat(),
                ViewCount = videoInfo.Statistics.ViewCount.ToString().ToMoneyFormat()
            };
            youtubeVideoInfoModel.VideoStreams.AddRange(
                videoInfo.VideoStreamInfos
                .Where(q => q.Container == Container.Mp4)
                .Select(q => new YoutubeVideoStreamModel
                {
                    Resolution = $"{q.Resolution.Width}×{q.Resolution.Height}",
                    Bitrate = q.Bitrate,
                    VideoQuality = q.VideoQualityLabel,
                    Itag = q.Itag,
                    Size = NormalizeFileSize(q.Size)
                }));
            youtubeVideoInfoModel.AudioStreams.AddRange(
                videoInfo.AudioStreamInfos
                    .Where(q => q.Container == Container.Mp4 || q.Container == Container.M4A)
                    .Select(q => new YoutubeAudioStreamModel
                    {
                        Bitrate = q.Bitrate,
                        Itag = q.Itag,
                        Size = NormalizeFileSize(q.Size)
                    }));
            return youtubeVideoInfoModel;
        }

        [HttpPost]
        public async Task<string> DownloadVideo(YoutubeDownloadModel model)
        {
            if (!ModelState.IsValid)
                throw new Exception("Data is invalid");
//#if DEBUG
//            return "/";
//#endif
            var videoInfo = await GetVideoInfo(model.VideoUrl);
            if (videoInfo == null)
                throw new Exception("Selected video not found");
            AudioStreamInfo audioStreamInfo;
            var audioFilePath = "";
            if (model.IsAudio)
            {
                audioStreamInfo = videoInfo.AudioStreamInfos.FirstOrDefault(q => q.Itag == model.Itag);
                if (audioStreamInfo == null)
                    throw new Exception("Selected audio not found");
                audioFilePath = GetAbsoluteFilePath($"{videoInfo.Title.RemoveIllegalCharsForUrl()}-{DomainName}.{audioStreamInfo.Container.ToString().ToLower()}");
                Aria2Downloader.DownloadFile(audioStreamInfo.Url, audioFilePath, GetProxy, 0, message => { Trace.Write(message); });
                return $"/DownloadTemp/{ZlpPathHelper.GetFileNameFromFilePath(audioFilePath)}";
            }
            var videoStreamInfo = videoInfo.VideoStreamInfos.FirstOrDefault(q => q.Itag == model.Itag);
            if (videoStreamInfo == null)
                throw new Exception("Selected video not found");
            var videoFileName = $"{videoInfo.Title.RemoveIllegalCharsForUrl()}-{videoStreamInfo.VideoQualityLabel}-{DomainName}.{videoStreamInfo.Container.ToString().ToLower()}";
            var videoTempFileName = $"{Guid.NewGuid()}.{videoStreamInfo.Container.ToString().ToLower()}";
            var videoTempFilePath = GetAbsoluteFilePath(videoTempFileName);
            var finalVideoFilePath = GetAbsoluteFilePath(videoFileName);
            if (ZlpIOHelper.FileExists(finalVideoFilePath)) return GetRelativeFilePath(ZlpPathHelper.GetFileNameFromFilePath(finalVideoFilePath));
            var tasks = new List<Task>();
            audioStreamInfo = videoInfo.AudioStreamInfos.OrderByDescending(q => q.Bitrate).FirstOrDefault(q => q.Container == Container.M4A || q.Container == Container.Mp4);
            tasks.Add(Task.Run(() =>
            {
                Aria2Downloader.DownloadFile(videoStreamInfo.Url, videoTempFilePath, GetProxy, 0, message => { Trace.Write(message); });
            }));
            if (audioStreamInfo != null)
            {
                audioFilePath = GetAbsoluteFilePath($"{videoInfo.Title.RemoveIllegalCharsForUrl()}-{DomainName}-audio.{audioStreamInfo.Container.ToString().ToLower()}");
                tasks.Add(Task.Run(() =>
                {
                    Aria2Downloader.DownloadFile(audioStreamInfo.Url, audioFilePath, GetProxy, 0, message => { Trace.Write(message); });
                }));
            }
            Parallel.ForEach(tasks, task => task.Wait());
            if (audioFilePath == "")
            {
                ZlpIOHelper.CopyFile(videoTempFilePath, finalVideoFilePath, true);
                ZlpIOHelper.DeleteFile(videoTempFilePath);
                return GetRelativeFilePath(ZlpPathHelper.GetFileNameFromFilePath(finalVideoFilePath));
            }
            FFmpeg.MergeVideoAudio(videoTempFilePath, audioFilePath, finalVideoFilePath, message => { Trace.Write(message); });
            ZlpIOHelper.DeleteFile(videoTempFilePath);
            return GetRelativeFilePath(ZlpPathHelper.GetFileNameFromFilePath(finalVideoFilePath));
        }

        [HttpPost]
        public async Task SubmitRate(YoutubeSubmitRateModel model)
        {
            if (!ModelState.IsValid)
                throw new Exception("Data is invalid");
#if DEBUG
            Thread.Sleep(5000);
#endif
            var rate = new Rate
            {
                Value = model.RateValue,
                IP = HttpContext.Current.Request.UserHostAddress
            };
            using (var dbContext = new YoutubeLinksEntities())
            {
                dbContext.Rates.Add(rate);
                await dbContext.SaveChangesAsync();
            }
        }

        [HttpPost]
        public async Task<YoutubeGetRateModel> GetRates()
        {
            var model = new YoutubeGetRateModel();
            using (var dbContext = new YoutubeLinksEntities())
            {
                var rateAverageValueViews = await dbContext.RateAverageValueViews.FirstOrDefaultAsync();
                if (rateAverageValueViews == null) return model;
                model.RateValue = rateAverageValueViews.AverageRateValue ?? 0;
                model.TotalRatesCount = rateAverageValueViews.TotalRatesNumber ?? 0;
            }
            return model;
        }
    }
}
