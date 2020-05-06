import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UserService } from './core/services/user.service';
import { ConfigService } from './core/services/config.service';
import { AppStateService } from './core/services/app-state.service';

@Component({
  selector: 'be-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  title = 'Bible Explorer';

  private destroy$: Subject<void> = new Subject();

  constructor(
    userService: UserService,
    appStateService: AppStateService,
    configService: ConfigService,
  ) {
    userService.setUser({
      name: null,
      defaultVersionId: 'kjv',
      defaultLanguage: 'en',
    });

    configService.getConfig()
      .pipe(takeUntil(this.destroy$))
      .subscribe((config) => {
        appStateService.setState({
          config,
        });
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
