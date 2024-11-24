import { Application, Container, Sprite, Texture } from "pixi.js";
import GameScene from "@/scripts/game/GameScene";
import { Config } from "@/scripts/system/Config";

export interface IGameService {
    app: Application;
    config: typeof Config;
    sprite(key:string): Promise<Sprite>
    res(key:string): Promise<Texture>
    physics: Matter.Engine;
}

export default class SceneManger {
  public container: Container;
  public scene: any;

  constructor() {
    this.container = new Container();
    this.container.interactive = true;
    this.scene = null;
  }

  async start(): Promise<GameScene> {
    if (this.scene) {
      this.scene.destroy();
    }
    // this.scene = new this.game.config.scenes[scene](this.game);
    this.scene = new GameScene();

    this.container.addChild(this.scene.container);
    return this.scene;
  }

  update(dt:any): void {
    if (this.scene && this.scene.update) {
      this.scene.update(dt);
    }
  }
}
