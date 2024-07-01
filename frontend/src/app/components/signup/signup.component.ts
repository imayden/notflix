import { Component } from '@angular/core';
import { SignupChoosePlanComponent } from '../signup-choose-plan/signup-choose-plan.component';
import { SignupChooserightPlanComponent } from '../signup-chooseright-plan/signup-chooseright-plan.component';
import { SignupFinishSetupComponent } from '../signup-finish-setup/signup-finish-setup.component';
import { SignupCreateAccountComponent } from '../signup-create-account/signup-create-account.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  currentStep = 0;

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
