import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromMarkets from './markets.reducers';
import * as fromUser from './user.reducers';
import * as fromStocks from './stocks.reducers';

export interface AppState {
  markets: fromMarkets.MarketsState;
  user: fromUser.UserState;
  stocks: fromStocks.StocksState;
}

export const reducers: ActionReducerMap<AppState> = {
  user: fromUser.reducer,
  markets: fromMarkets.reducer,
  stocks: fromStocks.reducer
};

export const getAppState = createFeatureSelector<AppState>(
  'app'
);
