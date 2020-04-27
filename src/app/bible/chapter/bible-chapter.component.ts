import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OnDestroy } from '@angular/core/core';

import { Subject, forkJoin, Observable } from 'rxjs';
import { switchMap, tap, takeUntil } from 'rxjs/operators';

import { BibleService } from '../bible.service';
import { BibleVersion, BibleBook, BibleVerse } from '../bible.interfaces';

interface ChapterState {
  version: BibleVersion;
  book: BibleBook;
  chapter: number;
  verses: BibleVerse[];
}

@Component({
  selector: 'app-bible-chapter',
  templateUrl: './bible-chapter.component.html',
  styleUrls: ['./bible-chapter.component.scss']
})
export class BibleChapterComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject();

  public state: ChapterState;

  constructor(
    private route: ActivatedRoute,
    private bibleService: BibleService,
  ) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.destroy$),
      switchMap((params) => {
        const versionId = params.versionId;
        const bookId = parseInt(params.bookId);
        const chapter = parseInt(params.chapter || 1);

        return forkJoin([
          this.bibleService.getVersion(versionId),
          this.bibleService.getBooks(versionId),
          this.bibleService.getVersesByChapter(versionId, bookId, chapter),
        ]).pipe(
          tap(([version, books, verses]) => {
            this.state = {
              version: version,
              book: books.find(item => item.id === bookId),
              chapter: chapter,
              verses: verses,
            };
            console.log(this.state)
          }),
        );

      }),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
