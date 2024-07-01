import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupCreateAccountComponent } from './signup-create-account.component';

describe('SignupCreateAccountComponent', () => {
  let component: SignupCreateAccountComponent;
  let fixture: ComponentFixture<SignupCreateAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupCreateAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SignupCreateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
