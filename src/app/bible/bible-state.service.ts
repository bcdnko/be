import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import {
  BibleState,
} from './bible.interfaces';

@Injectable()
export class BibleStateService {
  private stateSource$ = new BehaviorSubject(null);

  get state(): Observable<BibleState> {
    return this.stateSource$.asObservable();
  }

  setState(state: BibleState): void {
    window.scrollTo(0, 0);
    this.stateSource$.next(state);
  }
}
