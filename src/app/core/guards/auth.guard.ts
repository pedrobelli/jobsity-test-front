import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../../shared/services/auth.service';
import { AlertService } from '../services/alert.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const alertService = inject(AlertService);
  const router = inject(Router);

  const authenticated = authService.isAuthenticated();

    if (authenticated) {
      return true;
    } else {
      alertService.alert('You don\'t have permission to access this page!')
      router.navigate(['/login']);

      return false;
    }
};
