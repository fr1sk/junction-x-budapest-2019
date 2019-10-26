import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtmMapComponent } from './atm-map.component';

describe('AtmMapComponent', () => {
  let component: AtmMapComponent;
  let fixture: ComponentFixture<AtmMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtmMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtmMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
