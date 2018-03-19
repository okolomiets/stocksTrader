import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { CoreService } from '../../core/core.service';
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
export class StocksComponent implements OnInit {
  displayedColumns = ['id', 'lastUpdated', 'market', 'price', 'quantity', 'total', 'sell'];
  stocks$: Observable<Stocks[]>;
  overallPurchased$: Observable<number>;
  userBalanceSub: Subscription;
  user: User;

  constructor(
    private coreService: CoreService,
    private appDialogService: AppDialogsService,
    private store: Store<fromStore.AppState>
  ) { }

  ngOnInit() {
    this.stocks$ = this.store.select(fromStore.getAllStocks);
    this.overallPurchased$ = this.store.select(fromStore.getOverallPurchased);
    this.userBalanceSub = this.store.select(fromStore.getUser).subscribe((user) => {
      this.user = user;
    });
  }

  sellStocks(sellStocks: Stocks) {
    const soldTotal = Number((Number(sellStocks.market.price) * sellStocks.quantity).toFixed(2));

    this.store.select(fromStore.getStocksEntities).subscribe(stocksEntities => {
      const oldStocks = stocksEntities[sellStocks.market.id];

      const newStocks: Stocks = {
        ...oldStocks,
        quantity: oldStocks.quantity - sellStocks.quantity,
        total: Number((oldStocks.total - soldTotal).toFixed(2)),
        lastUpdated: new Date()
      };

      const updatedUser = {
        ...this.user,
        balance: Number((this.user.balance + soldTotal).toFixed(2))
      };

      if (newStocks.quantity < 0 || newStocks.quantity > oldStocks.quantity) {
        this.appDialogService.openSnackBar('Invalid quantity value!', 'Dismiss');

      } else if (newStocks.quantity === 0) {
        this.store.dispatch(new fromStore.DeleteStocks(newStocks));
        this.store.dispatch(new fromStore.UpdateUserBalance(updatedUser));

      } else {
        this.store.dispatch(new fromStore.UpdateStocks(newStocks));
        this.store.dispatch(new fromStore.UpdateUserBalance(updatedUser));
      }
    }).unsubscribe();

  }

}
