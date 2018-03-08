import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Market } from '../../models/market.model';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.css']
})
export class MarketsComponent implements OnInit {
  displayedColumns = ['name', 'category', 'price', 'buy'];
  markets = new MarketsDataSource(this.appService);

  constructor(private appService: AppService) { }

  ngOnInit() {}

  buyStocks(purchase) {
    purchase.total = Number((purchase.price * purchase.quantity).toFixed(2));
    purchase.purchased = Date.now();

    if (this.appService.userBalance.balance - purchase.total > 0) {
      this.appService.saveStocks(purchase).subscribe(
        () => {
          const newUserBalance = {
            ...this.appService.userBalance,
            balance: Number((this.appService.userBalance.balance - purchase.total).toFixed(2))
          };
          this.appService.updateBalance(newUserBalance);
        });
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
