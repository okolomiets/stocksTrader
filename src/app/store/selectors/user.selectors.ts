import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromUser from '../reducers/user.reducers';

export const getUserFeatureState = createSelector(
  fromFeature.getAppState,
  (state: fromFeature.AppState) => state.user
);

export const getUser = createSelector(
  getUserFeatureState,
  fromUser.getUser
);

export const getUserLoaded = createSelector(
  getUserFeatureState,
  fromUser.getUserLoaded
);
export const getUserLoading = createSelector(
  getUserFeatureState,
  fromUser.getUserLoading
);
