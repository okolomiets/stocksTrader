import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import { CoreService } from '../../core/core.service';
import { AppDialogsService } from '../../shared/dialogs.service';
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
  updateStocksSub: Subscription;
  deleteStocksSub: Subscription;
  getStocksEntitiesSub: Subscription;

  constructor(
    private coreService: CoreService,
    private appDialogService: AppDialogsService,
    private store: Store<fromStore.AppState>
  ) { }

  ngOnInit() {
    this.stocks$ = this.store.select(fromStore.getAllStocks);
    this.overallPurchased$ = this.store.select(fromStore.getOverallPurchased);
    this.getStocks();
  }

  getStocks() {
    this.store.dispatch(new fromStore.LoadStocks());
  }

  ngOnDestroy() {

    if (this.getStocksEntitiesSub) {
      this.getStocksEntitiesSub.unsubscribe();
    }
    if (this.updateStocksSub) {
      this.updateStocksSub.unsubscribe();
    }
    if (this.deleteStocksSub) {
      this.deleteStocksSub.unsubscribe();
    }
  }

  sellStocks(sellStocks: Stocks) {
    const soldTotal = Number((Number(sellStocks.market.price) * sellStocks.quantity).toFixed(2));

    this.getStocksEntitiesSub = this.coreService.getStocksEntities().subscribe(stocksEntities => {
      const oldStocks = stocksEntities[sellStocks.market.id];

      const newStocks: Stocks = {
        ...oldStocks,
        quantity: oldStocks.quantity - sellStocks.quantity,
        total: Number((oldStocks.total - soldTotal).toFixed(2)),
        lastUpdated: new Date()
      };

      if (newStocks.quantity < 0 || newStocks.quantity > oldStocks.quantity) {
        this.appDialogService.openSnackBar('Invalid quantity value!', 'Dismiss');

      } else if (newStocks.quantity === 0) {
        this.deleteStocksSub = this.coreService.deleteStocks(newStocks).subscribe(() => {
          this.getStocks();
          this.coreService.updateBalance(soldTotal);
        });

      } else {
        this.updateStocksSub = this.coreService.updateStocks(newStocks).subscribe(() => {
          this.getStocks();
          this.coreService.updateBalance(soldTotal);
        });
      }
    });
  }

}
