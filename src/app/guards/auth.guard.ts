import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '@shared/services/session.service';

export const canActivateAuth = () => {
  const session = inject(SessionService);
  const router = inject(Router);
  if (!session.currentUser()) {
    router.navigateByUrl('/login');
    return false;
  }
  return true;
};
