import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Injectable()
export class ErrorFnInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        const authToken = this.authService.userSignal().jwtToken;
        if ([401, 403].includes(err.status) && authToken) {
          this.authService.logout();
        }

        const error = (err && err.error && err.error.message) || err.statusText;
        console.error(err);
        return throwError(error);
      }),
    );
  }
}
