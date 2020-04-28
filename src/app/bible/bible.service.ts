import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpService } from '../core/services/http.service';

import {
  BibleVersion,
  BibleBook,
  BibleBooksByTestament,
  BibleVerse,
} from './bible.interfaces';

@Injectable({
  providedIn: 'root',
})
export class BibleService {
  private baseUrl = 'assets/bible';

  constructor(
    private http: HttpService,
  ) {
  }

  getVersion(versionId: string): Observable<BibleVersion> {
    return this.http.get<BibleVersion>(`${this.baseUrl}/versions/${encodeURIComponent(versionId)}.json`);
  }

  getBooks(versionId: string): Observable<BibleBook[]> {
    return this.http.get<BibleBook[]>(`${this.baseUrl}/versions/${encodeURIComponent(versionId)}/books.json`).pipe(
      map(books => books.map(book => {
        return {
          ...book,
          chaptersArray: new Array(book.chapters)
            .fill(1)
            .map((v, i) => {
              const number = i + 1;
              return {
                number: number,
                route: [
                  '/bible',
                  versionId,
                  book.id,
                  number,
                ],
              };
            }),
        };
      })
     )
    );
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

  getVersesByChapter(versionId: string, bookId: number, chapter: number): Observable<BibleVerse[]> {
    const url = `${this.baseUrl}/versions/${encodeURIComponent(versionId)}/books/${bookId}/${chapter}.json`;
    return this.http.get<BibleVerse[]>(url);
  }
}
