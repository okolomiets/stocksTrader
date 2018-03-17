import { Action } from '@ngrx/store';

import { Stocks } from '../../models/stocks.model';

export const LOAD_STOCKS = '[Stocks] Load Stocks';
export const LOAD_STOCKS_FAIL = '[Stocks] Load Stocks Fail';
export const LOAD_STOCKS_SUCCESS = '[Stocks] Load Stocks Success';

export const BUY_STOCKS = '[Stocks] Buy Stocks';
export const BUY_STOCKS_SUCCESS = '[Stocks] Buy Stocks Success';
export const BUY_STOCKS_FAIL = '[Stocks] Buy Stocks fail';

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

export class BuyStocks implements Action {
  readonly type = BUY_STOCKS;
  constructor(public payload: Stocks) {}
}

export class BuyStocksFail implements Action {
  readonly type = BUY_STOCKS_FAIL;
  constructor(public payload: any) {}
}

export class BuyStocksSuccess implements Action {
  readonly type = BUY_STOCKS_SUCCESS;
}

export type StocksActions =
  | LoadStocks
  | LoadStocksFail
  | LoadStocksSuccess
  | BuyStocks
  | BuyStocksFail
  | BuyStocksSuccess;
