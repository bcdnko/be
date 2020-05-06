import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import { BibleVersion } from '../bible.interfaces';
import { BibleService } from '../bible.service';

@Component({
  selector: 'app-bible-versions',
  templateUrl: './bible-versions.component.html',
  styleUrls: ['./bible-versions.component.scss']
})
export class BibleVersionsComponent implements OnInit, OnDestroy {

  versions: BibleVersion[];
  private destroy$: Subject<void> = new Subject();

  constructor(
    private bibleService: BibleService,
  ) { }

  ngOnInit(): void {
    this.bibleService.getVersions().pipe(
      takeUntil(this.destroy$),
      tap(versions => {
        this.versions = versions;
      }),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
