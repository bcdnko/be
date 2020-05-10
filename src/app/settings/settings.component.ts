import { Component, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Subject, timer } from 'rxjs';
import { tap, takeUntil, debounce } from 'rxjs/operators';

import { SettingsService } from '../core/services/settings.service';
import { Settings } from '../core/interfaces/common.interfaces';
import { defaultSettings } from '../core/default-settings';

@Component({
  selector: 'be-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnDestroy {
  settings: Settings;

  private save$: Subject<void> = new Subject();
  private destroy$: Subject<void> = new Subject();

  constructor(
    private settingsService: SettingsService,
    public activeModal: NgbActiveModal,
  ) {
    settingsService.settings$.pipe(
      takeUntil(this.destroy$),
      tap(settings => this.settings = settings),
    ).subscribe();

    this.save$.pipe(
      takeUntil(this.destroy$),
      debounce(() => timer(2000)),
      tap(() => this.settingsService.setSettings(this.settings)),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateSettings(): void {
    this.save$.next();
  }

  resetToDefaults(): void {
    if (confirm('Reset settings to their defaults?')) {
      this.settingsService.setSettings(defaultSettings);
    }
  }
}
