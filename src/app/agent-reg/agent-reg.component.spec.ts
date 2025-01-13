import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentRegComponent } from './agent-reg.component';

describe('AgentRegComponent', () => {
  let component: AgentRegComponent;
  let fixture: ComponentFixture<AgentRegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentRegComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgentRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});