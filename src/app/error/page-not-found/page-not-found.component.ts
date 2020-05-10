import { Component, OnInit } from '@angular/core';

import { config } from '../../config';

@Component({
  selector: 'be-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  config = config;

  constructor() { }

  ngOnInit(): void {
  }

}
