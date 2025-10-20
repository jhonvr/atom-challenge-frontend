import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { firstValueFrom } from 'rxjs';

import { SessionService } from '@shared/services/session.service';
import { DialogService } from '@shared/services/dialog.service';
import { ConfirmDialogComponent } from '@shared/components/confirm/confirm.component';
import { TaskCreateDialogComponent } from './components/task-create-dialog.component';
import { TaskServiceStore } from './services/task-store.service';
import { TaskService } from './services/task.service';
import { TaskStore } from './model/task-store.model';
import { ToastService } from '@shared/services/toast.service';

@Component({
  standalone: true,
  selector: 'app-tasks',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  providers: [TaskServiceStore, TaskService]
})
export class TasksComponent implements OnInit {
  private store = inject(TaskServiceStore);
  private dialog = inject(DialogService);
  private session = inject(SessionService);
  private toastService = inject(ToastService)

  pending = this.store.pendingSorted;
  completed = this.store.completedSorted;
  hasAnything = computed(() => this.pending().length + this.completed().length > 0);

  ngOnInit() {
    this.store.load();
  }

  async logOut() {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      title: 'Cerrar Sesión',
      message: `¿Deseas cerrar sesión?`,
    });

    const confirm = await firstValueFrom(ref.afterClosed());

    if (confirm) {
      this.session.logout();
    }
  }

  async openCreate() {
    const ref = this.dialog.open(TaskCreateDialogComponent);
    const result = await firstValueFrom(ref.afterClosed());
    const body = {
      title: result.title, description: result.description
    }
    if (result) {
      await this.store.add(body);
      this.toastService.success('Tarea creada correctamente');
    }
  }

  async onToggle(evt: MatCheckboxChange, t: TaskStore) {
    t.completed = evt.checked;
    await this.store.toggleComplete(t);
    this.toastService.success(`Estado de la tarea actualizada correctamente`);
  }

  async rename(t: TaskStore) {
    const ref = this.dialog.open(TaskCreateDialogComponent, t);
    const result = await firstValueFrom(ref.afterClosed());
    if (result) {
      await this.store.update(result);
      this.toastService.success('Tarea actualizada correctamente');
    }
  }

  async remove(t: TaskStore) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      title: 'Eliminar tarea',
      message: `¿Deseas eliminar la tarea:<br><strong>${t.title}</strong>?`,
    });
    const confirm = await firstValueFrom(ref.afterClosed());
    if (confirm) {
      await this.store.remove(t.id);
      this.toastService.success('Tarea eliminada correctamente');
    }
  }
}
