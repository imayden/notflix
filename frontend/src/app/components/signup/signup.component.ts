import { Component, OnInit } from '@angular/core';
import { SignupChoosePlanComponent } from '../signup-choose-plan/signup-choose-plan.component';
import { SignupChooserightPlanComponent } from '../signup-chooseright-plan/signup-chooseright-plan.component';
import { SignupFinishSetupComponent } from '../signup-finish-setup/signup-finish-setup.component';
import { SignupCreateAccountComponent } from '../signup-create-account/signup-create-account.component';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent implements OnInit {
  currentStep = 0;

  constructor(
    private titleService: Title
  ){}

  ngOnInit(): void {
    this.titleService.setTitle('Sign Up - Notflix');
  }

  steps = [
    'SignupChoosePlanComponent',
    'SignupChooseRightPlanComponent',
    'SignupFinishSetupComponent',
    'SignupCreateAccountComponent'
  ];

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

}
