import { Component, OnDestroy } from '@angular/core';

import { Subject, Observable } from 'rxjs';
import { tap, takeUntil, switchMap, filter } from 'rxjs/operators';

import { BibleService } from '../bible.service';
import { BibleState, BibleVerse } from '../bible.interfaces';
import { BibleStateService } from '../bible-state.service';

@Component({
  selector: 'app-bible-chapter',
  templateUrl: './bible-chapter.component.html',
  styleUrls: ['./bible-chapter.component.scss']
})
export class BibleChapterComponent implements OnDestroy {

  public bibleState: BibleState;
  public verses: BibleVerse[];

  private destroy$: Subject<void> = new Subject();

  constructor(
    private bibleService: BibleService,
    private bibleStateService: BibleStateService,
  ) {
    this.bibleStateService.state.pipe(
      takeUntil(this.destroy$),
      filter(state => !!state),
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
  }

  private onLoadVerses(state: BibleState): Observable<BibleVerse[]> {
    return this.bibleService.getVersesByChapter(
      state.version.id,
      state.book.id,
      state.chapter,
    );
  }
}
