import {Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Market } from '../../../models/market.model';

@Component({
  selector: 'app-buy-stocks',
  template: `<mat-form-field class="">
              <input matInput placeholder="quantity"
                     type="number"
                     [min]="0"
                     [(ngModel)]="quantity"/>
            </mat-form-field>
            <button mat-button color="primary" (click)="onClick()" [disabled]="!quantity">BUY</button>
  `,
  styleUrls: ['./buyStocks.component.css']
})
export class BuyStocksComponent implements OnInit {
  @Input() market: Market;
  quantity: number;
  @Output() onBuy= new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    const purchase = {
      marketId: this.market.id,
      price: Number(this.market.price),
      quantity: this.quantity
    };
    this.onBuy.emit(purchase);
    this.quantity = null;
  }

}
