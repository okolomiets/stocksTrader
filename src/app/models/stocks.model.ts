import { Market } from './market.model';

export interface Stocks {
  id?: number;
  lastUpdated?: Date;
  market: Market;
  quantity: number;
  total: number;
}
