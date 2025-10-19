import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Injectable({ providedIn: 'root' })
export class DialogService {
  private dialog = inject(MatDialog);

  open<T, D = unknown>(component: T, data?: D, cfg?: MatDialogConfig<D>) {
    return this.dialog.open(component as any, {
      data,
      disableClose: true,
      autoFocus: false,
      panelClass: 'cros-dialog-panel',
      backdropClass: 'cros-dialog-backdrop',
      ...cfg
    });
  }
}
