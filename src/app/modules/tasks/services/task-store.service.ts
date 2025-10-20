import { Injectable, computed, signal, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Task, TaskStore } from '../model/task-store.model';
import { TaskService } from './task.service';

@Injectable()
export class TaskServiceStore {
  private taskService = inject(TaskService);

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

  async add(body: Task) {
    const created = await firstValueFrom(this.taskService.createTask(body));
    this._tasks.update(arr => [created, ...arr]);
  }

  async toggleComplete(task: TaskStore) {
    await firstValueFrom(this.taskService.updateTask(task));
    this.load();
  }

  async update(body: TaskStore) {
    await firstValueFrom(this.taskService.updateTask(body));
    this.load();
  }

  async remove(taskId: string) {
    await firstValueFrom(this.taskService.deleteTask(taskId));
    this._tasks.update(arr => arr.filter(t => t.id !== taskId));
  }
}

