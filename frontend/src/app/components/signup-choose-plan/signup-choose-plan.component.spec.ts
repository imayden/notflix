import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupChoosePlanComponent } from './signup-choose-plan.component';

describe('SignupChoosePlanComponent', () => {
  let component: SignupChoosePlanComponent;
  let fixture: ComponentFixture<SignupChoosePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupChoosePlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupChoosePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
