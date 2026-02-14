import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/**
 * Auth Guard to protect routes from unauthorized access
 * Checks for auth_token in localStorage
 * Redirects to login page if not authenticated
 */
export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const isAuthenticated = !!localStorage.getItem('auth_token');

  if (isAuthenticated) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
