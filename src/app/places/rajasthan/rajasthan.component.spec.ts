import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RajasthanComponent } from './rajasthan.component';

describe('RajasthanComponent', () => {
  let component: RajasthanComponent;
  let fixture: ComponentFixture<RajasthanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RajasthanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RajasthanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
