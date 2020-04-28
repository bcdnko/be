import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, of } from 'rxjs';
import {
  switchMap,
  tap,
} from 'rxjs/operators';

import {
  BibleVersion,
  BibleVersionId,
  BibleBooksByTestament,
} from '../bible.interfaces';
import { BibleService } from '../bible.service';
import { ConfigService } from '../../core/services/config.service';
import { UrlService } from '../../core/services/url.service';
import { Config } from '../../core/interfaces/common.interfaces';

@Component({
  selector: 'app-bible-index',
  templateUrl: './bible-index.component.html',
  styleUrls: ['./bible-index.component.scss']
})
export class BibleIndexComponent implements OnInit {
  protected config: Config = null;
  protected version: BibleVersion = null;
  protected books: BibleBooksByTestament = null;

  load$: Observable<BibleBooksByTestament>;

  private params: ParamMap = null;

  constructor(
    public urlService: UrlService,
    private route: ActivatedRoute,
    private bibleService: BibleService,
    private configService: ConfigService,
  ) {
  }

  ngOnInit(): void {
    this.load$ = this._loadData();
  }

  private _loadData(): Observable<BibleBooksByTestament> {
    const config$ = this._loadConfig();
    const version$ = this._loadVersion(config$);

    return this._loadBooks(version$);
  }

  private _loadConfig(): Observable<Config> {
    return this.route.paramMap.pipe(
      tap((params: ParamMap) => {
        this.params = params;
        this.config = null;
        this.version = null;
        this.books = null;
      }),
      switchMap((params: ParamMap) => this.configService.getConfig()),
      tap(config => this.config = config),
    );
  }

  private _loadVersion(config$: Observable<Config>): Observable<BibleVersion> {
    return config$.pipe(
      switchMap((config: Config) => {
        const versionId: BibleVersionId = this.params.get('versionId');
        return of(versionId || config.defaultVersionId);
      }),
      switchMap((versionId: BibleVersionId) => {
        return this.bibleService.getVersion(versionId);
      }),
      tap((version: BibleVersion) => this.version = version),
    );
  }

  private _loadBooks(version$: Observable<BibleVersion>): Observable<BibleBooksByTestament> {
    return version$.pipe(
      switchMap((version: BibleVersion) => {
        return this.bibleService.getBooksByTestament(version.id);
      }),
      tap((books: BibleBooksByTestament) => this.books = books),
    );
  }
}
