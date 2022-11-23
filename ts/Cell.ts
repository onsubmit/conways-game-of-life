export default class Cell {
  private _context: CanvasRenderingContext2D;
  private _x: number;
  private _y: number;
  private _cellSize: number;
  private _isAlive: boolean;
  private _colorAlive: string;
  private _colorDead: string;

  constructor(
    context: CanvasRenderingContext2D,
    x: number,
    y: number,
    cellSize: number,
    colorAlive: string,
    colorDead: string
  ) {
    this._context = context;

    this._x = x;
    this._y = y;

    this._cellSize = cellSize;
    this._colorAlive = colorAlive;
    this._colorDead = colorDead;

    this._isAlive = Math.random() > 0.5;
  }

  get isAlive() {
    return this._isAlive;
  }

  set isAlive(value: boolean) {
    this._isAlive = value;
  }

  draw() {
    this._context.fillStyle = this._isAlive ? this._colorAlive : this._colorDead;
    this._context.fillRect(this._x * this._cellSize, this._y * this._cellSize, this._cellSize, this._cellSize);
  }
}
