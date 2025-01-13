import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelanganaComponent } from './telangana.component';

describe('TelanganaComponent', () => {
  let component: TelanganaComponent;
  let fixture: ComponentFixture<TelanganaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TelanganaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelanganaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
