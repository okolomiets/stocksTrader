import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Market } from '../../models/market.model';
import { AppService } from '../../app.service';
import { AppDialogsService } from '../../shared/dialogs.service';

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
    private appService: AppService,
    private appDialogService: AppDialogsService
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
      this.appDialogService.showWarningSnackBar('Invalid quantity value!', 'Dismiss');

    } else if (this.appService.userBalance.balance - purchase.total > 0) {

      this.getStocksEntitiesSub = this.appService.getStocksEntities().subscribe(stocksEntities => {
        const existedStocks = stocksEntities[purchase.market.id];

        if (existedStocks) {
          existedStocks.quantity += purchase.quantity;
          existedStocks.total += purchase.total;
          existedStocks.lastUpdated = purchase.lastUpdated;
          this.updateStocksSub = this.appService.updateStocks(existedStocks).subscribe(
            () => {
              this.appService.updateBalance(-purchase.total);
            });

        } else {
          this.saveStocksSub = this.appService.saveStocks(purchase).subscribe(
            () => {
              this.appService.updateBalance(-purchase.total);
            });
        }
      });

    } else {
      this.appDialogService.showWarningSnackBar('Not enough balance to buy!', 'Dismiss');
    }
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
