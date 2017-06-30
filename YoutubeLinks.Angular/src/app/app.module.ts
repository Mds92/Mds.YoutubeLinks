import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { YoutubeLinksService } from './youtube-links.service';
import { WindowService } from './window.service';
import { MdInputModule, MdGridListModule, MdButtonModule, MdProgressSpinnerModule, MdCardModule, MdIconModule, MdRadioModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StarRatingModule } from 'angular-star-rating';
import 'hammerjs';

import { AppComponent } from './app.component';
import { RateComponent } from './rate/rate.component';

@NgModule({
  declarations: [
    AppComponent,
    RateComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, FormsModule, HttpModule,
    MdInputModule, MdGridListModule, MdButtonModule, MdProgressSpinnerModule, MdCardModule, MdIconModule, MdRadioModule,
    StarRatingModule
  ],
  providers: [YoutubeLinksService, WindowService],
  bootstrap: [AppComponent]
})
export class AppModule { }
