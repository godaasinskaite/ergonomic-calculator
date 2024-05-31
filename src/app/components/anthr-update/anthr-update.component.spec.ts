import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnthrUpdateComponent } from './anthr-update.component';

describe('AnthrUpdateComponent', () => {
  let component: AnthrUpdateComponent;
  let fixture: ComponentFixture<AnthrUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnthrUpdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnthrUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
