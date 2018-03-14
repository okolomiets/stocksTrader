import { MarketsEffects } from './markets.effects';
import { UserEffects } from './user.effects';
import { StocksEffects } from './stocks.effects';

export const effects: any[] = [ MarketsEffects, UserEffects, StocksEffects ];

export * from './markets.effects';
export * from './user.effects';
export * from './stocks.effects';
