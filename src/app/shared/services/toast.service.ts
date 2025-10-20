import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ToastOptions } from '@shared/model/toast.model';
import { ToastType } from '@shared/types/toast-type';


@Injectable({ providedIn: 'root' })
export class ToastService {
  private snack = inject(MatSnackBar);

  private open(message: string, type: ToastType, opts: ToastOptions = {}) {
    const config: MatSnackBarConfig = {
      duration: opts.duration ?? 3000,
      horizontalPosition: opts.horizontalPosition ?? 'right',
      verticalPosition: opts.verticalPosition ?? 'top',
      panelClass: ['cros-toast', `cros-toast--${type}`],
    };
    return this.snack.open(message, opts.action, config);
  }

  success(message: string, opts?: ToastOptions) {
    return this.open(message, 'success', opts);
  }
  error(message: string, opts?: ToastOptions) {
    return this.open(message, 'error', opts);
  }
  info(message: string, opts?: ToastOptions) {
    return this.open(message, 'info', opts);
  }
  warning(message: string, opts?: ToastOptions) {
    return this.open(message, 'warning', opts);
  }
}
