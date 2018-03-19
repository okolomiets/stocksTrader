import * as fromStocks from '../actions/stocks.actions';
import { Stocks } from '../../models/stocks.model';

export interface StocksState {
  stocks: Stocks[];
  loaded: boolean;
  loading: boolean;
  entities: {[key: number]: Stocks};
  overallPurchased: number;
}

export const initialState: StocksState = {
  stocks: [],
  loaded: false,
  loading: false,
  entities: {},
  overallPurchased: 0
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
      const entities = stocks.reduce((obj, stock: Stocks) => {
        obj[stock.market.id] = stock;
        return obj;
      }, {});
      const overallPurchased = stocks.reduce((purchased, stock: Stocks) => {
        purchased += stock.total;
        return purchased ;
      }, 0);
      return {
        ...state,
        loading: false,
        loaded: true,
        stocks,
        entities,
        overallPurchased
      };
    }

    case fromStocks.LOAD_STOCKS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }

    case fromStocks.UPDATE_STOCKS_SUCCESS: {
      const updatedStocks = action.payload;
      const entities = {...state.entities};
      entities[updatedStocks.id] = updatedStocks;
      const stocks = Object.keys(entities).map(id => entities[parseInt(id, 10)]);
      const overallPurchased = stocks.reduce((purchased, stock: Stocks) => {
        purchased += stock.total;
        return purchased ;
      }, 0);
      return {
        ...state,
        stocks,
        entities,
        overallPurchased
      };
    }

    case fromStocks.SAVE_STOCKS_SUCCESS: {
      const newStocks = action.payload;
      const stocks = [...state.stocks, newStocks];
      const entities = stocks.reduce((obj, stock: Stocks) => {
        obj[stock.market.id] = stock;
        return obj;
      }, {});
      const overallPurchased = stocks.reduce((purchased, stock: Stocks) => {
        purchased += stock.total;
        return purchased ;
      }, 0);
      return {
        ...state,
        stocks,
        entities,
        overallPurchased
      };
    }

    case fromStocks.DELETE_STOCKS_SUCCESS: {
      const deletedStocks = action.payload;
      const entities = {...state.entities};
      delete entities[deletedStocks.id];
      const stocks = Object.keys(entities).map(id => entities[parseInt(id, 10)]);
      const overallPurchased = stocks.reduce((purchased, stock: Stocks) => {
        purchased += stock.total;
        return purchased ;
      }, 0);
      return {
        ...state,
        stocks,
        entities,
        overallPurchased
      };
    }
  }
  return state;
}

export const getStocks = (state: StocksState) => state.stocks;
export const getStocksLoading = (state: StocksState) => state.loading;
export const getStocksLoaded = (state: StocksState) => state.loaded;
export const getStocksEntities = (state: StocksState) => state.entities;
export const getOverallPurchased = (state: StocksState) => state.overallPurchased;

