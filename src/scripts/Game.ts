import { Application } from "pixi.js";
import { Config } from "./system/Config";
import { Assets, Sprite } from "pixi.js";
import Loader from "./system/Loader";
import * as Matter from "matter-js";
import SceneManger from "./system/SceneManager";

export default class Game {
  public readonly app: Application;
  private loader: Loader;
  public readonly physics: Matter.Engine;
  public readonly scenes: SceneManger;
  public config: typeof Config;

  constructor(app: Application) {
    this.app = app;
    this.config = Config;

    this.loader = new Loader();
    this.scenes = new SceneManger(this);
    // diamondManager
    this.app.stage.interactive = true;
    this.physics = Matter.Engine.create();
    this.init();
  }

  private async init() {
    this.loadAssets();
    this.app.stage.addChild(this.scenes.container);
    //physics
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, this.physics);
    this.start();
  }

  async loadAssets() {
    try {
      await this.loader.loadGameAssets();
    } catch (error) {
      console.error("failed to load assets", error);
    }
  }

  // Return sprite
  async sprite(key: string): Promise<Sprite> {
    const texture = Assets.load(key);
    const resource = texture.then((res) => {
      return Sprite.from(res);
    });
    return resource;
  }

  start() {
    this.scenes.start("game");
  }
}
