import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { AppState } from '../interfaces/common.interfaces';

@Injectable()
export class AppStateService {
  private stateSource$ = new BehaviorSubject(null);

  get state(): Observable<AppState> {
    return this.stateSource$.asObservable();
  }

  setState(state: AppState): void {
    this.stateSource$.next(state);
  }
}

