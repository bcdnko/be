import { Title } from '@angular/platform-browser';
import { Component, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import {
  filter,
  takeUntil,
} from 'rxjs/operators';

import {
  BibleBooksByTestament,
  BibleState,
} from '../bible.interfaces';
import { BibleStateService } from '../bible-state.service';
import { BibleService } from '../bible.service';

@Component({
  selector: 'app-bible-index',
  templateUrl: './bible-index.component.html',
  styleUrls: ['./bible-index.component.scss']
})
export class BibleIndexComponent implements OnDestroy {
  bibleState: BibleState = null;
  books: BibleBooksByTestament = null;

  private destroy$: Subject<void> = new Subject();

  constructor(
    private titleService: Title,
    bibleService: BibleService,
    bibleStateService: BibleStateService,
  ) {
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

