import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent implements OnInit {
  signinForm!: FormGroup;
  errorMessage: string = '';
  rememberMe: boolean = false;
  isBrowser!: boolean;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.signinForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
      rememberMe: [false]
    });

    if (this.isBrowser) {
      // check local storage for rememberMe
      const storedUsername = localStorage.getItem('username');
      const storedPassword = localStorage.getItem('password');

      if (storedUsername && storedPassword) {
        this.signinForm.patchValue({
          username: storedUsername,
          password: storedPassword,
          rememberMe: true
        });
      }
    }
  }

  // signin
  signin() {
    if (this.signinForm.invalid) {
      this.signinForm.get('username')?.markAsTouched();
      this.signinForm.get('password')?.markAsTouched();
      return;
    }

    const { username, password, rememberMe } = this.signinForm.value;

    const options = {
      headers: {
        accept: 'application/json',
        'Authorization': `Bearer ${password}`
      }
    };

    // send http request
    this.http.get(
      'https://api.themoviedb.org/3/account', options)
    .subscribe(
      () => {
        if(this.isBrowser){
          if(rememberMe){
            localStorage.setItem('username', username);
            localStorage.setItem('password', password);
          } else {
            localStorage.removeItem('username');
            localStorage.removeItem('password');
          }
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('password', password);
        }
        this.router.navigate(['home]']);
      },

      // Validate TMDb API Read Token
      (error: HttpErrorResponse) => {
        if (error.status !== 200) {
          this.errorMessage = '*Invalid Token! Please enter a valid TMDB API Read Token.';
        }
      }
    )

  }
}