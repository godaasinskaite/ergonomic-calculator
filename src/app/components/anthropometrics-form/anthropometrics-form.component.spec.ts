import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnthropometricsFormComponent } from './anthropometrics-form.component';

describe('AnthropometricsFormComponent', () => {
  let component: AnthropometricsFormComponent;
  let fixture: ComponentFixture<AnthropometricsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnthropometricsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnthropometricsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
