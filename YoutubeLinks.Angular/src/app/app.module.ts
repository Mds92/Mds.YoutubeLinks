import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdInputModule, MdGridListModule, MdButtonModule, MdProgressSpinnerModule, MdCardModule, MdIconModule  } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import 'hammerjs';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, BrowserAnimationsModule, FormsModule, HttpModule,
    MdInputModule, MdGridListModule, MdButtonModule, MdProgressSpinnerModule, MdCardModule, MdIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
