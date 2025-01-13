import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UttarpradeshComponent } from './uttarpradesh.component';

describe('UttarpradeshComponent', () => {
  let component: UttarpradeshComponent;
  let fixture: ComponentFixture<UttarpradeshComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UttarpradeshComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UttarpradeshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
