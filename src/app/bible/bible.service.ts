import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpService } from '../core/services/http.service';

import {
  BibleVersion,
  BibleBook,
  BibleBooksByTestament,
} from './bible.interfaces';

@Injectable({
  providedIn: 'root',
})
export class BibleService {
  private baseUrl = 'assets/bible/';

  constructor(
    private http: HttpService,
  ) {
  }

  getVersion(versionId: string): Observable<BibleVersion> {
    return this.http.get<BibleVersion>(`${this.baseUrl}/versions/${encodeURIComponent(versionId)}.json`);
  }

  getBooks(versionId: string): Observable<BibleBook[]> {
    return this.http.get<BibleBook[]>(`${this.baseUrl}/versions/${encodeURIComponent(versionId)}/books.json`);
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
