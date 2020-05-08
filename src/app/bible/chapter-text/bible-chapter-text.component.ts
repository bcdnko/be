import { Component, OnChanges, Input, SimpleChanges, SimpleChange } from '@angular/core';

import {
  BibleVerse,
} from '../bible.interfaces';

@Component({
  selector: 'be-bible-chapter-text',
  templateUrl: './bible-chapter-text.component.html',
  styleUrls: ['./bible-chapter-text.component.scss'],
  preserveWhitespaces: false,
})
export class BibleChapterTextComponent implements OnChanges {

  @Input()
  verses: BibleVerse[];

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['verses']) {
      this.handleVersesInputChange(changes['verses']);
    }
  }

  private handleVersesInputChange(change: SimpleChange): void {
    const verses: BibleVerse[] = change.currentValue;
    if (!verses) {
      return;
    }
  }

}
