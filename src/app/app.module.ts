import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './core/services/http.service';
import { SettingsService } from './core/services/settings.service';
import { UserService } from './core/services/user.service';
import { UrlService } from './core/services/url.service';
import { AppStateService } from './core/services/app-state.service';

import { BibleModule } from './bible/bible.module';
import { ToTopComponent } from './core/controls/to-top/to-top.component';

@NgModule({
  declarations: [
    AppComponent,
    ToTopComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BibleModule,
  ],
  providers: [
    HttpService,
    Title,
    SettingsService,
    UrlService,
    UserService,
    AppStateService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
