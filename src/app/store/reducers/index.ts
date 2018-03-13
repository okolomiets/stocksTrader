import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromMarkets from './markets.reducers';

export interface AppState {
  markets: fromMarkets.MarketsState;
}

export const reducers: ActionReducerMap<AppState> = {
  markets: fromMarkets.reducer
};

export const getAppState = createFeatureSelector<AppState>(
  'app'
);
