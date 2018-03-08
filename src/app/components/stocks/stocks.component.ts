import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';

import { AppService } from '../../app.service';
import { Stocks } from '../../models/stocks.model';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  displayedColumns = ['id', 'purchased', 'market', 'price', 'quantity', 'total'];
  stocks = new StocksDataSource(this.appService);

  constructor(private appService: AppService) { }

  ngOnInit() {}

}

export class StocksDataSource extends DataSource<Stocks> {
  constructor(private appService: AppService) {
    super();
  }
  connect(): Observable<Stocks[]> {
    return this.appService.getStocks();
  }
  disconnect() {}
}
