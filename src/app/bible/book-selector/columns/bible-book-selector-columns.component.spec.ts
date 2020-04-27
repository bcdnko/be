import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BibleBookSelectorColumnsComponent } from './bible-book-selector-columns.component';

describe('BibleBookSelectorColumnsComponent', () => {
  let component: BibleBookSelectorColumnsComponent;
  let fixture: ComponentFixture<BibleBookSelectorColumnsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BibleBookSelectorColumnsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BibleBookSelectorColumnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
