import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { User } from '../interfaces/common.interfaces';
import { cloneDeep } from '../utils';
import { defaultSettings } from '../default-settings';

@Injectable()
export class UserService {
  private readonly userSource$ = new BehaviorSubject(null);
  readonly user$ = this.userSource$.asObservable();

  setUser(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
    this.userSource$.next(user);
  }

  initUser(): User {
    const serialized = localStorage.getItem('user');
    let user = JSON.parse(serialized);

    if (!user) {
      user = {
        name: null,
        settings: cloneDeep(defaultSettings),
      };
    } else {
      user.settings = {
        ...cloneDeep(defaultSettings),
        ...cloneDeep(user.settings),
      };
    }

    this.setUser(user);

    return user;
  }
}

