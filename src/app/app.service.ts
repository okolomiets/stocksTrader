import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import { Market } from './models/market.model';
import { Stocks } from './models/stocks.model';
import { Purchase } from './models/purchase.model';
import { User } from './models/user.model';
import {Subject} from '../../node_modules/rxjs/Subject';

@Injectable()
export class AppService {
  userBalance$ = new Subject();
  userBalance: User;
  constructor(private http: HttpClient) { }

  getBalance(): Observable<User> {
    return this.http
      .get<User>('/api/user').pipe(
        catchError((error: any) => Observable.throw(error))
      );
  }

  updateBalance(newUser): void {
    this.userBalance = newUser;
    this.userBalance$.next(newUser);
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

  saveStocks(purchase: Purchase): Observable<Purchase> {
    return this.http
      .post<Purchase>('/api/stocks', purchase).pipe(
        catchError((error: any) => Observable.throw(error))
      );
  }

}
