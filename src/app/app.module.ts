import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './core/http.service';
import { ConfigService } from './core/config.service';

import { BibleModule } from './bible/bible.module';
import { BibleService } from './bible/bible.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BibleModule,
  ],
  providers: [
    BibleService,
    HttpService,
    ConfigService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
