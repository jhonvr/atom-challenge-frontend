import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User, UserResponse } from '../model/user-response.model';

const BASE = ''
@Injectable()
export class AuthService {

  private http = inject(HttpClient);

  findUser(email: string): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${BASE}/users/getUser`, { email });
  }

  createUser(email: string): Observable<User> {
    return this.http.post<User>(`${BASE}/users`, { email });
  }

}
