import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('access');
  
  if (token) {
    router.navigate(['/home']);
    return false;
  } else {
    return true;
  }
};
