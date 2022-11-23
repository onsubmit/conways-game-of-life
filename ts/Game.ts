import Config from "./Config";
import Grid from "./Grid";

// http://127.0.0.1:5500/out/index.html?canvasWidth=540&canvasHeight=960&cellSize=10&colorAlive=F0F&colorDead=000

export default class Game {
  private _width: number;
  private _height: number;
  private _frameDelay: number;
  private _context: CanvasRenderingContext2D;

  private _grid: Grid;

  constructor(canvas: HTMLCanvasElement, config: Config) {
    this._width = canvas.width / config.cellSize;
    this._height = canvas.height / config.cellSize;
    this._frameDelay = config.frameDelay;

    const context = canvas.getContext("2d");
    if (!context) {
      throw "Could not get rendering context";
    }

    this._context = context;
    this._grid = new Grid(
      this._context,
      this._width,
      this._height,
      config.cellSize,
      config.colorAlive,
      config.colorDead
    );
  }

  start = () => {
    this.requestLoop();
  };

  loop = () => {
    this._grid.checkNeighbors();
    this._grid.clear();
    this._grid.draw();

    if (this._frameDelay > 0) {
      setTimeout(() => {
        this.requestLoop();
      }, this._frameDelay);
    } else {
      this.requestLoop();
    }
  };

  private requestLoop = () => {
    window.requestAnimationFrame(() => this.loop());
  };
}
