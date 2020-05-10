import { Title } from '@angular/platform-browser';
import { Component, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import {
  filter,
  takeUntil,
  tap,
} from 'rxjs/operators';

import {
  BibleBooksByTestament,
  BibleState,
} from '../bible.interfaces';
import { BibleStateService } from '../bible-state.service';
import { BibleService } from '../bible.service';
import { Settings } from '../../core/interfaces/common.interfaces';
import { SettingsService } from '../../core/services/settings.service';

@Component({
  selector: 'be-bible-index',
  templateUrl: './bible-index.component.html',
  styleUrls: ['./bible-index.component.scss']
})
export class BibleIndexComponent implements OnDestroy {
  bibleState: BibleState = null;
  books: BibleBooksByTestament = null;
  public settings: Settings;

  private destroy$: Subject<void> = new Subject();

  constructor(
    bibleService: BibleService,
    bibleStateService: BibleStateService,
    private titleService: Title,
    private settingsService: SettingsService,
  ) {
    this.settingsService.settings$.pipe(
      takeUntil(this.destroy$),
      tap(settings => this.settings = settings),
    ).subscribe();

    bibleStateService.state
      .pipe(
        takeUntil(this.destroy$),
        filter(state => !!state),
      )
      .subscribe(state => {
        this.titleService.setTitle(state.version.title);
        this.bibleState = state;
        this.books = bibleService.groupBooksByTestament(state.versionBooks);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}

