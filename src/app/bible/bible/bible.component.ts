import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { Subject, forkJoin, of } from 'rxjs';
import { takeUntil, switchMap, tap, filter } from 'rxjs/operators';

import { BibleService } from '../bible.service';
import { BibleStateService } from '../bible-state.service';
import { BibleState, BibleBook } from '../bible.interfaces';

@Component({
  selector: 'app-bible',
  templateUrl: './bible.component.html',
  styleUrls: ['./bible.component.scss']
})
export class BibleComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject();
  private bibleState: BibleState;

  constructor(
    private bibleService: BibleService,
    private route: ActivatedRoute,
    private router: Router,
    private bibleStateService: BibleStateService,
  ) {
    this.handleParamsChange();
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private findBook(books: BibleBook[], bookRequest: string): BibleBook {
    let book;
    if (!isNaN(Number(bookRequest))) {
      const bookId = parseInt(bookRequest, 10);
      book = books.find(item => item.id === bookId);
    } else {
      book = books.find(_ =>  _.aliasesIndex.includes(bookRequest));
    }

    return book || null;
  }

  private handleParamsChange(): void {
    this.router.events.pipe(
      takeUntil(this.destroy$),
      filter(event => event instanceof NavigationEnd),
      switchMap(() => {
        const params = this.route.firstChild.snapshot.params;
        // TODO add checks
        const versionId = params.versionId;
        const bookId = params.bookId;
        const chapter = parseInt(params.chapter || 1, 10);

        const oldState = this.bibleState;
        const isNewVersion = oldState?.version.id !== versionId;

        const loadVersion$ = isNewVersion
          ? this.bibleService.getVersion(versionId)
          : of(oldState.version);

        const loadBooks$ = isNewVersion
          ? this.bibleService.getBooks(versionId)
          : of(oldState.versionBooks);

        return forkJoin([loadVersion$, loadBooks$]).pipe(
          tap(([version, books]) => {
            const book = this.findBook(books, bookId);
            const state = {
              version,
              versionBooks: books,
              book,
              chapter,
              selectedVerses: [],
            };
            this.bibleStateService.setState(state);
            this.bibleState = state;
          }),
        );
      }),
    ).subscribe();
  }

}
