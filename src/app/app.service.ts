import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, map, filter, take, switchMap, catchError } from 'rxjs/operators';

import { Market } from './models/market.model';
import { Stocks } from './models/stocks.model';
import { User } from './models/user.model';
import { Subject } from '../../node_modules/rxjs/Subject';

@Injectable()
export class AppService {
  userBalance$ = new Subject();
  stocks$ = new Subject();
  userBalance: User;
  marketsEntities: {[key: number]: Market};
  stocksEntities: {[key: number]: Stocks};
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
        tap((markets: Market[]) => {
          this.marketsEntities = this.setMarketEntities(markets);
        }),
        catchError((error: any) => Observable.throw(error))
      );
  }

  getMarketEntities(): Observable<{[key: number]: Market}> {
    if (this.marketsEntities) {
      return of(this.marketsEntities);
    } else {
      return this.getMarkets().pipe(
        switchMap((markets: Market[]) => {
          this.marketsEntities = this.setMarketEntities(markets);
          return of(this.marketsEntities);
        })
      );
    }
  }

  setMarketEntities(markets: Market[]): {[key: number]: Market} {
    return markets.reduce((entities, market: Market) => {
      entities[market.id] = market;
      return entities;
    }, {});
  }

  getStocks(): Observable<Stocks[]> {
    return this.http
      .get<Stocks[]>('/api/stocks').pipe(
        tap((stocks: Stocks[]) => {
          this.stocksEntities = this.setStocksEntities(stocks);
        }),
        catchError((error: any) => Observable.throw(error))
      );
  }

  getStocksEntities(): Observable<{[key: number]: Stocks}> {
    if (this.stocksEntities) {
      return of(this.stocksEntities);
    } else {
      return this.getStocks().pipe(
        switchMap((stocks: Stocks[]) => {
          this.stocksEntities = this.setStocksEntities(stocks);
          return of(this.stocksEntities);
        })
      );
    }
  }

  setStocksEntities(stocks: Stocks[]): {[key: number]: Stocks} {
    return stocks.reduce((entities, stock: Stocks) => {
      entities[stock.market.id] = stock;
      return entities;
    }, {});
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
