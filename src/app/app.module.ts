import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { UiSwitchModule } from 'ngx-ui-switch';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './core/services/http.service';
import { SettingsService } from './core/services/settings.service';
import { UserService } from './core/services/user.service';
import { UrlService } from './core/services/url.service';
import { AppStateService } from './core/services/app-state.service';

import { BibleModule } from './bible/bible.module';
import { ToTopComponent } from './core/controls/to-top/to-top.component';
import { SettingsComponent } from './settings/settings.component';
import { PageNotFoundComponent } from './error/page-not-found/page-not-found.component';
import { ErrorComponent } from './error/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    ToTopComponent,
    SettingsComponent,
    PageNotFoundComponent,
    ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModalModule,
    FontAwesomeModule,
    UiSwitchModule.forRoot({
      color: 'DodgerBlue',
    }),
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
