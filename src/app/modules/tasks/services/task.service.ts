import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, TaskStore } from '../model/task-store.model';
import { ApiResponse } from '@shared/model/api-response.model';

const BASE = ''
@Injectable()
export class TaskService {
  private http = inject(HttpClient);

  listTasks(): Observable<TaskStore[]> {
    return this.http.get<TaskStore[]>(
      `${BASE}/tasks/`
    );
  }
  createTask(body: Task): Observable<TaskStore> {
    return this.http.post<TaskStore>(
      `${BASE}/tasks/`, body
    );
  }
  updateTask(body: TaskStore): Observable<TaskStore> {
    return this.http.put<TaskStore>(
      `${BASE}/tasks/${body.id}`, body
    );
  }
  deleteTask(id: string): Observable<ApiResponse> {
    return this.http.delete<ApiResponse>(
      `${BASE}/tasks/${id}`
    );
  }
}
