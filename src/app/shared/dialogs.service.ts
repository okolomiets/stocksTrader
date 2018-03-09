import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class AppDialogsService {

  constructor(public snackBar: MatSnackBar) {}

  showWarningSnackBar(message, action) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
