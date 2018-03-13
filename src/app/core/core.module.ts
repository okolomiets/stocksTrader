import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// store
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reducers, effects } from '../store/index';

// components
import * as fromComponents from '../components/components.index';
import { ConfirmDialogComponent } from '../shared/confirmDialog/confirmDialog.component';

// services
import { CoreService } from './core.service';

// shared
import { SharedModule } from '../shared/shared.module';

// guards
import { MarketsGuard } from './core.guards';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'markets',
    pathMatch: 'full'
  },
  {
    path: 'markets',
    canActivate: [ MarketsGuard ],
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
    StoreModule.forFeature('app', reducers),
    EffectsModule.forFeature(effects),
  ],
  providers: [
    CoreService,
    MarketsGuard
  ],
  exports: [
    ConfirmDialogComponent,
    fromComponents.HeaderComponent
  ]
})
export class CoreModule {}
