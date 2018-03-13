import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromMarkets from '../reducers/markets.reducers';

export const getFeatureState = createSelector(
  fromFeature.getAppState,
  (state: fromFeature.AppState) => state.markets
);

export const getAllMarkets = createSelector(
  getFeatureState,
  fromMarkets.getMarkets
);

export const getMarketsLoaded = createSelector(
  getFeatureState,
  fromMarkets.getMarketsLoaded
);
export const getMarketsLoading = createSelector(
  getFeatureState,
  fromMarkets.getMarketsLoading
);
