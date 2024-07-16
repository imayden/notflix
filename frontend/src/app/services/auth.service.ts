// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Inject, Injectable } from '@angular/core';
// import { Router } from '@angular/router';
// import { JwtHelperService } from '@auth0/angular-jwt';
// import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
// import { tap, catchError } from 'rxjs/operators';

// import { AppUserAuth, UserRole } from '../interfaces/user-auth';
// import { AppUser } from '../interfaces/user-login';
// import { AppUserRegister, UserInfo } from '../interfaces/user-signup';
// import { AuthDto } from '../interfaces/auth-dto';
// import { AUTHSERVER } from '../core/core.module';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   private jwtHelper = new JwtHelperService();
//   private appUserRegister = new AppUserRegister();
//   private refreshTokenTimeout!: ReturnType<typeof setTimeout>;
//   userSubject = new BehaviorSubject<AppUserAuth | null>(null);

//   constructor(
//     private readonly router: Router,
//     private readonly http: HttpClient,
//     @Inject(AUTHSERVER) public readonly authServerPath: string,
//   ) {}

//   login(appUser: AppUser): Observable<AuthDto> {
//     return this.http
//       .post<AuthDto>(`${this.authServerPath}/auth/signin`, appUser)
//       .pipe(
//         tap(({ accessToken, role }: AuthDto) => {
//           this.setUserValueByToken({ accessToken, role });
//           this.router.navigate(['/movies']);
//         }),
//         catchError((error) => {
//           return throwError('Failed while logginng in', error);
//         }),
//       );
//   }

//   logout() {
//     localStorage.removeItem('access_token');
//     this.stopRefreshTokenTimer();
//     this.userSubject.next(null);
//     this.router.navigate(['/home']);
//   }

//   signup(userRole: { role: UserRole }): Observable<AuthDto | string> {
//     this.appUserRegister = { ...this.appUserRegister, ...userRole };
//     const { username, password, email, role } = this.appUserRegister;

//     if (!username || !password || !email || !role) return of('Failed to register');

//     return this.http
//       .post<AuthDto>(`${this.authServerPath}/auth/signup`, this.appUserRegister)
//       .pipe(
//         tap(({ accessToken, role }: AuthDto) => {
//           this.setUserValueByToken({ accessToken, role });
//           this.router.navigate(['/home']);
//           console.log("Signup successfully");
//         }),
//         catchError((error) => {
//           return throwError('Error while registering', error);
//         }),
//       );
//   }

//   refreshToken(): Observable<AuthDto | string> {
//     const token = localStorage.getItem('access_token');
//     if (!token) {
//       this.router.navigate(['/']);
//       return of('Error while refreshing token');
//     }
//     const headers = new HttpHeaders().set('Authorization', token);
//     return this.http
//       .get<AuthDto>(`${this.authServerPath}/auth/refresh-token`, { headers })
//       .pipe(
//         tap(({ accessToken, role }: AuthDto) => {
//           this.setUserValueByToken({ accessToken, role });
//         }),
//       );
//   }

//   private startRefreshTokenTimer(exp: string) {
//     const expires = new Date(+exp * 1000);
//     const timeout = expires.getTime() - Date.now();
//     this.refreshTokenTimeout = setTimeout(() => {
//       if (this.userSubject.value?.jwtToken) {
//         this.refreshToken().subscribe();
//       }
//     }, timeout);
//   }

//   private stopRefreshTokenTimer() {
//     clearTimeout(this.refreshTokenTimeout);
//   }

//   private setUserValueByToken({ accessToken, role }: AuthDto) {
//     localStorage.setItem('access_token', accessToken);
//     const { id, username, email, exp } = this.jwtHelper.decodeToken(accessToken);
//     const user = { id, username, email, role, jwtToken: accessToken };
//     this.userSubject.next(user);
//     this.startRefreshTokenTimer(exp);
//   }


//   isAuthenticated(): boolean {
//     const token = localStorage.getItem('access_token');
//     return token ? !this.jwtHelper.isTokenExpired(token) : false;
//   }
// }

import { Injectable, Inject, PLATFORM_ID, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AppUserAuth, UserRole } from '../interfaces/user-auth';
import { AppUser } from '../interfaces/user-login';
// import { TmdbServies } from '../services/tmdb-services.service';
import { AppUserRegister, UserInfo } from '../interfaces/user-signup';
import { AuthDto } from '../interfaces/auth-dto';
import { AUTHSERVER } from '../core/core.module';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();
  userSignal = signal<AppUserAuth>({});

  private appUserRegister = new AppUserRegister();
  private refreshTokenTimeout!: ReturnType<typeof setTimeout>;

  get appNewUser(): AppUserRegister {
    return this.appUserRegister;
  }

  private isBrowser!: boolean;
  private readonly platform = inject(PLATFORM_ID);

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
    @Inject(AUTHSERVER) public readonly authServerPath: string,
  ) {
    this.isBrowser = isPlatformBrowser(this.platform);
  }

  /* SignIn */
  login(appUser: { email: string, password: string }): Observable<AuthDto> {
    return this.http.post<AuthDto>(`${this.authServerPath}/auth/signin`, appUser)
      .pipe(
        tap(({ accessToken, role }: AuthDto) => {
          this.setUserValueByToken({ accessToken, role });
          this.router.navigate(['/movies']);
        }),
        catchError((error) => {
          return throwError('SomeThing Wrong during sign in!', error);
        }),
      );
  }
  

  isAuthenticated(): boolean {
    const token = this.isBrowser ? localStorage.getItem('access_token') : null;
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  /* SignUp */
  addUserInfo(userInfo: UserInfo) {
    this.appUserRegister = {
      ...this.appUserRegister,
      ...userInfo,
    };
  }

  tmdb_key = "6b304a5a317d55e99cc042db50b03dab";

  signup(userRole: { email: string, password: string, role: UserRole }): Observable<AuthDto | string> {
    this.appUserRegister = { ...this.appUserRegister, ...userRole };
    const { email, password, role } = this.appUserRegister;

    if (!email || !password || !role) return of('Register failed');

    return this.http.post<AuthDto>([this.authServerPath, 'auth', 'signup'].join('/'), this.appUserRegister)
      .pipe(
        tap(({ accessToken, role }: AuthDto) => {
          this.setUserValueByToken({ accessToken, role });
          this.router.navigate(['/movies']);
        }),
        catchError((error) => {
          return throwError('SomeThing Wrong during sign up!', error);
        }),
      );
  }

  private setUserValueByToken = ({ accessToken, role }: AuthDto) => {
    if (this.isBrowser) localStorage.setItem('access_token', accessToken);
    const { id, username, email, exp } = this.jwtHelper.decodeToken(accessToken);
    const user = { ...{ id, username, email, role }, jwtToken: accessToken };
    this.userSignal.set(user);
    this.startRefreshTokenTimer(exp);
  };

  private startRefreshTokenTimer(exp: string) {
    const expires = new Date(+exp * 1000);
    const timeout = expires.getTime() - Date.now();
    this.refreshTokenTimeout = setTimeout(() => {
      if (this.userSignal().jwtToken) {
        this.refreshToken().subscribe();
      }
    }, timeout);
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }

  refreshToken(): Observable<AuthDto | string> {
    let token;
    if (this.isBrowser) token = localStorage.getItem('access_token');
    if (!token) {
      this.router.navigate(['/']);
      return of('err');
    }
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.get<AuthDto>(`${this.authServerPath}/auth/refresh-token`, { headers })
      .pipe(
        tap(({ accessToken, role }: AuthDto) => {
          this.setUserValueByToken({ accessToken, role });
        }),
      );
  }
}
