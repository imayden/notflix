import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupFinishSetupComponent } from './signup-finish-setup.component';

describe('SignupFinishSetupComponent', () => {
  let component: SignupFinishSetupComponent;
  let fixture: ComponentFixture<SignupFinishSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupFinishSetupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupFinishSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
