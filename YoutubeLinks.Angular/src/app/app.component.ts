import { Component } from '@angular/core';
import { YoutubeLinkModel } from './youtube-links-models';
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
  //youtubeUrl = 'https://www.youtube.com/watch?v=W-jPAOonCOc';

  downloadUrl = '';
  errorMessage = '';
  inProcess = false;
  youtubeLinksModel: YoutubeLinkModel[] = [];
  selectedDownloadModel: YoutubeLinkModel = null;

  constructor(private youtubeService: YoutubeLinksService, private windowService: WindowService) { }

  public get PageTitle() : string {
    return this.youtubeLinksModel.length <= 0 ? '' : this.youtubeLinksModel[0].Title;
  }
  

  getLinksButtonOnClick(): void {
    this.errorMessage = '';
    this.inProcess = true;
    this.youtubeLinksModel = [];
    this.selectedDownloadModel = null;
    //this.youtubePageModel = null;
    this.downloadUrl = '';
    if (this.youtubeUrl == '') return;
    this.youtubeService.getLinks(this.youtubeUrl)
      .subscribe(
      (response: any) => { 
        this.youtubeLinksModel = response; 
      },
      (errorMessage: any) => {
        this.errorMessage = errorMessage;
        this.inProcess = false;
      },
      () => { 
        this.inProcess = false; 
      });
  }

  downloadButtonOnClick(): void {
    this.errorMessage = '';
    this.inProcess = true;
    this.youtubeService.getDownloadLinks(this.youtubeUrl, this.selectedDownloadModel)
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
    this.selectedDownloadModel = selectedLinkModel;
  }
}
