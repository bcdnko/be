import { Component, OnDestroy } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';

import { Settings } from '../../core/interfaces/common.interfaces';
import { SettingsService } from '../../core/services/settings.service';

import { SettingsComponent } from '../../settings/settings.component';

import {
  faCog,
  faFistRaised,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'be-bible-toolbar',
  templateUrl: './bible-toolbar.component.html',
  styleUrls: ['./bible-toolbar.component.scss']
})
export class BibleToolbarComponent implements OnDestroy {

  settings: Settings;
  icons = {
    settings: faCog,
    strong: faFistRaised,
  };

  private destroy$: Subject<void> = new Subject();

  constructor(
    public settingsService: SettingsService,
    private modalService: NgbModal,
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

  openSettings(): void {
    this.modalService.open(SettingsComponent);
  }

}
