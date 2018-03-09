import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { MatSnackBar } from '@angular/material';

import { AppService } from '../../app.service';
import { Stocks } from '../../models/stocks.model';


@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'lastUpdated', 'market', 'price', 'quantity', 'total', 'sell'];
  stocks$: Subject<{}>;
  overallPurchased$: Subject<{}>;
  stocks: Stocks[];
  getStocksSub: Subscription;
  updateStocksSub: Subscription;
  deleteStocksSub: Subscription;
  getStocksEntitiesSub: Subscription;

  constructor(
    public snackBar: MatSnackBar,
    private appService: AppService
  ) { }

  ngOnInit() {
    this.stocks$ = this.appService.stocks$;
    this.overallPurchased$ = this.appService.overallPurchased$;
    this.getStocks();
  }

  getStocks() {
    this.getStocksSub = this.appService.getStocks().subscribe(stocks => {
      this.stocks = stocks;
      this.appService.stocks$.next(stocks);
      this.appService.getOverallPurchased(stocks);
    });
  }

  ngOnDestroy() {
    this.getStocksSub.unsubscribe();

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

    this.getStocksEntitiesSub = this.appService.getStocksEntities().subscribe(stocksEntities => {
      const oldStocks = stocksEntities[sellStocks.market.id];

      const newStocks: Stocks = {
        ...oldStocks,
        quantity: oldStocks.quantity - sellStocks.quantity,
        total: Number((oldStocks.total - soldTotal).toFixed(2)),
        lastUpdated: new Date()
      };

      if (newStocks.quantity < 0 || newStocks.quantity > oldStocks.quantity) {
        const message = 'Invalid quantity value!';
        const action = 'Dismiss';
        this.snackBar.open(message, action, {
          duration: 2000,
        });
      } else if (newStocks.quantity === 0) {
        this.deleteStocksSub = this.appService.deleteStocks(newStocks).subscribe(() => {
          this.getStocks();
          this.updateBalance(soldTotal);
        });
      } else {
        this.updateStocksSub = this.appService.updateStocks(newStocks).subscribe(() => {
          this.getStocks();
          this.updateBalance(soldTotal);
        });
      }
    });
  }

  updateBalance(soldTotal) {
    const newUserBalance = {
      ...this.appService.userBalance,
      balance: Number((this.appService.userBalance.balance + soldTotal).toFixed(2))
    };
    this.appService.updateBalance(newUserBalance);
  }

}
