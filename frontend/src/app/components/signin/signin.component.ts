import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as jwt from 'jwt-simple';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm!: FormGroup;
  errorMessage: string = '';
  isBrowser!: boolean;
  private jwtSecret = 'your_jwt_secret';
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object,
    // private jwtHelper: JwtHelperService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.signinForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });

    if (this.isBrowser) {
      const storedEmail = localStorage.getItem('email');

      const storedPassword = localStorage.getItem('password'); 
      
      if (storedEmail && storedPassword) {
        // const decodedPassword = jwt.decode(storedPassword, this.jwtSecret);

        this.signinForm.patchValue({
          email: storedEmail,
          password: storedPassword,
          rememberMe: true
        });
      }
    }
  }

  signin() {
    if (this.signinForm.invalid) {
      this.signinForm.get('email')?.markAsTouched();
      this.signinForm.get('password')?.markAsTouched();
      return;
    }

    const { email, password, rememberMe } = this.signinForm.value;

    this.authService.login({ email, password }).subscribe(
      () => {
        if(this.isBrowser) {
          if(rememberMe) {
            localStorage.setItem('email', email);

            // const encodedPassword = jwt.encode(password, this.jwtSecret);
            // localStorage.setItem('password', encodedPassword);

            localStorage.setItem('password', password);
          } else {
            localStorage.removeItem('email');
            localStorage.removeItem('password');
          }
          sessionStorage.setItem('email', email);
          sessionStorage.setItem('password', password);
        }
        this.router.navigate(['/home']);
      },
      (error: any) => {
        this.errorMessage = '*Invalid Password, please try again!';
      }
    );
  }
}