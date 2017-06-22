using System.ComponentModel.DataAnnotations;

namespace YoutubeLinks.Api.Models
{
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

    public class YoutubeVideoModel
    {
        public string ITag { get; set; }
        public string Title { get; set; }
        public string Quality { get; set; }
        public string Type { get; set; }
        public string DownloadUrl { get; set; }
    }

}