import { Container } from "pixi.js";
import Game from "../Game";

export default abstract class Scene {
  public game: Game;
  public container: Container;

  constructor(game: Game) {
    this.game = game;
    this.container = new Container();
    this.container.interactive = true;
    this.create(); // from gamescene
    this.game.app.ticker.add(this.update, this);
  }

  abstract create(): void;
  update() {}
  destroy() {}
}
