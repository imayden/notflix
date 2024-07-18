import { Injectable, Inject, PLATFORM_ID, inject, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AppUserAuth } from '../interfaces/user-auth';
import { AuthDto } from '../interfaces/auth-dto';
import { AUTHSERVER } from '../core/core.module';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  private username: string | null = null;
  private jwtHelper = new JwtHelperService();
  userSignal = signal<AppUserAuth>({});

  private refreshTokenTimeout!: ReturnType<typeof setTimeout>;


  private isBrowser!: boolean;
  private readonly platform = inject(PLATFORM_ID);

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient,
    @Inject(AUTHSERVER) public readonly authServerPath: string,
  ) {
    this.isBrowser = isPlatformBrowser(this.platform);
    if (this.isBrowser) {
      this.token = localStorage.getItem('access_token');
      this.username = localStorage.getItem('username');
    }
  }

  /* Auth Guard */ 
  isAuthenticated(): boolean {
    const token = this.isBrowser ? localStorage.getItem('access_token') : null;
    return token ? !this.jwtHelper.isTokenExpired(token) : false;
  }

  getUsername(): string | null {
    return this.username;
  }
  
  
  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('username');
      this.token = null;
      this.username = null;
      this.router.navigate(['/signin']);
    }
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
  

  /* SignUp */
  signup(userData: { email: string; username: string; password: string; tmdb_key: string; role: string }): Observable<AuthDto> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<AuthDto>(`${this.authServerPath}/auth/signup`, userData, { headers })
      .pipe(
        tap(({ accessToken, role }: AuthDto) => {
          this.setUserValueByToken({ accessToken, role });
          this.router.navigate(['/home']);
        }),
        catchError((error) => {
          return throwError('Something went wrong during sign up!', error);
        }),
      );
  }
  

  private setUserValueByToken = ({ accessToken, role }: AuthDto) => {
    if (this.isBrowser) {
      localStorage.setItem('access_token', accessToken);
      // no need to set everything to localStorage, only jwttoken
      const { id, username, email, exp } = this.jwtHelper.decodeToken(accessToken);
      localStorage.setItem('username', username);  
      this.username = username;
      const user = { ...{ id, username, email, role }, jwtToken: accessToken };
      this.userSignal.set(user);
      this.startRefreshTokenTimer(exp);
    }
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
