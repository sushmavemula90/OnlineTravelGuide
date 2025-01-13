import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AndhraPradeshComponent } from './andhra-pradesh.component';

describe('AndhraPradeshComponent', () => {
  let component: AndhraPradeshComponent;
  let fixture: ComponentFixture<AndhraPradeshComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AndhraPradeshComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AndhraPradeshComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
