import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import * as CryptoJS from 'crypto-js';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm!: FormGroup;
  errorMessage: string = '';
  isBrowser!: boolean;
  private encryptionKey = 'your_encryption_key';
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    @Inject(PLATFORM_ID) platformId: Object,
    private titleService: Title
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
        const decryptedPassword = this.decryptPassword(storedPassword);

        this.signinForm.patchValue({
          email: storedEmail,
          password: decryptedPassword,
          rememberMe: true
        });
      }
    }

    this.titleService.setTitle(`Sign In - Notflix`);
  }

  private encryptPassword(password: string): string {
    return CryptoJS.AES.encrypt(password, this.encryptionKey).toString();
  }

  private decryptPassword(encryptedPassword: string): string {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, this.encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
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
            const encryptedPassword = this.encryptPassword(password);
            localStorage.setItem('email', email);
            localStorage.setItem('password', encryptedPassword);
          } else {
            localStorage.removeItem('email');
            localStorage.removeItem('password');
          }
        }
        this.router.navigate(['/home']);
      },
      (error: any) => {
        this.errorMessage = '*Invalid Password, please try again!';
      }
    );
  }


}