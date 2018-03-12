import { Injectable } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppDialogsService {

  constructor(
    public snackBar: MatSnackBar,
    public modal: MatDialog
  ) {}

  openSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  openModal(component, data): Observable<any> {
    const dialogRef = this.modal.open(component, {
      width: '500px',
      closeOnNavigation: false,
      disableClose: true,
      data
    });
    return dialogRef.afterClosed();
  }
}
