import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { of } from 'rxjs/observable/of';
import { tap, map, filter, take, switchMap, catchError } from 'rxjs/operators';

import { Market } from './models/market.model';
import { Stocks } from './models/stocks.model';
import { User } from './models/user.model';

import { AppDialogsService } from './shared/dialogs.service';

import { ConfirmDialogComponent } from './shared/confirmDialog/confirmDialog.component';

@Injectable()
export class AppService {
  userBalance$ = new Subject();
  stocks$ = new Subject();
  overallPurchased$ = new Subject();
  userBalance: User;
  marketsEntities: {[key: number]: Market};
  stocksEntities: {[key: number]: Stocks};
  constructor(
    private http: HttpClient,
    private appDialogService: AppDialogsService
  ) { }

  getBalance(): Observable<User> {
    return this.http
      .get<User>('/api/user').pipe(
        catchError((error: any) => Observable.throw(error))
      );
  }

  getOverallPurchased(stocks) {
    const overallPurchased = stocks.reduce((purchased, stock: Stocks) => {
      purchased += stock.total;
      return purchased ;
    }, 0);
    this.overallPurchased$.next(overallPurchased);
  }

  updateBalance(total): void {
    this.userBalance = {
      ...this.userBalance,
      balance: Number((this.userBalance.balance + total).toFixed(2))
    };
    this.userBalance$.next(this.userBalance);
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
    return this.getStocks().pipe(
      switchMap((stocks: Stocks[]) => {
        this.stocksEntities = this.setStocksEntities(stocks);
        return of(this.stocksEntities);
      })
    );
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

  buyStocks(purchase) {
    purchase.total = Number((Number(purchase.market.price) * purchase.quantity).toFixed(2));
    purchase.lastUpdated = new Date();

    if (this.userBalance.balance - purchase.total > this.userBalance.balance) {
      this.appDialogService.openSnackBar('Invalid quantity value!', 'Dismiss');
      return of({});

    } else if (this.userBalance.balance - purchase.total > 0) {

      return this.appDialogService.openModal(ConfirmDialogComponent, {
        title: 'Buy Stocks',
        message: `You're going to buy ${purchase.quantity} stock(s) of ${purchase.market.name}`,
        okButton: 'Buy',
        cancelButton: 'Cancel'
      }).pipe(
        switchMap((confirmed): any => {
          if (confirmed) {

            return this.getStocksEntities().pipe(
              map(stocksEntities => stocksEntities[purchase.market.id]),
              switchMap((existedStocks): any => {
                if (existedStocks) {

                  existedStocks.quantity += purchase.quantity;
                  existedStocks.total += purchase.total;
                  existedStocks.lastUpdated = purchase.lastUpdated;

                  return this.updateStocks(existedStocks).pipe(
                    tap(() => {
                      this.updateBalance(-purchase.total);
                    })
                  );

                } else {
                  return this.saveStocks(purchase).pipe(
                    tap(() => {
                      this.updateBalance(-purchase.total);
                    })
                  );
                }
              }),
              catchError((error: any) => Observable.throw(error))
            );
          } else {
            return of({});
          }
        })
      );
    } else {
      this.appDialogService.openSnackBar('Not enough balance to buy!', 'Dismiss');
      return of({});
    }
  }

}
