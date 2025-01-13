import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PunjabComponent } from './punjab.component';

describe('PunjabComponent', () => {
  let component: PunjabComponent;
  let fixture: ComponentFixture<PunjabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PunjabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PunjabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
