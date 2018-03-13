import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects';
import { of } from 'rxjs/observable/of';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as marketsActions from '../actions/markets.actions';
import { CoreService } from '../../core/core.service';

@Injectable()
export class MarketsEffects {
  constructor(private actions$: Actions,
              private coreService: CoreService) {
  }

  @Effect()
  loadMarkets$ = this.actions$.ofType(marketsActions.LOAD_MARKETS).pipe(
    switchMap(() => {
      return this.coreService
        .getMarkets()
        .pipe(
          map(markets => new marketsActions.LoadMarketsSuccess(markets)),
          catchError(error => of(new marketsActions.LoadMarketsFail(error)))
        );
    })
  );
}
