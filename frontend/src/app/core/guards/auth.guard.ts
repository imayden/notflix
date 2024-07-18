import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  // Inject instances
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) { 
    // Allow route activation
    return true;
  } else {
    router.navigate(['/signin']);
    // Prevent route activation
    return false;
  }
};