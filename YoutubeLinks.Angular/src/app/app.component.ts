import { Component } from '@angular/core';
import { YoutubeLinksModel } from './youtube-links-model';
import { Http, Jsonp, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Get YouTube Direct Download Links';
  youtubeUrl = 'http://youtube.com/watch?v=zj7_4VDFQPA&list=PLC3y8-rFHvwg5gEu2KF4sbGvpUqMRSBSW';
  youtubeLinks: YoutubeLinksModel[] = [];
  errorMessage = '';
  inProcess = false;

  private webApiUrl = "/api/YouTube/GetLinks/";
  constructor(private http: Http) { }

  getLinksButtonOnClick(): void {
    this.errorMessage = '';
    this.inProcess = true;
    this.getLinks().subscribe(
      () => { },
      (errorMessage: any) => {
        this.errorMessage = errorMessage;
        this.inProcess = false;
      },
      () => { this.inProcess = false; });
  }

  private getLinks(): Observable<YoutubeLinksModel> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    return this.http.post(this.webApiUrl, { VideoUrl: this.youtubeUrl }, options)
      .map(res => this.extractData(res))
      .catch(this.handleError);
  }

  private extractData(res: any): void {
    let body = res.json();
    this.youtubeLinks = body.map((input) => {
      return {
        title: input.Title,
        quality: input.Quality,
        type: input.Type,
        downloadUrl: input.DownloadUrl
      }
    });
  }

  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      let body;
      try {
        body = error.json() || '';
      }
      catch(exception)
      {
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
