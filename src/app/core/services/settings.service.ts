import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import {
  map,
  tap,
} from 'rxjs/operators';

import { Settings, User } from '../interfaces/common.interfaces';
import { UserService } from './user.service';
import { cloneDeep } from '../utils';

@Injectable()
export class SettingsService {
  private readonly source$ = new BehaviorSubject<Settings>(null);
  readonly settings$: Observable<Settings> = this.source$.asObservable();
  private user: User = null;

  constructor(
    public userService: UserService,
  ) {
    userService.user$.pipe(
      tap(user => this.user = user),
      map(user => user ? user.settings : null),
    ).subscribe(this.source$);
  }

  setSettings(settings: Settings) {
    if (!this.user) {
      throw new Error('User is not defined');
    }

    this.userService.setUser(cloneDeep({
      ...this.user,
      settings,
    }));
  }

  get(key: string): Observable<Settings[keyof Settings]> {
    return this.settings$.pipe(
      map(cfg => cfg[key]),
    );
  }
}
