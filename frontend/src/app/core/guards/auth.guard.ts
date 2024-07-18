import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {

  // Inject instances
  const authService = inject(AuthService);
  const router = inject(Router);


  if (authService.isAuthenticated()) { 
    // Allow route activation
    return true;
  } else {
    // Navigate to loading page
    router.navigate(['/loading']);
    
    // Wait for 2 seconds and then check authentication again
    return of(null).pipe(
      delay(2000),
      map(() => {
        if (authService.isAuthenticated()) {
          return true;
        } else {
          router.navigate(['/signin']);
          return false;
        }
      })
    );
  }
};