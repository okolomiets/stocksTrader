import { HeaderComponent } from './header/header.component';
import { BalanceComponent } from './balance/balance.component';
import { MarketsComponent } from './markets/markets.component';
import { StocksComponent } from './stocks/stocks.component';
import { StocksControlComponent } from './stocksControl/stocksControl.component';
import { ConfirmDialogComponent } from './confirmDialog/confirmDialog.component';

export const container = [
  HeaderComponent,
  BalanceComponent,
  MarketsComponent,
  StocksComponent,
  StocksControlComponent,
  ConfirmDialogComponent
];

export * from './header/header.component';
export * from './balance/balance.component';
export * from './markets/markets.component';
export * from'./stocks/stocks.component';
export * from './stocksControl/stocksControl.component';
export * from './confirmDialog/confirmDialog.component';
