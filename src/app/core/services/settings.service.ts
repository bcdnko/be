import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  map,
} from 'rxjs/operators';

import { Settings } from '../interfaces/common.interfaces';

@Injectable()
export class SettingsService {
  private readonly source$ = new BehaviorSubject<Settings>(null);
  readonly settings$: Observable<Settings> = this.source$.asObservable();

  setSettings(settings: Settings) {
    this.source$.next(settings);
  }

  get(key: string): Observable<Settings[keyof Settings]> {
    return this.settings$.pipe(
      map(cfg => cfg[key]),
    );
  }
}
