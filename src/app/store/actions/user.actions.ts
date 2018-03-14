import { Action } from '@ngrx/store';

import { User } from '../../models/user.model';

export const LOAD_USER = '[User] Load User';
export const LOAD_USER_FAIL = '[User] Load User Fail';
export const LOAD_USER_SUCCESS = '[User] Load User Success';
export const UPDATE_USER_BALANCE = '[User] Update User Balance';

export class LoadUser implements Action {
  readonly type = LOAD_USER;
}

export class LoadUserFail implements Action {
  readonly type = LOAD_USER_FAIL;
  constructor(public payload: any) {}
}

export class LoadUserSuccess implements Action {
  readonly type = LOAD_USER_SUCCESS;
  constructor(public payload: User) {}
}

export class UpdateUserBalance implements Action {
  readonly type = UPDATE_USER_BALANCE;
  constructor(public payload: number) {}
}

export type UserActions =
  | LoadUser
  | LoadUserFail
  | LoadUserSuccess
  | UpdateUserBalance;
