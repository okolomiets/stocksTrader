import { Routes } from '@angular/router';
import * as fromComponents from './components/components.index';

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
    redirectTo: 'markets',
    pathMatch: 'full'
  }
];
