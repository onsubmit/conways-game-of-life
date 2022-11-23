import Cell from "./Cell";
import { Coordinate } from "./Coordinate";

export default class Grid {
  private _context: CanvasRenderingContext2D;
  private _width: number;
  private _height: number;
  private _cells: Cell[][] = [];

  private static _directions: Coordinate[] = [
    { x: -1, y: -1 },
    { x: 0, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 },
    { x: -1, y: 1 },
    { x: 0, y: 1 },
    { x: 1, y: 1 },
  ];

  constructor(
    context: CanvasRenderingContext2D,
    width: number,
    height: number,
    cellSize: number,
    cellColorAlive = "#BBE1FA",
    cellColorDead = "#0F4C75"
  ) {
    this._context = context;
    this._width = width;
    this._height = height;

    for (let x = 0; x < width; x++) {
      this._cells[x] = [];
      for (let y = 0; y < height; y++) {
        this._cells[x][y] = new Cell(context, x, y, cellSize, cellColorAlive, cellColorDead);
      }
    }
  }

  draw = () => {
    for (let x = 0; x < this._width; x++) {
      for (let y = 0; y < this._height; y++) {
        this._cells[x][y].draw();
      }
    }
  };

  clear = () => {
    this._context.clearRect(0, 0, this._width, this._height);
  };

  checkNeighbors = () => {
    const changingCells = new Map<Coordinate, boolean>();
    for (let x = 0; x < this._width; x++) {
      for (let y = 0; y < this._height; y++) {
        const numAlive = Grid._directions.reduce((total, direction) => {
          return total + (this.isCellAlive(x + direction.x, y + direction.y) ? 1 : 0);
        }, 0);

        if (numAlive == 2) {
          changingCells.set({ x, y }, this._cells[x][y].isAlive);
          continue;
        }

        changingCells.set({ x, y }, numAlive == 3);
      }
    }

    for (const [coordinate, isAlive] of changingCells) {
      this._cells[coordinate.x][coordinate.y].isAlive = isAlive;
    }
  };

  isCellAlive = (x: number, y: number) => {
    const cell = this._cells[x] && this._cells[x][y];
    return cell ? cell.isAlive : false;
  };
}
