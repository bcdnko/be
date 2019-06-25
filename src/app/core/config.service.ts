import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  map,
} from 'rxjs/operators';

import { Config } from './common.interfaces';
import { config } from '../config';

@Injectable()
export class ConfigService {
  get(key: string): Observable<Config[keyof Config]> {
    return this.getConfig().pipe(
      map(cfg => cfg[key]),
    );
  }

  getConfig(): Observable<Config> {
    return of(config);
  }
}
