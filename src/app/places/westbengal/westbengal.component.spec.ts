import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WestbengalComponent } from './westbengal.component';

describe('WestbengalComponent', () => {
  let component: WestbengalComponent;
  let fixture: ComponentFixture<WestbengalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WestbengalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WestbengalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
