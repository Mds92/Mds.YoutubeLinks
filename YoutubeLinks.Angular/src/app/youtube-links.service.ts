import { Injectable } from '@angular/core';
import { YoutubeLinkModel, YoutubePageModel, YoutubeDownloadModel } from './youtube-links-model';
import { Http, Jsonp, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class YoutubeLinksService {

  constructor(private http: Http) { }

  private webApiGetLinksUrl = "/api/YouTube/GetLinks/";
  private webApiGetDownloadLinksUrl = "/api/YouTube/GetDownloadLink/";

  getDownloadLinks(youtubeDownloadModel: YoutubeDownloadModel): Observable<Response> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.webApiGetDownloadLinksUrl, youtubeDownloadModel, options)
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
        let pageTitle = responseBody.PageTitle;
        let links = responseBody.Links.map((input) => {
          return {
            title: input.Title,
            quality: input.Quality,
            type: input.Type,
            downloadUrl: input.DownloadUrl
          }
        });
        let youtubePageModel: YoutubePageModel = {
          pageTitle: responseBody.PageTitle,
          Links: links
        };
        return youtubePageModel;
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
