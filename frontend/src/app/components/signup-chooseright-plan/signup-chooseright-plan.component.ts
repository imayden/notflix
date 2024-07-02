import { Component } from '@angular/core';
import { Plan } from '../../interfaces/plan';

@Component({
  selector: 'app-signup-chooseright-plan',
  templateUrl: './signup-chooseright-plan.component.html',
  styleUrl: './signup-chooseright-plan.component.scss'
})
export class SignupChooserightPlanComponent {

  plans: Plan[] = [
    {
      headingColor: 'radial-gradient(140.76% 131.96% at 100% 100%, rgb(229, 9, 20) 0%, rgba(74, 42, 150, 0.5) 73.57%, rgba(74, 42, 150, 0) 100%), rgb(29, 82, 157)',
      selected: true,
      planName: 'Premium',
      description: '4K + HDR',
      monthlyPrice: '$22.99',
      quality: 'Best',
      resolutions: '4K (Ultra HD) + HDR',
      spatialAudio: 'Included',
      supportedDevices: 'TV, computer, mobile phone, tablet',
      maxDeviceCount: 4,
      downloadDeviceCount: 6,
      ads: 'No ads'
    },
    {
      headingColor: 'radial-gradient(140.76% 131.96% at 100% 100%, rgb(176, 56, 220) 0%, rgba(74, 42, 150, 0.5) 73.57%, rgba(74, 42, 150, 0) 100%), rgb(29, 82, 157)',
      selected: false,
      planName: 'Standard',
      description: '1080p',
      monthlyPrice: '$15.49',
      quality: 'Good',
      resolutions: '1080p (Full HD)',
      spatialAudio: 'Available',
      supportedDevices: 'TV, computer, mobile phone, tablet',
      maxDeviceCount: 2,
      downloadDeviceCount: 2,
      ads: 'No ads'
    },
    {
      headingColor: 'radial-gradient(140.76% 131.96% at 100% 100%, rgb(109, 59, 227) 0%, rgba(74, 42, 150, 0.5) 73.57%, rgba(74, 42, 150, 0) 100%), rgb(29, 82, 157)',
      selected: false,
      planName: 'Standard with ads',
      description: '1080p',
      monthlyPrice: '$6.99',
      quality: 'Good',
      resolutions: '1080p (Full HD)',
      spatialAudio: '',
      supportedDevices: 'TV, computer, mobile phone, tablet',
      maxDeviceCount: 2,
      downloadDeviceCount: 2,
      ads: 'Less than you might think'
    }
  ];

  selectPlan(plan: Plan) {
    this.plans.forEach(p => p.selected = false);
    plan.selected = true;
  }

}
