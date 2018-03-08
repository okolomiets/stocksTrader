import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { UserComponent } from './components/user/user.component';
import { MarketsComponent } from './components/markets/markets.component';
import { StocksComponent } from './components/stocks/stocks.component';

// routes
export const ROUTES: Routes = [
  {
    path: '',
    redirectTo: 'markets',
    pathMatch: 'full'
  },
  {
    path: 'markets',
    component: MarketsComponent,
    pathMatch: 'full'
  },
  {
    path: 'stocks',
    component: StocksComponent,
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
    HeaderComponent,
    UserComponent,
    MarketsComponent,
    StocksComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
