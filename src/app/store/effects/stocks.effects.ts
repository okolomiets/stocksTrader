import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as stocksActions from '../actions/stocks.actions';
import * as userActions from '../actions/user.actions';
import { CoreService } from '../../core/core.service';

@Injectable()
export class StocksEffects {
  constructor(private actions$: Actions,
              private coreService: CoreService) {
  }

  @Effect()
  loadStocks$ = this.actions$.ofType(stocksActions.LOAD_STOCKS).pipe(
    switchMap(() => {
      return this.coreService
        .getStocks()
        .pipe(
          map(stocks => new stocksActions.LoadStocksSuccess(stocks)),
          catchError(error => of(new stocksActions.LoadStocksFail(error)))
        );
    })
  );

  @Effect()
  updateStocks$ = this.actions$.ofType(stocksActions.UPDATE_STOCKS).pipe(
    map((action: stocksActions.UpdateStocks) => action.payload),
    switchMap((existed) => {
      return this.coreService
        .updateStocks(existed)
        .pipe(
          map(() => new stocksActions.UpdateStocksSuccess(existed)),
          catchError(error => of(new stocksActions.LoadStocksFail(error)))
        );
    })
  );

  @Effect()
  saveStocks$ = this.actions$.ofType(stocksActions.SAVE_STOCKS).pipe(
    map((action: stocksActions.SaveStocks) => action.payload),
    switchMap((purchase) => {
      return this.coreService
        .saveStocks(purchase)
        .pipe(
          map((saved) => new stocksActions.SaveStocksSuccess(saved)),
          catchError(error => of(new stocksActions.LoadStocksFail(error)))
        );
    })
  );

  @Effect()
  deleteStocks$ = this.actions$.ofType(stocksActions.DELETE_STOCKS).pipe(
    map((action: stocksActions.DeleteStocks) => action.payload),
    switchMap((stocks) => {
      return this.coreService
        .deleteStocks(stocks)
        .pipe(
          map(() => new stocksActions.DeleteStocksSuccess(stocks)),
          catchError(error => of(new stocksActions.LoadStocksFail(error)))
        );
    })
  );

}
