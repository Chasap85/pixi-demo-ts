import * as PIXI from "pixi.js";
import { Config } from "./system/Config";
import { Assets, Sprite } from "pixi.js";
import Loader from "./system/Loader";

export default class App {
  private app: PIXI.Application;
  private loader: Loader;
  // private config: typeof Config;


  constructor(app: PIXI.Application) {
    this.app = app;
    // this.config = Config;
    this.loader = new Loader();
    this.init();

  }

  private async init() {
    this.loadAssets();
  }

  async loadAssets() {
    try {
      await this.loader.loadGameAssets();
    } catch (error){
      console.error("failed to load assets", error);
    }
  }

  async sprite(key: string): Promise<Sprite>{
    const texture = Assets.load(key);
    const resource = texture.then((res) => {
      const sprite = Sprite.from(res)
      return sprite;
    })
    return resource;
  }

  async start(): Promise<any> {
    const bg = await this.sprite('bg')
    this.app.stage.addChild(bg)
    // const text = Sprite.from(flower);
    // flower.x = app.screen.width * 0.25;
    // flower.y = app.screen.height / 2;
    // app.stage.addChild(flower);
  }
}
