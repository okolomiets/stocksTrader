import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { AppDialogsService } from '../../shared/dialogs.service';

import { User } from '../../models/user.model';
import { Stocks } from '../../models/stocks.model';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'lastUpdated', 'market', 'price', 'quantity', 'total', 'sell'];
  stocks$: Observable<Stocks[]>;
  overallPurchased$: Observable<number>;
  userBalanceSub: Subscription;
  stocksSub: Subscription;
  user: User;
  stocks: Stocks[];

  constructor(
    private appDialogService: AppDialogsService,
    private store: Store<fromStore.AppState>
  ) { }

  ngOnInit() {
    this.stocks$ = this.store.select(fromStore.getAllStocks);
    this.overallPurchased$ = this.store.select(fromStore.getOverallPurchased);
    this.userBalanceSub = this.store.select(fromStore.getUser).subscribe((user) => {
      this.user = user;
    });
    this.stocksSub = this.store.select(fromStore.getAllStocks).subscribe(stocks => {
      this.stocks = stocks;
    });
  }

  ngOnDestroy() {
    this.userBalanceSub.unsubscribe();
    this.stocksSub.unsubscribe();
  }

  sellStocks(sellStocks: Stocks) {
    const soldTotal = Number((Number(sellStocks.market.price) * sellStocks.quantity).toFixed(2));
    const existed = this.stocks.find(stocks => stocks.market.id === sellStocks.market.id);

    const newStocks: Stocks = {
      ...existed,
      quantity: existed.quantity - sellStocks.quantity,
      total: Number((existed.total - soldTotal).toFixed(2)),
      lastUpdated: new Date()
    };

    const updatedUser = {
      ...this.user,
      balance: Number((this.user.balance + soldTotal).toFixed(2))
    };

    if (newStocks.quantity < 0 || newStocks.quantity > existed.quantity) {
      this.appDialogService.openSnackBar('Invalid quantity value!', 'Dismiss');

    } else if (newStocks.quantity === 0) {
      this.store.dispatch(new fromStore.DeleteStocks(newStocks));
      this.store.dispatch(new fromStore.UpdateUserBalance(updatedUser));

    } else {
      this.store.dispatch(new fromStore.UpdateStocks(newStocks));
      this.store.dispatch(new fromStore.UpdateUserBalance(updatedUser));
    }

  }

}
