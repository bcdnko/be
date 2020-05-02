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
import { BibleUrlService } from './bible-url.service';

@Injectable()
export class BibleService {
  private baseUrl = 'assets/bible';

  constructor(
    private http: HttpService,
    private bibleUrlService: BibleUrlService,
  ) {
  }

  getVersion(versionId: BibleVersionId): Observable<BibleVersion> {
    return this.http.get<BibleVersion>(`${this.baseUrl}/versions/${encodeURIComponent(versionId)}.json`);
  }

  getBooks(versionId: BibleVersionId): Observable<BibleBook[]> {
    return this.http.get<BibleBookStored[]>(`${this.baseUrl}/versions/${encodeURIComponent(versionId)}/books.json`).pipe(
      map(books => books.map(book => bibleBookMapper(this.bibleUrlService, versionId, book))
     )
    );
  }

  groupBooksByTestament(books: BibleBook[]): BibleBooksByTestament {
    const result = [
      { title: 'Old Testament', books: []},
      { title: 'New Testament', books: []},
    ];

    return books.reduce((acc, item) => {
      const testamentIndex = item.testament === 'new' ? 1 : 0;
      acc[testamentIndex].books.push(item);
      return acc;
    }, result);
  }

  getVersesByChapter(versionId: BibleVersionId, bookId: BibleBookId, chapter: number): Observable<BibleVerse[]> {
    const url = `${this.baseUrl}/versions/${encodeURIComponent(versionId)}/books/${bookId}/${chapter}.json`;
    return this.http.get<BibleVerse[]>(url);
  }

}

