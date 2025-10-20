import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '@modules/auth/model/user-response.model';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private key = 'session_atom_challenge';
  private router = inject(Router);

  currentUser(): string | null {
    return sessionStorage.getItem(this.key);
  }

  setUser(id: string) {
    sessionStorage.setItem(this.key, id);
  }

  logout() {
    sessionStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
