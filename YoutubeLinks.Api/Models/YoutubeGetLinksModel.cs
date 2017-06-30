using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace YoutubeLinks.Api.Models
{
    public class YoutubeDownloadModel
    {
        [Required]
        public bool IsAudio { get; set; }

        [Required]
        public int Itag { get; set; }

        [Required]
        public string VideoUrl { get; set; }
    }

    public class YoutubeGetLinksModel
    {
        [Required]
        public string VideoUrl { get; set; }
    }

    public class YoutubeSubmitRateModel
    {
        [Required]
        public byte RateValue { get; set; }
    }

    public class YoutubeGetRateModel
    {
        public float RateValue { get; set; }
        public int TotalRatesCount { get; set; }
    }

    public class YoutubeVideoInfoModel
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public double AverageRating { get; set; }
        public string Description { get; set; }
        public string Duration { get; set; }
        public string ImageThumbnailUrl { get; set; }
        public string LikeCount { get; set; }
        public string DislikeCount { get; set; }
        public string ViewCount { get; set; }
        public List<YoutubeVideoStreamModel> VideoStreams { get; set; }
        public List<YoutubeAudioStreamModel> AudioStreams { get; set; }
    }
    public class YoutubeVideoStreamModel
    {
        public int Itag { get; set; }
        public long Bitrate { get; set; }
        public string Resolution { get; set; }
        public string VideoQuality { get; set; }
        public string Size { get; set; }
    }
    public class YoutubeAudioStreamModel
    {
        public int Itag { get; set; }
        public long Bitrate { get; set; }
        public string Size { get; set; }
    }
}