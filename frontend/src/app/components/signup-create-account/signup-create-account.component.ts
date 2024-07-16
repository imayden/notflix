// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthService } from '../../services/auth.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-signup-create-account',
//   templateUrl: './signup-create-account.component.html',
//   styleUrls: ['./signup-create-account.component.scss']
// })
// export class SignupCreateAccountComponent {
//   signupForm: FormGroup;
//   errorMessage: string = '';
//   router: Router = new Router();

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService
//   ) {
//     this.signupForm = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(4)]]
//     });
//   }

//   signup() {
//     if (this.signupForm.invalid) {
//       this.signupForm.get('email')?.markAsTouched();
//       this.signupForm.get('password')?.markAsTouched();
//       return;
//     }

//     const userRole = { role: 'User' }; // Default Role: User

//     this.authService.signup({ ...this.signupForm.value, ...userRole }).subscribe(
//       () => {
//         // Register Successfully
//         // this.router.navigate(['/signin']);
//         confirm('Signup Successfully');
//       },
//       (error: any) => {
//         this.errorMessage = 'Failed to register, please try again!';
//       }
//     );
//   }
// }

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
      username: ['', Validators.required],
      tmdb_key: ['', Validators.required]
    });
  }

  signup() {
    if (this.signupForm.invalid) {
      this.signupForm.get('email')?.markAsTouched();
      this.signupForm.get('password')?.markAsTouched();
      this.signupForm.get('username')?.markAsTouched();
      this.signupForm.get('tmdb_key')?.markAsTouched();
      return;
    }

    const userRole = { role: 'User' }; // Default Role: User

    this.authService.signup({ ...this.signupForm.value, ...userRole }).subscribe(
      () => {
        this.router.navigate(['/signin']); // Redirect to signin page
      },
      (error: any) => {
        this.errorMessage = 'Failed to register, please try again!';
      }
    );
  }
}
