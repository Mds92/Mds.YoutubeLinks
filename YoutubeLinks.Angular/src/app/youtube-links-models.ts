export class YoutubeVideoInfoModel {
    Id: string;
    Title: string;
    AverageRating: number;
    Description: string;
    Duration: string;
    ImageThumbnailUrl: string;
    LikeCount: string;
    DislikeCount: string;
    ViewCount: string;
    VideoStreams: YoutubeVideoStreamModel[];
    AudioStreams: YoutubeAudioStreamModel[];
}
export class YoutubeVideoStreamModel {
    Itag: number;
    Bitrate: number;
    Resolution: string;
    VideoQuality: string;
    Size: string;
}
export class YoutubeAudioStreamModel {
    Itag: number;
    Bitrate: number;
    Size: string;
}
export class SelectedStreamToDownload {
    Itag: number;
    IsAudio: boolean;
}

export class YoutubeGetRateModel {
    RateValue: number;
    TotalRatesCount: number;
}
