import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BibleIndexComponent } from './bible-index.component';

describe('BibleIndexComponent', () => {
  let component: BibleIndexComponent;
  let fixture: ComponentFixture<BibleIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BibleIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BibleIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
