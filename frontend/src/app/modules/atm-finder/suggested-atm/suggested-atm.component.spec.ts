import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestedAtmComponent } from './suggested-atm.component';

describe('SuggestedAtmComponent', () => {
  let component: SuggestedAtmComponent;
  let fixture: ComponentFixture<SuggestedAtmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestedAtmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestedAtmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
