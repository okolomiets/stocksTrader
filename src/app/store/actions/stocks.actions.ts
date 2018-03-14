import { Action } from '@ngrx/store';

import { Stocks } from '../../models/stocks.model';

export const LOAD_STOCKS = '[Stocks] Load Stocks';
export const LOAD_STOCKS_FAIL = '[Stocks] Load Stocks Fail';
export const LOAD_STOCKS_SUCCESS = '[Stocks] Load Stocks Success';

export class LoadStocks implements Action {
  readonly type = LOAD_STOCKS;
}

export class LoadStocksFail implements Action {
  readonly type = LOAD_STOCKS_FAIL;
  constructor(public payload: any) {}
}

export class LoadStocksSuccess implements Action {
  readonly type = LOAD_STOCKS_SUCCESS;
  constructor(public payload: Stocks[]) {}
}

export type StocksActions =
  | LoadStocks
  | LoadStocksFail
  | LoadStocksSuccess;