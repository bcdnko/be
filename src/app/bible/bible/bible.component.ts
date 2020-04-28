import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { BibleStateService } from '../bible-state.service';

@Component({
  selector: 'app-bible',
  templateUrl: './bible.component.html',
  styleUrls: ['./bible.component.scss']
})
export class BibleComponent implements OnInit, OnDestroy {

  private destroy$: Subject<void> = new Subject();

  constructor(
    route: ActivatedRoute,
    bibleStateService: BibleStateService,
  ) {
    route.firstChild.params
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        bibleStateService.setState({
          version: params.version,
          book: params.book,
          chapter: params.chapter,
          selectedVerses: [],
        });
      });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
