export interface Purchase {
  id?: number;
  purchased: string;
  marketId: number;
  market: string;
  price: number;
  quantity: number;
  total: number;
}
