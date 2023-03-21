import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LoadingSpinnerComponent } from './loading-spinner.component';

@Injectable({
  providedIn: 'root',
})
export class LoadingSpinnerService {
  spinnerDialog!: MatDialogRef<LoadingSpinnerComponent>;
  private totalRequests = 0;

  constructor(private dialog: MatDialog) {}

  showSpinner() {
    if (++this.totalRequests === 1) {
      this.spinnerDialog = this.dialog.open(LoadingSpinnerComponent, {
        panelClass: 'transparent',
        disableClose: true,
      });
    }
  }

  closeSpinner() {
    if (
      (this.totalRequests == 0 || --this.totalRequests == 0) &&
      this.spinnerDialog
    )
      this.spinnerDialog.close();
  }
}
