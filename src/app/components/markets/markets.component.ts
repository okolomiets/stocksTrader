import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

import { Market } from '../../models/market.model';
import { CoreService } from '../../core/core.service';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.css']
})
export class MarketsComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns = ['id', 'name', 'category', 'price', 'buy'];
  markets: MatTableDataSource<Market>;
  maxQuantity = 1000000;
  buyStocksSub: Subscription;
  getMarketsSub: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private coreService: CoreService,
    private store: Store<fromStore.AppState>,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.getMarketsSub = this.store.select(fromStore.getAllMarkets).subscribe(markets => {
      this.markets = new MatTableDataSource<Market>(markets);
      this.markets.paginator = this.paginator;
      this.markets.sort = this.sort;
    });
    // ::ExpressionChangedAfterItHasBeenCheckedError::
    // https://github.com/angular/angular/issues/17572#issuecomment-364175055
    this.changeDetector.detectChanges();
  }

  ngOnDestroy() {
    this.getMarketsSub.unsubscribe();

    if (this.buyStocksSub) {
      this.buyStocksSub.unsubscribe();
    }
  }

  buyStocks(purchase) {
    this.buyStocksSub = this.coreService.buyStocks(purchase).subscribe(() => {});
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
