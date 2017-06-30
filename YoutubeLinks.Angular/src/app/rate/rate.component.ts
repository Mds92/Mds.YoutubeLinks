import { Component, OnInit } from '@angular/core';
import { YoutubeLinksService } from '../youtube-links.service';
import { YoutubeGetRateModel } from '../youtube-links-models';

@Component({
  selector: 'app-rate-comp',
  templateUrl: './rate.component.html',
  styleUrls: ['./rate.component.css']
})
export class RateComponent {

  constructor(private youtubeService: YoutubeLinksService) {
    this.loadRates();
  }

  inProcess = false;
  errorMessage = '';
  youtubeGetRateModel: YoutubeGetRateModel = null;

  private loadRates(): void {
    this.youtubeService.getRates()
      .subscribe(
      (response: any) => {
        this.youtubeGetRateModel = response;
        if (this.youtubeGetRateModel.RateValue <= 0) this.youtubeGetRateModel.RateValue = 5;
        if (this.youtubeGetRateModel.TotalRatesCount <= 0) this.youtubeGetRateModel.TotalRatesCount = 2;
      },
      (errorMessage: any) => {
        this.errorMessage = errorMessage;
        this.inProcess = false;
      },
      () => {
        this.inProcess = false;
      });
  }
}
