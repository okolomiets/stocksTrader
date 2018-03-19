import {AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

import { Market } from '../../models/market.model';

import { CoreService } from '../../core/core.service';

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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private coreService: CoreService,
    private appDialogService: AppDialogsService,
    private store: Store<fromStore.AppState>,
    private changeDetector: ChangeDetectorRef
  ) { }

  ngOnInit() { }

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

    if (this.appDialogServiceSub) {
      this.appDialogServiceSub.unsubscribe();
    }
  }

  buyStocks(purchase) {
    purchase.total = Number((Number(purchase.market.price) * purchase.quantity).toFixed(2));
    purchase.lastUpdated = new Date();

    this.store.select(fromStore.getUser).subscribe((user) => {
      if (user.balance - purchase.total > user.balance) {
        this.appDialogService.openSnackBar('Invalid quantity value!', 'Dismiss');

      } else if (user.balance - purchase.total > 0) {

        const updatedUser = {
          ...user,
          balance: Number((user.balance - purchase.total).toFixed(2))
        };


        this.appDialogServiceSub = this.appDialogService.openModal(ConfirmDialogComponent, {
          title: 'Buy Stocks',
          message: `You're going to buy ${purchase.quantity} stock(s) of ${purchase.market.name}`,
          okButton: 'Buy',
          cancelButton: 'Cancel'
        }).subscribe((confirmed: boolean) => {
          if (confirmed) {
            this.store.select(fromStore.getStocksEntities).subscribe(entities => {
              const existed = entities[purchase.market.id];
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
            }).unsubscribe();
          }
        });
      } else {
        this.appDialogService.openSnackBar('Not enough balance to buy!', 'Dismiss');
      }
    }).unsubscribe();
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
