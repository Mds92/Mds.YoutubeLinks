export class YoutubeLinkModel {
    AdaptiveKind: AdaptiveKindEnum;
    AudioBitrate: number;
    AudioFormat: AudioFormatEnum;
    FileExtension: string;
    Format: VideoFormatEnum;
    FormatCode: number;
    FullName: string;
    Is3D: boolean;
    IsAdaptive: boolean;
    IsEncrypted: boolean;
    Resolution: number;
    Title: string;
    Uri: string;
    WebSite: WebSitesEnum;
}

export enum WebSitesEnum {
    YouTube = 0
}

export enum AdaptiveKindEnum {
    None = 0,
    Audio = 1,
    Video = 2
}

export enum AudioFormatEnum {
    Mp3 = 0,
    Aac = 1,
    Vorbis = 2,
    Unknown = 3
}

export enum VideoFormatEnum {
    Flash = 0,
    Mobile = 1,
    Mp4 = 2,
    WebM = 3,
    Unknown = 4
}
