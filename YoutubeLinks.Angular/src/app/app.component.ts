import { Component } from '@angular/core';
import { YoutubeVideoInfoModel, SelectedStreamToDownload, YoutubeVideoStreamModel, YoutubeAudioStreamModel } from './youtube-links-models';
import { YoutubeLinksService } from './youtube-links.service';
import { WindowService } from './window.service';
import { MdRadioButton } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Get Youtube Direct Download Links';
  subtitle = 'To download from youtube.com directly, without any limitations.';
  youtubeUrl = '';

  downloadUrl = '';
  errorMessage = '';
  inProcess = false;
  youtubeVideoInfoModel: YoutubeVideoInfoModel = null;
  selectedStreamToDownload: SelectedStreamToDownload = null;

  constructor(private youtubeService: YoutubeLinksService, private windowService: WindowService) {
    this.resetSelectedStreamToDownload();
  }

  streamRowOnClick(selectedStreamModel: YoutubeVideoStreamModel | YoutubeAudioStreamModel): void {
    this.selectedStreamToDownload = {
      Itag: selectedStreamModel.Itag,
      IsAudio: selectedStreamModel['VideoQuality'] == undefined
    }
  }

  getLinksButtonOnClick(): void {
    if (this.youtubeUrl == '') return;
    this.errorMessage = '';
    this.inProcess = true;
    this.youtubeVideoInfoModel = null;
    this.downloadUrl = '';
    this.resetSelectedStreamToDownload();
    this.youtubeService.getLinks(this.youtubeUrl)
      .subscribe(
      (response: any) => {
        this.youtubeVideoInfoModel = response;
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
    this.youtubeService.getDownloadLinks(this.youtubeUrl, this.selectedStreamToDownload.IsAudio, this.selectedStreamToDownload.Itag)
      .subscribe(
      (response: any) => {
        let window = this.windowService.nativeWindow;
        this.downloadUrl = response.replace(/^\/+/img, '');
        this.downloadUrl = `${window.location.href.replace(/\/+$/img, '')}/${this.downloadUrl}`;
        window.location = this.downloadUrl;
      },
      (errorMessage: any) => {
        this.resetSelectedStreamToDownload();
        this.errorMessage = errorMessage;
        this.inProcess = false;
      },
      () => {
        this.inProcess = false;
      });
  }

  selectRadioButtonOnChange(event: any, selectedStreamModel: YoutubeVideoStreamModel | YoutubeAudioStreamModel): void {
    let radioButton: MdRadioButton = event.source;
    if (!radioButton.checked) return;
    this.selectedStreamToDownload = {
      Itag: selectedStreamModel.Itag,
      IsAudio: selectedStreamModel['VideoQuality'] != undefined
    }
  }

  private resetSelectedStreamToDownload(): void {
    this.selectedStreamToDownload = {
      Itag: 0,
      IsAudio: false
    };
  }
}
