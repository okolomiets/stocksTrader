import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Market } from '../../models/market.model';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.css']
})
export class MarketsComponent implements OnInit, OnDestroy {
  displayedColumns = ['name', 'category', 'price', 'buy'];
  markets = new MarketsDataSource(this.appService);
  maxQauntity = 1000000;
  buyStocksSub: Subscription;

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {}

  ngOnDestroy() {
    if (this.buyStocksSub) {
      this.buyStocksSub.unsubscribe();
    }
  }

  buyStocks(purchase) {
    this.buyStocksSub = this.appService.buyStocks(purchase).subscribe(() => {});
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
