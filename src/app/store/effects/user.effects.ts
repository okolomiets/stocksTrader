import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as usersActions from '../actions/user.actions';
import { CoreService } from '../../core/core.service';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions,
              private coreService: CoreService) {
  }

  @Effect()
  loadUser$ = this.actions$.ofType(usersActions.LOAD_USER).pipe(
    switchMap(() => {
      return this.coreService
        .getBalance()
        .pipe(
          map(user => new usersActions.LoadUserSuccess(user)),
          catchError(error => of(new usersActions.LoadUserFail(error)))
        );
    })
  );

  @Effect()
  updateUser$ = this.actions$.ofType(usersActions.UPDATE_USER_BALANCE).pipe(
    map((action: usersActions.UpdateUserBalance) => action.payload),
    switchMap((user) => {
      return this.coreService
        .updateBalance(user)
        .pipe(
          map(updated => new usersActions.UpdateUserBalanceSuccess(updated)),
          catchError(error => of(new usersActions.LoadUserFail(error)))
        );
    })
  );

}
