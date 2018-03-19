import { Action } from '@ngrx/store';

import { Stocks } from '../../models/stocks.model';

export const LOAD_STOCKS = '[Stocks] Load Stocks';
export const LOAD_STOCKS_FAIL = '[Stocks] Load Stocks Fail';
export const LOAD_STOCKS_SUCCESS = '[Stocks] Load Stocks Success';

export const UPDATE_STOCKS = '[Stocks] Update Stocks';
export const UPDATE_STOCKS_SUCCESS = '[Stocks] Update Stocks Success';

export const SAVE_STOCKS = '[Stocks] Save Stocks';
export const SAVE_STOCKS_SUCCESS = '[Stocks] Save Stocks Success';

export const DELETE_STOCKS = '[Stocks] Delete Stocks';
export const DELETE_STOCKS_SUCCESS = '[Stocks] Delete Stocks Success';

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

export class UpdateStocks implements Action {
  readonly type = UPDATE_STOCKS;
  constructor(public payload: Stocks ) {}
}

export class UpdateStocksSuccess implements Action {
  readonly type = UPDATE_STOCKS_SUCCESS;
  constructor(public payload: Stocks) {}
}

export class SaveStocks implements Action {
  readonly type = SAVE_STOCKS;
  constructor(public payload: Stocks) {}
}

export class SaveStocksSuccess implements Action {
  readonly type = SAVE_STOCKS_SUCCESS;
  constructor(public payload: Stocks) {}
}

export class DeleteStocks implements Action {
  readonly type = DELETE_STOCKS;
  constructor(public payload: Stocks) {}
}

export class DeleteStocksSuccess implements Action {
  readonly type = DELETE_STOCKS_SUCCESS;
  constructor(public payload: Stocks) {}
}

export type StocksActions =
  | LoadStocks
  | LoadStocksFail
  | LoadStocksSuccess
  | UpdateStocks
  | UpdateStocksSuccess
  | SaveStocks
  | SaveStocksSuccess
  | DeleteStocks
  | DeleteStocksSuccess;
