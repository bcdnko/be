import { Component, OnDestroy } from '@angular/core';

import { Subject, Observable } from 'rxjs';
import { tap, takeUntil, switchMap, filter } from 'rxjs/operators';

import { BibleState, BibleVerse } from '../bible.interfaces';
import { BibleService } from '../bible.service';
import { BibleNavigationService } from '../bible-navigation.service';
import { BibleStateService } from '../bible-state.service';
import { BibleUrlService } from '../bible-url.service';

@Component({
  selector: 'app-bible-chapter',
  templateUrl: './bible-chapter.component.html',
  styleUrls: ['./bible-chapter.component.scss']
})
export class BibleChapterComponent implements OnDestroy {

  public bibleState: BibleState;
  public verses: BibleVerse[];
  public prevChapter: BibleState;
  public nextChapter: BibleState;

  private destroy$: Subject<void> = new Subject();

  constructor(
    public bibleUrlService: BibleUrlService,
    private bibleService: BibleService,
    private bibleNavigationService: BibleNavigationService,
    private bibleStateService: BibleStateService,
  ) {
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
    this.verses = null;
    this.prevChapter = this.bibleNavigationService.getPreviousChapter(state);
    this.nextChapter = this.bibleNavigationService.getNextChapter(state);
  }

  private onLoadVerses(state: BibleState): Observable<BibleVerse[]> {
    return this.bibleService.getVersesByChapter(
      state.version.id,
      state.book.id,
      state.chapter,
    );
  }
}
