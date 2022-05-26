import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CollectComponent } from './collect/collect.component';
import { MessegeService } from './messege.service';

@NgModule({
  declarations: [
    AppComponent,
    CollectComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [MessegeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
