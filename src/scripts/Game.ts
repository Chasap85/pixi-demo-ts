import { Application, Texture } from "pixi.js";
import { Config } from "./system/Config";
import { Assets, Sprite } from "pixi.js";
import Loader from "./system/Loader";
import Matter from "matter-js";
import SceneManger, { IGameService } from "./system/SceneManager";

/** Game adds gamescene and instantiates main App */
export default class Game {
  public readonly app: Application;
  private loader = new Loader();
  public readonly physics: Matter.Engine;
  public readonly scenes: SceneManger;
  public config: typeof Config;

  constructor(app: Application) {
    this.app = app;
    this.config = Config;
    this.physics = Matter.Engine.create();

    const game: IGameService = {
      app: this.app,
      config: this.config,
      sprite: this.sprite.bind(this),
      res: this.res.bind(this),
      physics: this.physics,
    };

    this.scenes = new SceneManger();
    this.app.stage.interactive = true;
    this.init(game);
  }

  private init(game: IGameService): void {
    this.loadAssets();
    this.app.stage.addChild(this.scenes.container);
    //physics
    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, this.physics);
    this.start(game);
  }

  async loadAssets(): Promise<void> {
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
  //return texture
  async res(key: string): Promise<Texture> {
    const texture = await Assets.load(key);
    return texture;
  }

  public async start(game: IGameService): Promise<void> {
    const scene = await this.scenes.start();

    if (scene) {
      scene.create(game);
    }
  }
}
