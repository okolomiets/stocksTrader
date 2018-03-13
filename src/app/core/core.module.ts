import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import * as fromComponents from '../components/components.index';
import { ConfirmDialogComponent } from '../shared/confirmDialog/confirmDialog.component';

// services
import { CoreService } from './core.service';

// shared
import { SharedModule } from '../shared/shared.module';


// routes
export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'markets',
    pathMatch: 'full'
  },
  {
    path: 'markets',
    component: fromComponents.MarketsComponent,
    pathMatch: 'full'
  },
  {
    path: 'stocks',
    component: fromComponents.StocksComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    ...fromComponents.container
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    SharedModule,
  ],
  providers: [
    CoreService
  ],
  exports: [
    ConfirmDialogComponent,
    fromComponents.HeaderComponent
  ]
})
export class CoreModule {}
