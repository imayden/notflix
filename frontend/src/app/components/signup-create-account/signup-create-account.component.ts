import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup-create-account',
  templateUrl: './signup-create-account.component.html',
  styleUrls: ['./signup-create-account.component.scss']
})
export class SignupCreateAccountComponent {
  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      tmdb_key: ['', [Validators.required, Validators.minLength(15)]],
      role: ['User', Validators.required]  // Default role as 'User'
    });
  }

  signup() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    const userData = this.signupForm.value;

    console.log("Frontend Input" + " ");
    console.log(userData);  // Check the data sent

    this.authService.signup(userData).subscribe(
      () => {
        this.router.navigate(['/signin']); // Redirect to signin page
      },
      (error: any) => {
        this.errorMessage = 'Failed to register, please try again!';
      }
    );

    console.log("Frontend Input" + " ");
    console.log(userData);  // Check the data sent
  }
}
