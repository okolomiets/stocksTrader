import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromStocks from '../reducers/stocks.reducers';

export const getStocksFeatureState = createSelector(
  fromFeature.getAppState,
  (state: fromFeature.AppState) => state.stocks
);

export const getAllStocks = createSelector(
  getStocksFeatureState,
  fromStocks.getStocks
);
export const getOverallPurchased = createSelector(
  getStocksFeatureState,
  fromStocks.getOverallPurchased
);
export const getStocksEntities = createSelector(
  getStocksFeatureState,
  fromStocks.getStocksEntities
);
export const getStocksLoaded = createSelector(
  getStocksFeatureState,
  fromStocks.getStocksLoaded
);
export const getStocksLoading = createSelector(
  getStocksFeatureState,
  fromStocks.getStocksLoading
);
