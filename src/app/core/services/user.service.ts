import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { User } from '../interfaces/common.interfaces';

@Injectable()
export class UserService {
  private readonly userSource$ = new BehaviorSubject(null);
  readonly user$ = this.userSource$.asObservable();

  setUser(user: User): void {
    this.userSource$.next(user);
  }
}

