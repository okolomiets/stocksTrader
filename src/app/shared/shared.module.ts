import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// material
import { MaterialModule } from './material.module';

// services
import { AppDialogsService } from './dialogs.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [MaterialModule],
  providers: [
    AppDialogsService
  ]
})
export class SharedModule {}
