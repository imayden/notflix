import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrl: './get-started.component.scss'
})
export class GetStartedComponent {

  getStartedForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.getStartedForm = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.minLength(5), Validators.maxLength(50)]]
    });
  }

  get email() {
    return this.getStartedForm.get('email');
  }

  onSubmit() {
    if (this.getStartedForm.valid) {
      window.location.href = '/signup';
    } else {
      this.getStartedForm.get('email')?.markAsTouched();
    }
  }

}
