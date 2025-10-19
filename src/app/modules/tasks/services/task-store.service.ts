import { Injectable, computed, signal, inject } from '@angular/core';
import { SessionService } from '@shared/services/session.service';
import { firstValueFrom } from 'rxjs';
import { TaskStore } from '../model/task-store.model';
import { TaskService } from './task.service';

@Injectable()
export class TaskServiceStore {
  private taskService = inject(TaskService);
  private session = inject(SessionService);

  private _tasks = signal<TaskStore[]>([]);
  readonly tasks = computed(() => this._tasks());
  readonly pendingSorted = computed(() =>
    this._tasks()
      .filter(t => !t.completed)
      .sort((a, b) => b.createdAt - a.createdAt)
  );
  readonly completedSorted = computed(() =>
    this._tasks()
      .filter(t => t.completed)
      .sort((a, b) => b.createdAt - a.createdAt)
  );

  async load() {
    const data = await firstValueFrom(this.taskService.listTasks());
    this._tasks.set(data);
  }

  async add(title: string, description: string) {
    const created = await firstValueFrom(this.taskService.createTask({ title, description }));
    this._tasks.update(arr => [created, ...arr]);
  }

  async toggleComplete(taskId: string, completed: boolean) {
    await firstValueFrom(this.taskService.updateTask(taskId));
    this._tasks.update(arr => arr.map(t => t.id === taskId ? { ...t, completed } : t));
  }

  async update(body: TaskStore) {
    await firstValueFrom(this.taskService.updateTask(body));
    this._tasks.update(arr => arr.map(t => t.id === body.id ? { ...t, ...body } : t));
  }

  async remove(taskId: string) {
    await firstValueFrom(this.taskService.deleteTask(taskId));
    this._tasks.update(arr => arr.filter(t => t.id !== taskId));
  }
}

