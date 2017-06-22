export class YoutubePageModel {
    pageTitle: string;
    Links: YoutubeLinkModel[];
}

export class YoutubeLinkModel {
    title: string;
    quality: string;
    type: string;
    downloadUrl: string;
}

export class YoutubeDownloadModel {
    PageTitle: string;
    Type: string;
    Url: string;
}
