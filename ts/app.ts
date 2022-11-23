import "../less/app.less";
import Config from "./Config";
import Game from "./Game";

const searchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(searchParams);
const config = new Config(params);

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = config.canvasWidth;
canvas.height = config.canvasHeight;

const game = new Game(canvas, config);
game.start();
