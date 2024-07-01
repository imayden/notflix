import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupChooserightPlanComponent } from './signup-chooseright-plan.component';

describe('SignupChooserightPlanComponent', () => {
  let component: SignupChooserightPlanComponent;
  let fixture: ComponentFixture<SignupChooserightPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupChooserightPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupChooserightPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
