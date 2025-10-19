import { Component, Inject, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { DialogService } from '@shared/services/dialog.service';
import { ConfirmDialogComponent } from '@shared/components/confirm/confirm.component';
import { firstValueFrom } from 'rxjs';
import { TaskStore } from '../model/task-store.model';

@Component({
  standalone: true,
  selector: 'app-task-create-dialog',
  imports: [
    CommonModule, ReactiveFormsModule,
    MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule
  ],
  templateUrl: './task-create-dialog.component.html',
  styleUrl: './task-create-dialog.component.scss'
})
export class TaskCreateDialogComponent implements OnInit {
  dialogRef = inject(MatDialogRef<TaskCreateDialogComponent>);
  loading = false;


  form = inject(FormBuilder).nonNullable.group({
    id: [''],
    title: ['', Validators.required],
    description: ['']
  });

  private dialogService = inject(DialogService);

  constructor(@Inject(MAT_DIALOG_DATA) public data: TaskStore) { }

  ngOnInit(): void {
    if (this.isEdit) {
      const t = this.data!;
      this.form.patchValue({id: t.id, title: t.title, description: t.description ?? '' });
    }
  }

  get isEdit() { return !!this.data?.id; }

  async submit() {
    if (this.form.invalid) return;
    this.loading = true;

    const ref = this.dialogService.open(ConfirmDialogComponent, {
      title: 'Confirmación!',
      message: `¿Deseas ${this.isEdit ? 'actualizar' : 'crear' } la tarea?`,
    });
    const confirm = await firstValueFrom(ref.afterClosed());
    if (confirm) {
      const { title, description, id } = this.form.getRawValue();
      this.dialogRef.close({id: id, title: title.trim(), description: (description || '').trim() });
    } else {
      this.loading = false;
    }
  }
}
