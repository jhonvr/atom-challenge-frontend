import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private key = 'session_atom_challenge';
  private router = inject(Router);

  currentUser(): string | null {
    return localStorage.getItem(this.key);
  }

  setUser(email: string) {
    localStorage.setItem(this.key, email);
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

}
