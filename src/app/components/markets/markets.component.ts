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

  buyStocks(id, quantity) {
    console.log('buyStocks', id, quantity);
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
