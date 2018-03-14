import * as fromUser from '../actions/user.actions';
import { User } from '../../models/user.model';

export interface UserState {
  user: User;
  loaded: boolean;
  loading: boolean;
}

export const initialState: UserState = {
  user: null,
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromUser.UserActions
): UserState {
  switch (action.type) {
    case fromUser.LOAD_USER: {
      return {
        ...state,
        loading: true,
      };
    }

    case fromUser.LOAD_USER_SUCCESS: {
      const user = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        user,
      };
    }

    case fromUser.LOAD_USER_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false,
      };
    }

    case fromUser.UPDATE_USER_BALANCE: {
      const user = {
        ...state.user,
        balance: Number((state.user.balance + action.payload).toFixed(2))
      };
      return {
        ...state,
        loaded: true,
        loading: false,
        user
      };
    }

  }
  return state;
}

export const getUser = (state: UserState) => state.user;
export const getUserLoading = (state: UserState) => state.loading;
export const getUserLoaded = (state: UserState) => state.loaded;

