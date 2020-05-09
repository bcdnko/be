import { Component, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';

import { Settings } from '../../core/interfaces/common.interfaces';
import { SettingsService } from '../../core/services/settings.service';

@Component({
  selector: 'be-bible-toolbar',
  templateUrl: './bible-toolbar.component.html',
  styleUrls: ['./bible-toolbar.component.scss']
})
export class BibleToolbarComponent implements OnDestroy {

  settings: Settings;
  private destroy$: Subject<void> = new Subject();

  constructor(
    public settingsService: SettingsService,
  ) {
    settingsService.settings$.pipe(
      takeUntil(this.destroy$),
      tap(settings => this.settings = settings),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateSettings(): void {
    this.settingsService.setSettings({ ...this.settings });
  }

}
