import * as fromMarkets from '../actions/markets.actions';
import { Market } from '../../models/market.model';

export interface MarketsState {
  markets: Market[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: MarketsState = {
  markets: [],
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromMarkets.MarketsActions
): MarketsState {
  switch (action.type) {
    case fromMarkets.LOAD_MARKETS: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromMarkets.LOAD_MARKETS_SUCCESS: {
      const markets = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        markets,
      };
    }

    case fromMarkets.LOAD_MARKETS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }
  }
  return state;
}

export const getMarkets = (state: MarketsState) => state.markets;
export const getMarketsLoading = (state: MarketsState) => state.loading;
export const getMarketsLoaded = (state: MarketsState) => state.loaded;

