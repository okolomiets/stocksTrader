import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { Market } from '../models/market.model';
import { Stocks } from '../models/stocks.model';
import { User } from '../models/user.model';

@Injectable()
export class CoreService {
  user: User;
  constructor(
    private http: HttpClient
  ) { }

  getBalance(): Observable<User> {
    return this.http
      .get<User>('/api/user').pipe(
        catchError((error: any) => Observable.throw(error))
      );
  }

  getMarkets(): Observable<Market[]> {
    return this.http
      .get<Market[]>('/api/markets').pipe(
        catchError((error: any) => Observable.throw(error))
      );
  }

  getStocks(): Observable<Stocks[]> {
    return this.http
      .get<Stocks[]>('/api/stocks').pipe(
        catchError((error: any) => Observable.throw(error))
      );
  }

  saveStocks(stocks: Stocks): Observable<Stocks> {
    return this.http
      .post<Stocks>('/api/stocks', stocks).pipe(
        catchError((error: any) => Observable.throw(error))
      );
  }

  updateStocks(stocks: Stocks): Observable<Stocks[]> {
    const url = `/api/stocks/${stocks.id}`;
    return this.http
      .put<Stocks>(url, stocks).pipe(
        catchError((error: any) => Observable.throw(error))
      );
  }

  deleteStocks(stocks: Stocks): Observable<Stocks[]> {
    const url = `/api/stocks/${stocks.id}`;
    return this.http
      .delete<Stocks>(url).pipe(
        catchError((error: any) => Observable.throw(error))
      );
  }

}
