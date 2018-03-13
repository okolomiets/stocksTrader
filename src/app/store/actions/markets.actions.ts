import { Action } from '@ngrx/store';

import { Market } from '../../models/market.model';

export const LOAD_MARKETS = '[Markets] Load Markets';
export const LOAD_MARKETS_FAIL = '[Markets] Load Markets Fail';
export const LOAD_MARKETS_SUCCESS = '[Markets] Load Markets Success';

export class LoadMarkets implements Action {
  readonly type = LOAD_MARKETS;
}

export class LoadMarketsFail implements Action {
  readonly type = LOAD_MARKETS_FAIL;
  constructor(public payload: any) {}
}

export class LoadMarketsSuccess implements Action {
  readonly type = LOAD_MARKETS_SUCCESS;
  constructor(public payload: Market[]) {}
}

export type MarketsActions =
  | LoadMarkets
  | LoadMarketsFail
  | LoadMarketsSuccess;
