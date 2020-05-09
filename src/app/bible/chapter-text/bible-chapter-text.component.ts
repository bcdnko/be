import { Component, OnChanges, OnDestroy, Input, SimpleChanges, SimpleChange } from '@angular/core';

import { Subject } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';

import { SettingsService } from '../../core/services/settings.service';
import { Settings } from '../../core/interfaces/common.interfaces';

import {
  BibleVerse,
} from '../bible.interfaces';

@Component({
  selector: 'be-bible-chapter-text',
  templateUrl: './bible-chapter-text.component.html',
  styleUrls: ['./bible-chapter-text.component.scss'],
  preserveWhitespaces: false,
})
export class BibleChapterTextComponent implements OnChanges, OnDestroy {

  @Input()
  verses: BibleVerse[];
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.verses) {
      this.handleVersesInputChange(changes.verses);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private handleVersesInputChange(change: SimpleChange): void {
    const verses: BibleVerse[] = change.currentValue;
    if (!verses) {
      return;
    }
  }

}
