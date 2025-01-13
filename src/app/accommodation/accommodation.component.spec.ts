import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationComponent } from './accommodation.component';

describe('AccomodationComponent', () => {
  let component: AccommodationComponent;
  let fixture: ComponentFixture<AccommodationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccommodationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});