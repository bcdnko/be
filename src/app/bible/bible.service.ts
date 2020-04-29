import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpService } from '../core/services/http.service';

import {
  BibleVersion,
  BibleBookStored,
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
    // TODO move book mapper into a different class
    return this.http.get<BibleBookStored[]>(`${this.baseUrl}/versions/${encodeURIComponent(versionId)}/books.json`).pipe(
      map(books => books.map(book => {
        return {
          ...book,
          aliasesIndex: book.aliases.map(alias => alias.toLowerCase()),
          route: [
            '/bible',
            versionId,
            book.aliases[0].toLowerCase(),
            1,
          ],
          chaptersArray: new Array(book.chapters)
            .fill(1)
            .map((v, i) => {
              const num = i + 1;
              return {
                number: num,
                route: [
                  '/bible',
                  versionId,
                  book.aliases[0].toLowerCase(),
                  num,
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
