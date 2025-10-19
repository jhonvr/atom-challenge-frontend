import { Component, inject, signal } from '@angular/core';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { SessionService } from '@shared/services/session.service';
import { ConfirmDialogComponent } from '@shared/components/confirm/confirm.component';
import { DialogService } from '@shared/services/dialog.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  providers: [
    AuthService
  ]
})
export class AuthComponent {

  private authService = inject(AuthService);
  private sessionService = inject(SessionService);
  private router = inject(Router);
  private dialogService = inject(DialogService);

  loading = signal(false);
  form = inject(FormBuilder).nonNullable.group({ email: ['', [Validators.required, Validators.email]] });

  async submit() {
    if (this.form.invalid) return;
    this.loading.set(true);
    const email = this.form.value.email!.toLowerCase().trim();
    this.form.disable();

    try {
      const res = await firstValueFrom(this.authService.findUser(email));

      if (res?.exists && res.user) {
        this.sessionService.setUser(res.user.id);
        await this.router.navigateByUrl('/tasks');
        return;
      }

      const ref = this.dialogService.open(ConfirmDialogComponent, {
        title: 'Crear nuevo usuario',
        message: `Correo no existe. ¿Deseas crear una nueva cuenta con el correo:<br><strong>${email}</strong>?`,
        okText: 'Sí, crear usuario',
        cancelText: 'No'
      });

      const confirm = await firstValueFrom(ref.afterClosed());

      if (confirm) {
        const created = await firstValueFrom(this.authService.createUser(email));
        this.sessionService.setUser(created.id);
        this.router.navigateByUrl('/tasks');
      }
    } finally {
      this.loading.set(false);
      this.form.enable();
    }
  }

}
