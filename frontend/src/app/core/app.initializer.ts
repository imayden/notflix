import { AuthService } from "../services/auth.service";
import { finalize } from 'rxjs/operators';

export const appInitializer = (authService: AuthService) => {
  console.log('this is Initialization');
  return () =>
    new Promise<void>((resolve) => {
      // attempt to refresh token on app start up to auto authenticate
      authService.refreshToken().pipe(
        finalize(() => resolve())
      ).subscribe();
    });
};
