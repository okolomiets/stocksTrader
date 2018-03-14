import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromMarkets from '../reducers/markets.reducers';

export const getMarketsFeatureState = createSelector(
  fromFeature.getAppState,
  (state: fromFeature.AppState) => state.markets
);

export const getAllMarkets = createSelector(
  getMarketsFeatureState,
  fromMarkets.getMarkets
);

export const getMarketsLoaded = createSelector(
  getMarketsFeatureState,
  fromMarkets.getMarketsLoaded
);
export const getMarketsLoading = createSelector(
  getMarketsFeatureState,
  fromMarkets.getMarketsLoading
);
