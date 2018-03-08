import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import { Market } from './models/market.model';
import { Stocks } from './models/stocks.model';

@Injectable()
export class AppService {

  constructor(private http: HttpClient) { }

  getMarkets(): Observable<Market[]> {
    return this.http
      .get<Market[]>('/api/markets').pipe(
        catchError((error: any) => Observable.throw(error.json()))
      );
  }

  getStocks(): Observable<Stocks[]> {
    return this.http
      .get<Stocks[]>('/api/stocks').pipe(
        catchError((error: any) => Observable.throw(error.json()))
      );
  }

}
