import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatInputModule,
  MatToolbarModule,
  MatTableModule,
  MatSnackBarModule,
  MatPaginatorModule
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
    MatPaginatorModule
  ],
  exports: [
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatToolbarModule,
    MatTableModule,
    MatSnackBarModule,
    MatPaginatorModule
  ]
})
export class MaterialModule {}
