export class ShopGuestPos {
  shopId: number;
  time: string;
  deviceUID: string;
  positions: Array<Position>;
}

class Position {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  score: number;
}
