import { HeaderComponent } from './header/header.component';
import { BalanceComponent } from './balance/balance.component';
import { MarketsComponent } from './markets/markets.component';
import { StocksComponent } from './stocks/stocks.component';


export const container = [
  HeaderComponent,
  BalanceComponent,
  MarketsComponent,
  StocksComponent
];

export * from './header/header.component';
export * from './balance/balance.component';
export * from './markets/markets.component';
export * from './stocks/stocks.component';
