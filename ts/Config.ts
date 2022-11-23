export default class Config {
  private _canvasWidth: number;
  private _canvasHeight: number;
  private _cellSize: number;
  private _frameDelay: number;
  private _colorAlive: string;
  private _colorDead: string;

  constructor(params: { [key: string]: string }) {
    this._canvasWidth = parseInt(params.canvasWidth, 10) || 800;
    this._canvasHeight = parseInt(params.canvasHeight, 10) || 600;

    this._cellSize = parseInt(params.cellSize) || 10;
    this._frameDelay = parseInt(params.frameDelay) || 0;

    this._colorAlive = params.colorAlive;
    this._colorDead = params.colorDead;

    if (this._colorAlive && !this._colorAlive.startsWith("#")) {
      this._colorAlive = `#${this._colorAlive}`;
    }

    if (this._colorDead && !this._colorDead.startsWith("#")) {
      this._colorDead = `#${this._colorDead}`;
    }
  }

  get canvasWidth() {
    return this._canvasWidth;
  }

  get canvasHeight() {
    return this._canvasHeight;
  }

  get cellSize() {
    return this._cellSize;
  }

  get frameDelay() {
    return this._frameDelay;
  }

  get colorAlive() {
    return this._colorAlive;
  }

  get colorDead() {
    return this._colorDead;
  }
}
