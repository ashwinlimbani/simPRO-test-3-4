import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoadingSpinnerComponent } from './loading-spinner.component';

@Injectable({
  providedIn: 'root',
})
export class LoadingSpinnerService {
  spinnerDialog!: MatDialogRef<LoadingSpinnerComponent>;
  constructor(private dialog: MatDialog) {}

  showSpinner() {
    this.closeSpinner();
    this.spinnerDialog = this.dialog.open(LoadingSpinnerComponent, {
      panelClass: 'transparent',
      disableClose: true,
    });
  }

  closeSpinner() {
    if (this.spinnerDialog) this.spinnerDialog.close();
  }
}
