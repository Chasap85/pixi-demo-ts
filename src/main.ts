import Game from "./scripts/Game";
import { Application } from "pixi.js";
import gsap from "gsap";
import PixiPlugin from "gsap/PixiPlugin";
import * as PIXI from 'pixi.js';

window.addEventListener("DOMContentLoaded", initGame);

function destroyExistingGame(): void {
  const game = document.body.children;
  if (game.length > 0) document.body.removeChild(game.item(0) as Node);
}
async function init(): Promise<Application> {
  destroyExistingGame();
  gsap.registerPlugin(PixiPlugin);
  PixiPlugin.registerPIXI(PIXI);

  const app = new Application();
  await app.init({
    autoStart: false,
    resizeTo: window,
    sharedTicker: true,
  });
  document.body.appendChild(app.canvas);
  return app;
}

async function initGame() {
  const app = await init();

  const game = new Game(app);
  game.start();
}
