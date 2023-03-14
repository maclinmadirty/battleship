export interface ITile {
  isSelected: boolean;
  isShip: boolean;
  coordinates: TileCoordinates;
}

export interface TileCoordinates {
  x: number;
  y: number;
}

export interface IShipLayout {
  ship: string,
  image: any,
  positions: IShipPosition[]
}

export interface IShipPosition {
  isHit: boolean;
  coordinates: TileCoordinates;
}