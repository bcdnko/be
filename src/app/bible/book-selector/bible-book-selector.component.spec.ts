import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BibleBookSelectorComponent } from './bible-book-selector.component';

describe('BibleBookSelectorComponent', () => {
  let component: BibleBookSelectorComponent;
  let fixture: ComponentFixture<BibleBookSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BibleBookSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BibleBookSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
