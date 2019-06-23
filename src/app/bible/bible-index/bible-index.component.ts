import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import {
  switchMap,
} from 'rxjs/operators';

import {
  BibleVersion,
  BibleBooksByTestament,
} from '../bible.interfaces';
import { BibleService } from '../bible.service';

@Component({
  selector: 'app-bible-index',
  templateUrl: './bible-index.component.html',
  styleUrls: ['./bible-index.component.scss']
})
export class BibleIndexComponent implements OnInit {

  protected books$: Observable<BibleBooksByTestament>;
  protected version: BibleVersion;

  constructor(
    private route: ActivatedRoute,
    private bibleService: BibleService,
  ) {
  }

  ngOnInit(): void {
    this._loadData();
  }

  private _loadData(): void {
    this.books$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        return this.bibleService.getVersion(params.get('versionId'));
      }),
      switchMap(version => {
        this.version = version;
        return this.bibleService.getBooksByTestament(version.id);
      }),
    );
  }
}
