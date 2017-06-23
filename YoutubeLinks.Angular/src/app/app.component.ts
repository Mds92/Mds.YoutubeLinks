import { Component } from '@angular/core';
import { YoutubeLinkModel, YoutubePageModel, YoutubeDownloadModel } from './youtube-links-model';
import { YoutubeLinksService } from './youtube-links.service';
import { WindowService } from './window.service';
import { MdRadioButton } from '@angular/material';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Get YouTube Direct Download Links';
  subtitle = 'By 2Tera.com';
  youtubeUrl = '';
  //youtubeUrl = 'http://youtube.com/watch?v=zj7_4VDFQPA&list=PLC3y8-rFHvwg5gEu2KF4sbGvpUqMRSBSW';

  youtubePageModel: YoutubePageModel = null;
  selectedDownloadModel: YoutubeDownloadModel = null;
  downloadUrl = '';
  errorMessage = '';
  inProcess = false;

  private webApiUrl = "/api/YouTube/GetLinks/";
  constructor(private youtubeService: YoutubeLinksService, private windowService: WindowService) { }

  getLinksButtonOnClick(): void {
    this.errorMessage = '';
    this.inProcess = true;
    this.selectedDownloadModel = null;
    this.youtubePageModel = null;
    this.youtubeService.getLinks(this.youtubeUrl)
      .subscribe(
      (response: any) => { this.youtubePageModel = response; },
      (errorMessage: any) => {
        this.errorMessage = errorMessage;
        this.inProcess = false;
      },
      () => { this.inProcess = false; });
  }

  downloadButtonOnClick(): void {
    this.errorMessage = '';
    this.inProcess = true;
    this.youtubeService.getDownloadLinks(this.selectedDownloadModel)
      .subscribe(
      (response: any) => {
        let window = this.windowService.nativeWindow;
        this.downloadUrl = response.replace(/^\/+/img, '');
        this.downloadUrl = `${window.location.href.replace(/\/+$/img, '')}/${this.downloadUrl}`;
        window.location = this.downloadUrl;
      },
      (errorMessage: any) => {
        this.selectedDownloadModel = null;
        this.errorMessage = errorMessage;
        this.inProcess = false;
      },
      () => {
        this.inProcess = false;
      });
  }

  selectRadioButtonOnChange(event: any, selectedLinkModel: YoutubeLinkModel): void {
    let radioButton: MdRadioButton = event.source;
    if (!radioButton.checked) return;
    this.selectedDownloadModel = {
      PageTitle: this.youtubePageModel.pageTitle,
      Type: selectedLinkModel.type,
      Url: selectedLinkModel.downloadUrl
    };
  }
}
