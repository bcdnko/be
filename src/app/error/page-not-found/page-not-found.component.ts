import { Component } from '@angular/core';
import { config } from '../../config';

@Component({
  selector: 'be-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {

  config = config;

}
