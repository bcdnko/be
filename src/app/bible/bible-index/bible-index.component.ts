import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import {
  BibleBooksByTestament,
} from '../bible.interfaces';
import { BibleService } from '../bible.service';

@Component({
  selector: 'app-bible-index',
  templateUrl: './bible-index.component.html',
  styleUrls: ['./bible-index.component.scss']
})
export class BibleIndexComponent implements OnInit {

  protected books$: Observable<BibleBooksByTestament>

  constructor(
    private _bibleService: BibleService,
  ) {
    this.books$ = _bibleService.getBooksByTestament('kjv');
  }

  ngOnInit() {
  }

}
