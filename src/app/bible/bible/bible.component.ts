import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BibleStateService } from '../bible-state.service';

@Component({
  selector: 'app-bible',
  templateUrl: './bible.component.html',
  styleUrls: ['./bible.component.scss']
})
export class BibleComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bibleStateService: BibleStateService,
  ) {
    // TODO take until
    route.firstChild.params.subscribe((params) => {
      bibleStateService.setState({
        version: params.version,
        book: params.book,
        chapter: params.chapter,
        selectedVerses: [],
      });
    });
  }

  ngOnInit(): void {
  }

}
