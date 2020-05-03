import { Component, OnDestroy } from '@angular/core';

import { Subject, fromEvent } from 'rxjs';
import { tap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-to-top',
  templateUrl: './to-top.component.html',
  styleUrls: ['./to-top.component.scss']
})
export class ToTopComponent implements OnDestroy {

  isHidden = this.isScrolled();
  private destroy$: Subject<void> = new Subject();

  constructor() {
    fromEvent(window, 'scroll').pipe(
      takeUntil(this.destroy$),
      tap(() => this.onScroll()),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  isScrolled(): boolean {
    return window.scrollY < 300;
  }

  onScroll(): void {
    this.isHidden = this.isScrolled();
  }

  jump(): void {
    window.scrollTo(0,0);
  }
}
