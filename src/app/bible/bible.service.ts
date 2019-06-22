import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpService } from '../core/http.service';

import {
  BibleBook,
  BibleBooksByTestament,
} from './bible.interfaces';

@Injectable({
  providedIn: 'root',
})
export class BibleService {
  private _baseUrl = 'assets/bible/versions/';

  constructor(
    private http: HttpService,
  ) {
  }

  getBooks(versionId: string): Observable<BibleBook[]> {
    return this.http.get<BibleBook[]>(this._baseUrl + '/' + encodeURIComponent(versionId) + '/books.json');
  }

  getBooksByTestament(versionId: string): Observable<BibleBooksByTestament> {
    return this
      .getBooks(versionId)
      .pipe(
        map(_ => {
          return _.reduce((acc, item) => {
            acc[item.testament].push(item);
            return acc;
          }, { old: [], new: []});
        })
      );
  }
}
