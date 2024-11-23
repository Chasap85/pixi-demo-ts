import { Container } from "pixi.js";
import Game from "../Game";

export default class SceneManger {
  public container: Container;
  private game: Game;
  public scene: any;

  constructor(game: Game) {
    this.game = game;
    this.container = new Container();
    this.container.interactive = true;
    this.scene = null;
  }

  start(scene: string): void {
    if (this.scene) {
      // this.scene.destroy();
      console.log(scene);
    }
    this.scene = new this.game.config.scenes[scene](this.game);
    this.container.addChild(this.scene.container);
  }

  update(dt: any): void {
    if (this.scene && this.scene.update) {
      this.scene.update(dt);
    }
  }
}
