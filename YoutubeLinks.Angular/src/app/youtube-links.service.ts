import { Injectable } from '@angular/core';
import { YoutubeLinkModel, AdaptiveKindEnum, WebSitesEnum, AudioFormatEnum, VideoFormatEnum } from './youtube-links-models';
import { Http, Jsonp, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class YoutubeLinksService {

  constructor(private http: Http) { }

  private webApiGetLinksUrl = "/api/YouTube/GetLinks/";
  private webApiDownloadVideoUrl = "/api/YouTube/DownloadVideo/";

  getDownloadLinks(youtubeVideoUrl: string, youtubeLinkModel: YoutubeLinkModel): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let youtubeDownloadModel = {
      VideoUrl: youtubeVideoUrl,
      FormatCode: youtubeLinkModel.FormatCode
    };
    return this.http.post(this.webApiDownloadVideoUrl, youtubeDownloadModel, options)
      .map(response => {
        return response.json();
      })
      .catch(this.handleError);
  }

  getLinks(youtubeVideoUrl: string): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.webApiGetLinksUrl, { VideoUrl: youtubeVideoUrl }, options)
      .map(response => {
        let responseBody = response.json();
        let links = responseBody.map((input) => {
          return {
            AdaptiveKind: AdaptiveKindEnum[input.AdaptiveKind],
            AudioBitrate: input.AudioBitrate,
            AudioFormat: AudioFormatEnum[input.AudioFormat],
            FileExtension: input.FileExtension,
            Format: VideoFormatEnum[input.Format],
            FormatCode: input.FormatCode,
            FullName: input.FullName,
            Is3D: input.Is3D,
            IsAdaptive: input.IsAdaptive,
            IsEncrypted: input.IsEncrypted,
            Resolution: input.Resolution,
            Title: input.Title,
            Uri: input.Uri,
            WebSite: WebSitesEnum[input.WebSite]
          }
        });
        return links;
      })
      .catch(this.handleError);
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      let body;
      try {
        body = error.json() || '';
      }
      catch (exception) {
        body = error;
      }
      const err = body.error || body.Error || body.ErrorMessage || JSON.stringify(body);
      errMsg = `Code: ${error.status} <br /> StatusText: ${error.statusText || ''} <br /> Message: ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    return Observable.throw(errMsg);
  }

}
