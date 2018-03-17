import * as fromStocks from '../actions/stocks.actions';
import { Stocks } from '../../models/stocks.model';

export interface StocksState {
  stocks: Stocks[];
  loaded: boolean;
  loading: boolean;
}

export const initialState: StocksState = {
  stocks: [],
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromStocks.StocksActions
): StocksState {
  switch (action.type) {
    case fromStocks.LOAD_STOCKS: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromStocks.LOAD_STOCKS_SUCCESS: {
      const stocks = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        stocks
      };
    }

    case fromStocks.LOAD_STOCKS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }
  }
  return state;
}

export const getStocks = (state: StocksState) => state.stocks;
export const getStocksLoading = (state: StocksState) => state.loading;
export const getStocksLoaded = (state: StocksState) => state.loaded;
export const getOverallPurchased = (state: StocksState) => {
  return state.stocks.reduce((purchased, stock: Stocks) => {
    purchased += stock.total;
    return purchased ;
  }, 0);
};

