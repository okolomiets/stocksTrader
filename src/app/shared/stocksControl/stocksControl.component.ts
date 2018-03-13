import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Market } from '../../models/market.model';

@Component({
  selector: 'app-stocks-control',
  template: `<mat-form-field class="">
              <input matInput placeholder="quantity"
                     type="number"
                     [min]="minQuantity"
                     [max]="maxQuantity"
                     [(ngModel)]="quantity"/>
            </mat-form-field>
            <button mat-button color="primary" (click)="onClick()" [disabled]="!quantity">{{btnLabel}}</button>
  `,
  styleUrls: ['./stocksControl.component.css']
})
export class StocksControlComponent implements OnInit {
  @Input() market: Market;
  @Input() btnLabel: string;
  @Input() minQuantity: number;
  @Input() maxQuantity: number;
  quantity: number;
  @Output() onSubmit= new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  onClick() {
    const stocks = {
      market: this.market,
      quantity: this.quantity
    };
    this.onSubmit.emit(stocks);
    this.quantity = null;
  }

}
