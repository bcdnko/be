import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { BibleState } from './bible.interfaces';

@Injectable({
  providedIn: 'root',
})
export class BibleStateService {
  private stateSource$ = new BehaviorSubject(null);
  state = this.stateSource$.asObservable();

  setState(state: BibleState): void {
    window.scrollTo(0, 0);
    this.stateSource$.next(state);
  }
}
