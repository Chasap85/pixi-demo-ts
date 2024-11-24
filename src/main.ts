import gsap from 'gsap';
import * as PIXI from 'pixi.js';
import PixiPlugin from 'gsap/PixiPlugin';
import { Application } from "pixi.js";
import { sceneManager } from "./scripts/system/SceneManager";
import { initAssets } from "./scripts/system/Loader";
import { GameScene } from "./scripts/game/GameScene";

/** Share pixi app instance across the project */
export const app = new Application();

window.addEventListener("DOMContentLoaded", init);

function destroyExistingGame(): void {
  const game = document.body.children;
  if (game.length > 0) document.body.removeChild(game.item(0) as Node);
}

function initScene(){
    sceneManager.init();
}

async function init() {
  destroyExistingGame();
  gsap.registerPlugin(PixiPlugin);
  PixiPlugin.registerPIXI(PIXI);

  await app.init({
    autoStart: false,
    resizeTo: window,
    sharedTicker: true,
  });

  document.body.appendChild(app.canvas);

  initScene();

  await initAssets().then(()=> console.log("assets loaded"))

  await sceneManager.start(GameScene);
}
