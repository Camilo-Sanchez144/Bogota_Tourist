import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const checkloginGuard: CanActivateFn = (route, state) => {
/**  const router = inject(Router);
  const token = localStorage.getItem('access');
  if (token) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
  */
 return true
};
