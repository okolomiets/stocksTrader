import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { MatSnackBar } from '@angular/material';

import { AppService } from '../../app.service';
import { Market } from '../../models/market.model';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.css']
})
export class MarketsComponent implements OnInit, OnDestroy {
  displayedColumns = ['name', 'category', 'price', 'buy'];
  markets = new MarketsDataSource(this.appService);
  maxQauntity = 1000000;
  getStocksEntitiesSub: Subscription;
  updateStocksSub: Subscription;
  saveStocksSub: Subscription;

  constructor(
    public snackBar: MatSnackBar,
    private appService: AppService
  ) { }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.getStocksEntitiesSub) {
      this.getStocksEntitiesSub.unsubscribe();
    }
    if (this.updateStocksSub) {
      this.updateStocksSub.unsubscribe();
    }
    if (this.saveStocksSub) {
      this.saveStocksSub.unsubscribe();
    }
  }

  buyStocks(purchase) {
    purchase.total = Number((Number(purchase.market.price) * purchase.quantity).toFixed(2));
    purchase.lastUpdated = new Date();

    if (this.appService.userBalance.balance - purchase.total > this.appService.userBalance.balance) {
      this.showWarning('Invalid quantity value!');

    } else if (this.appService.userBalance.balance - purchase.total > 0) {

      this.getStocksEntitiesSub = this.appService.getStocksEntities().subscribe(stocksEntities => {
        const existedStocks = stocksEntities[purchase.market.id];
        if (existedStocks) {
          existedStocks.quantity += purchase.quantity;
          existedStocks.total += existedStocks.total;
          existedStocks.lastUpdated = purchase.lastUpdated;
          this.updateStocksSub = this.appService.updateStocks(existedStocks).subscribe(
            () => {
              this.updateBalance(purchase);
            });
        } else {
          this.saveStocksSub = this.appService.saveStocks(purchase).subscribe(
            () => {
              this.updateBalance(purchase);
            });
        }
      });

    } else {
      this.showWarning('Not enough balance to buy!');
    }
  }

  updateBalance(purchase) {
    const newUserBalance = {
      ...this.appService.userBalance,
      balance: Number((this.appService.userBalance.balance - purchase.total).toFixed(2))
    };
    this.appService.updateBalance(newUserBalance);
  }

  showWarning(message) {
    const action = 'Dismiss';
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}

export class MarketsDataSource extends DataSource<Market> {
  constructor(private appService: AppService) {
    super();
  }
  connect(): Observable<Market[]> {
    return this.appService.getMarkets();
  }
  disconnect() {}
}
