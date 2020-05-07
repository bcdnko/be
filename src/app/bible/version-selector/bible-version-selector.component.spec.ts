import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BibleVersionSelectorComponent } from './bible-version-selector.component';

describe('BibleVersionSelectorComponent', () => {
  let component: BibleVersionSelectorComponent;
  let fixture: ComponentFixture<BibleVersionSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BibleVersionSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BibleVersionSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
