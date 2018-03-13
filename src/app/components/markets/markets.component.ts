import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { Market } from '../../models/market.model';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.css']
})
export class MarketsComponent implements OnInit, OnDestroy {
  displayedColumns = ['id', 'name', 'category', 'price', 'buy'];
  markets: MatTableDataSource<Market>;
  maxQuantity = 1000000;
  buyStocksSub: Subscription;
  getMarketsSub: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private appService: AppService
  ) { }

  ngOnInit() {
    this.getMarketsSub = this.appService.getMarkets().subscribe(markets => {
      this.markets = new MatTableDataSource<Market>(markets);
      this.markets.paginator = this.paginator;
      this.markets.sort = this.sort;
    });
  }

  ngOnDestroy() {
    this.getMarketsSub.unsubscribe();

    if (this.buyStocksSub) {
      this.buyStocksSub.unsubscribe();
    }
  }

  buyStocks(purchase) {
    this.buyStocksSub = this.appService.buyStocks(purchase).subscribe(() => {});
  }

}

// export class MarketsDataSource extends MatTableDataSource<Market> {
//   constructor(private appService: AppService) {
//     super();
//   }
//   connect() {
//     return (<BehaviorSubject<Market[]>>this.appService.getMarkets());
//   }
//   disconnect() {}
// }
