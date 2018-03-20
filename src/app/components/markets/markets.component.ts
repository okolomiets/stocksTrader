import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

import { Market } from '../../models/market.model';
import { User } from '../../models/user.model';
import { Stocks } from '../../models/stocks.model';

import { AppDialogsService } from '../../shared/dialogs.service';
import { ConfirmDialogComponent } from '../../shared/confirmDialog/confirmDialog.component';


@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.css']
})
export class MarketsComponent implements OnInit, OnDestroy, AfterViewInit {
  displayedColumns = ['id', 'name', 'category', 'price', 'buy'];
  markets: MatTableDataSource<Market>;
  maxQuantity = 1000000;
  appDialogServiceSub: Subscription;
  getMarketsSub: Subscription;
  userBalanceSub: Subscription;
  stocksSub: Subscription;
  user: User;
  stocks: Stocks[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private appDialogService: AppDialogsService,
    private store: Store<fromStore.AppState>,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.userBalanceSub = this.store.select(fromStore.getUser).subscribe((user) => {
      this.user = user;
    });
    this.stocksSub = this.store.select(fromStore.getAllStocks).subscribe(stocks => {
      this.stocks = stocks;
    });
  }

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
    this.userBalanceSub.unsubscribe();
    this.stocksSub.unsubscribe();

    if (this.appDialogServiceSub) {
      this.appDialogServiceSub.unsubscribe();
    }
  }

  buyStocks(purchase) {
    purchase.total = Number((Number(purchase.market.price) * purchase.quantity).toFixed(2));
    purchase.lastUpdated = new Date();

    if (this.user.balance - purchase.total > this.user.balance) {
      this.appDialogService.openSnackBar('Invalid quantity value!', 'Dismiss');

    } else if (this.user.balance - purchase.total > 0) {

      const updatedUser = {
        ...this.user,
        balance: Number((this.user.balance - purchase.total).toFixed(2))
      };

      this.appDialogServiceSub = this.appDialogService.openModal(ConfirmDialogComponent, {
        title: 'Buy Stocks',
        message: `You're going to buy ${purchase.quantity} stock(s) of ${purchase.market.name}`,
        okButton: 'Buy',
        cancelButton: 'Cancel'
      }).subscribe((confirmed: boolean) => {
        if (confirmed) {
          const existed = this.stocks.find(stocks => stocks.market.id === purchase.market.id);
          if (existed) {

            existed.quantity += purchase.quantity;
            existed.total += purchase.total;
            existed.lastUpdated = purchase.lastUpdated;
            this.store.dispatch(new fromStore.UpdateStocks(existed));
            this.store.dispatch(new fromStore.UpdateUserBalance(updatedUser));
          } else {
            this.store.dispatch(new fromStore.SaveStocks(purchase));
            this.store.dispatch(new fromStore.UpdateUserBalance(updatedUser));
          }
        }
      });
    } else {
      this.appDialogService.openSnackBar('Not enough balance to buy!', 'Dismiss');
    }
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
