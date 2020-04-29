import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpService } from '../core/services/http.service';

import {
  BibleVersion,
  BibleBookStored,
  BibleBook,
  BibleBookId,
  BibleVersionId,
  BibleBooksByTestament,
  BibleVerse,
} from './bible.interfaces';
import { bibleBookMapper } from './mappers/book.mapper';

@Injectable({
  providedIn: 'root',
})
export class BibleService {
  private baseUrl = 'assets/bible';

  constructor(
    private http: HttpService,
  ) {
  }

  getVersion(versionId: BibleVersionId): Observable<BibleVersion> {
    return this.http.get<BibleVersion>(`${this.baseUrl}/versions/${encodeURIComponent(versionId)}.json`);
  }

  getBooks(versionId: BibleVersionId): Observable<BibleBook[]> {
    // TODO move book mapper into a different class
    return this.http.get<BibleBookStored[]>(`${this.baseUrl}/versions/${encodeURIComponent(versionId)}/books.json`).pipe(
      map(books => books.map(book => bibleBookMapper(versionId, book))
     )
    );
  }

  getBooksByTestament(versionId: BibleVersionId): Observable<BibleBooksByTestament> {
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

  getVersesByChapter(versionId: BibleVersionId, bookId: BibleBookId, chapter: number): Observable<BibleVerse[]> {
    const url = `${this.baseUrl}/versions/${encodeURIComponent(versionId)}/books/${bookId}/${chapter}.json`;
    return this.http.get<BibleVerse[]>(url);
  }
}
