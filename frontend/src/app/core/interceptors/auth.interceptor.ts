import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { AUTHSERVER } from '../core.module';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    @Inject(AUTHSERVER) private authServerPath: string
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.authService.userSignal();
    const isApiUrl = req.url.startsWith(`${this.authServerPath}/auth/sign`);

    if (user && user.jwtToken && !isApiUrl) {
      req = req.clone({
        setHeaders: { 
          Authorization: 
          `Bearer ${user.jwtToken}` 
          // || `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjMwNGE1YTMxN2Q1NWU5OWNjMDQyZGI1MGIwM2RhYiIsIm5iZiI6MTcyMDAyMjg4OS43MzkzMDcsInN1YiI6IjY2ODU3NDdiNjNkMGI1ZDdmYTFhNDViNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-IDAXqE7eXdh1vfvC2pgnQ-ijEBtk2diNqXxJ3sz6iI` 
        },

      });
    }

    console.log('req:', req);

    return next.handle(req);
  }
}


