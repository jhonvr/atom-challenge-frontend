import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const BASE = ''
@Injectable()
export class TaskService {
  private http = inject(HttpClient);

  listTasks(): Observable<any[]> {
    return this.http.get<any[]>(
      `${BASE}/tasks/`
    );
  }
  createTask(body: any): Observable<any> {
    return this.http.post<any>(
      `${BASE}/tasks/`, body
    );
  }
  updateTask(body: any): Observable<any> {
    return this.http.post<any>(
      `${BASE}/tasks/`, { body }
    );
  }
  deleteTask(id: string): Observable<any> {
    return this.http.post<any>(
      `${BASE}/tasks/`, { id }
    );
  }
}
