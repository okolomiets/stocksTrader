import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromMarkets from './markets.reducers';
import * as fromUser from './user.reducers';

export interface AppState {
  markets: fromMarkets.MarketsState;
  user: fromUser.UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  user: fromUser.reducer,
  markets: fromMarkets.reducer
};

export const getAppState = createFeatureSelector<AppState>(
  'app'
);
