import { Component } from '@angular/core';
import { config } from '../../config';

@Component({
  selector: 'be-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {

  config = config;

}
