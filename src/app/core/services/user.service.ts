import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { User } from '../interfaces/common.interfaces';

@Injectable()
export class UserService {
  private userSource$ = new BehaviorSubject(null);
  user$ = this.userSource$.asObservable();

  setUser(user: User): void {
    this.userSource$.next(user);
  }
}

