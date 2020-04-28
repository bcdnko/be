import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { tap, takeUntil, filter } from 'rxjs/operators';

import { BibleStateService } from '../bible-state.service';
import { BibleState } from '../bible.interfaces';

@Component({
  selector: 'app-bible-book-selector',
  templateUrl: './bible-book-selector.component.html',
  styleUrls: ['./bible-book-selector.component.scss']
})
export class BibleBookSelectorComponent implements OnInit, OnDestroy {

  public books;
  public bibleState: BibleState;
  private destroy$: Subject<void> = new Subject();

  constructor(
    private bibleStateService: BibleStateService,
  ) {
    this.bibleStateService.state.pipe(
      takeUntil(this.destroy$),
      filter(state => !!state),
      tap(state => {
        this.onBibleStateChange(state);
      }),
    ).subscribe();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private onBibleStateChange(state: BibleState): void {
    this.bibleState = state;
    this.books = state.versionBooks;

    console.log(this.books);
  }
}
