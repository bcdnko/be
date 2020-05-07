import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

import {
  BibleVersion,
  BibleState,
} from '../bible.interfaces';
import { BibleService } from '../bible.service';
import { BibleStateService } from '../bible-state.service';
import { BibleUrlService } from '../bible-url.service';

@Component({
  selector: 'be-bible-version-selector',
  templateUrl: './bible-version-selector.component.html',
  styleUrls: ['./bible-version-selector.component.scss']
})
export class BibleVersionSelectorComponent implements OnInit, OnDestroy {

  versions: BibleVersion[];
  urls: { [key: string]: string[] };

  private state: BibleState;
  private destroy$: Subject<void> = new Subject();

  constructor(
    public bibleUrlService: BibleUrlService,
    private bibleService: BibleService,
    private bibleStateService: BibleStateService,
  ) { }

  ngOnInit(): void {
    this.bibleStateService.state.pipe(
      takeUntil(this.destroy$),
      tap(state => {
        this.state = state;
        if (this.versions) {
          this.updateUrls(this.versions);
        }
      }),
    ).subscribe();

    this.bibleService.getVersions().pipe(
      takeUntil(this.destroy$),
      tap(versions => {
        this.versions = versions;
        this.updateUrls(this.versions);
      }),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getVersionUrl(version: BibleVersion): string[] {
    if (this.state) {
      return this.bibleUrlService.fromState({
        ...this.state,
        version,
      });
    } else {
      return version.route;
    }
  }

  private updateUrls(versions: BibleVersion[]): void {
    this.urls = versions.reduce(
      (acc, version) => {
        return {
          ...acc,
          [version.id]: this.getVersionUrl(version),
        };
      },
      {},
    );
  }
}
