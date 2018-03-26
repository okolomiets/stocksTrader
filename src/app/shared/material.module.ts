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
  MatSortModule,
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
    MatSortModule,
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
    MatSortModule,
    MatDialogModule
  ]
})
export class MaterialModule {}
