import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// material
import { MaterialModule } from './material.module';

// services
import { AppDialogsService } from './dialogs.service';

// components
import { ConfirmDialogComponent } from './confirmDialog/confirmDialog.component';
import { StocksControlComponent } from './stocksControl/stocksControl.component';

@NgModule({
  declarations: [
    ConfirmDialogComponent,
    StocksControlComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    ConfirmDialogComponent,
    StocksControlComponent
  ],
  providers: [
    AppDialogsService
  ]
})
export class SharedModule {}
