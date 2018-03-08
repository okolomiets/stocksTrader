import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../app.service';
import { Market } from '../../models/market.model';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.css']
})
export class MarketsComponent implements OnInit, AfterViewInit {
  markets: MatTableDataSource<Market>;
  displayedColumns: string[];
  @ViewChild(MatSort) sort: MatSort;
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.displayedColumns = ['name', 'category', 'price', 'buy'];
  }

  ngAfterViewInit() {
    this.appService.getMarkets().subscribe((markets: Market[]) => {
      this.markets = new MatTableDataSource(markets);
      this.markets.sort = this.sort;
    });
  }

  buyStocks(id, quantity) {
    console.log('buyStocks', id, quantity);
  }

}
