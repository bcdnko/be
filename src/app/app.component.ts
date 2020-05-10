import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';


import { Settings } from './core/interfaces/common.interfaces';
import { UserService } from './core/services/user.service';
import { SettingsService } from './core/services/settings.service';
import { AppStateService } from './core/services/app-state.service';

@Component({
  selector: 'be-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'Bible Explorer';
  settings: Settings;

  private destroy$: Subject<void> = new Subject();

  constructor(
    userService: UserService,
    appStateService: AppStateService,
    settingsService: SettingsService,
  ) {
    userService.initUser();

    settingsService.settings$.pipe(
      takeUntil(this.destroy$),
      tap(settings => this.settings = settings),
    ).subscribe();

    appStateService.setState({
      started: true,
    });

    if (navigator.storage && navigator.storage.persist) {
      navigator.storage.persist()
        .then(granted => {
          if (granted) {
            console.log('Storage will not be cleared except by explicit user action');
          } else {
            console.log('Storage may be cleared by the UA under storage pressure.');
          }
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
