import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './core/services/http.service';
import { ConfigService } from './core/services/config.service';
import { UserService } from './core/services/user.service';
import { UrlService } from './core/services/url.service';
import { AppStateService } from './core/services/app-state.service';

import { BibleModule } from './bible/bible.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BibleModule,
  ],
  providers: [
    HttpService,
    ConfigService,
    UrlService,
    UserService,
    AppStateService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
