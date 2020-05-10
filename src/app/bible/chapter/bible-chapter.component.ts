import { Title } from '@angular/platform-browser';
import { Component, OnDestroy } from '@angular/core';


import { Subject, Observable } from 'rxjs';
import { tap, takeUntil, switchMap, filter } from 'rxjs/operators';

import { BibleState, BibleVerse } from '../bible.interfaces';
import { BibleService } from '../bible.service';
import { BibleNavigationService } from '../bible-navigation.service';
import { BibleStateService } from '../bible-state.service';
import { BibleUrlService } from '../bible-url.service';
import { Settings } from '../../core/interfaces/common.interfaces';
import { SettingsService } from '../../core/services/settings.service';

@Component({
  selector: 'be-bible-chapter',
  templateUrl: './bible-chapter.component.html',
  styleUrls: ['./bible-chapter.component.scss']
})
export class BibleChapterComponent implements OnDestroy {

  public bibleState: BibleState;
  public verses: BibleVerse[];
  public prevChapterLink: string[];
  public nextChapterLink: string[];
  public settings: Settings;

  private destroy$: Subject<void> = new Subject();

  constructor(
    private bibleUrlService: BibleUrlService,
    private titleService: Title,
    private bibleService: BibleService,
    private bibleNavigationService: BibleNavigationService,
    private bibleStateService: BibleStateService,
    private settingsService: SettingsService,
  ) {
    this.settingsService.settings$.pipe(
      takeUntil(this.destroy$),
      tap(settings => this.settings = settings),
    ).subscribe();

    this.bibleStateService.state.pipe(
      takeUntil(this.destroy$),
      filter(state => Boolean(state && state.book)),
      tap(state => {
        this.onBibleStateChange(state);
      }),
      switchMap(state => this.onLoadVerses(state)),
      tap(verses => {
        this.verses = verses;
      }),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private onBibleStateChange(state: BibleState): void {
    this.bibleState = state;
    this.titleService.setTitle(
      `${state.book.titleShort} ${state.chapter} (${state.version.titleShort})`
    );

    this.verses = null;
    const prevChapter = this.bibleNavigationService.getPreviousChapter(state);
    const nextChapter = this.bibleNavigationService.getNextChapter(state);

    this.prevChapterLink = prevChapter ? this.bibleUrlService.fromState(prevChapter) : null;
    this.nextChapterLink = nextChapter ? this.bibleUrlService.fromState(nextChapter) : null;
  }

  private onLoadVerses(state: BibleState): Observable<BibleVerse[]> {
    return this.bibleService.getVersesByChapter(
      state.version.id,
      state.book.id,
      state.chapter,
    );
  }

}
