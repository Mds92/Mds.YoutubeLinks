using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace YoutubeLinks.Api.Models
{
    public class YoutubeDownloadModel
    {
        /// <summary>
        /// آدرس صفحه فیلم در یوتیوب
        /// </summary>
        [Required]
        public string VideoUrl { get; set; }

        /// <summary>
        /// آدرس لینک دانلود 
        /// </summary>
        [Required]
        public int FormatCode { get; set; }
    }

    public class YoutubeGetLinksModel
    {
        [Required]
        public string VideoUrl { get; set; }
    }

    internal class YoutubeVideoInternalModel
    {
        public string itag { get; set; }
        public string quality { get; set; }
        public string type { get; set; }
        public string url { get; set; }
    }

    public class YoutubeLinkModel
    {
        public string ITag { get; set; }
        public string Title { get; set; }
        public string Quality { get; set; }
        public string Type { get; set; }
        public string DownloadUrl { get; set; }
    }

    public class YoutubeVideoPageModel
    {
        public YoutubeVideoPageModel()
        {
            Links = new List<YoutubeLinkModel>();
        }

        public string PageTitle { get; set; }
        public List<YoutubeLinkModel> Links { get; set; }
    }

}