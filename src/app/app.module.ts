import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';

// components
import * as fromComponents from './components/components.index';

import { AppService } from './app.service';

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
    redirectTo: 'markets',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    fromComponents.container
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    SharedModule
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
