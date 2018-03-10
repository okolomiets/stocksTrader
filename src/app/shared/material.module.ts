import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule,
  MatTableModule,
  MatSnackBarModule,
  MatPaginatorModule,
  MatDialogModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatTableModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatDialogModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatTableModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatDialogModule
  ]
})
export class MaterialModule {}
