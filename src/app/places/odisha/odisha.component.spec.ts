import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdishaComponent } from './odisha.component';

describe('OdishaComponent', () => {
  let component: OdishaComponent;
  let fixture: ComponentFixture<OdishaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OdishaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OdishaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
