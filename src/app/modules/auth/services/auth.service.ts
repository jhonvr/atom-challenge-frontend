import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserResponse } from '../model/user-response.model';

const BASE = 'api'
@Injectable()
export class AuthService {

  private http = inject(HttpClient);

  findUser(email: string): Observable<UserResponse> {
    return this.http.post<UserResponse>(
      `${BASE}/users/`, { email }
    );
  }

  createUser(email: string): Observable<any> {
    return this.http.post<any>(`${BASE}/users`, { email });
  }

}
