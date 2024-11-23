import { Container } from "pixi.js";
import Platform from "./Platform";
import Game from "../Game";

export default class Platforms {
  public platforms: Platform[];
  public container: Container;
  public game: Game;
  public ranges!: any;
  public current!: any;

  constructor(game: Game) {
    this.platforms = [];
    this.container = new Container();
    this.game = game;
    this.update = this.update.bind(this);

    this.createInitialPlatform();
  }

  get randomData() {
    this.ranges = this.game.config.platforms.ranges;
    let data = { rows: 0, cols: 0, x: 0 };

    const offset =
      this.ranges.offset.min +
      Math.round(
        Math.random() * (this.ranges.offset.max - this.ranges.offset.min)
      );

    data.x = this.current.container.x + this.current.container.width + offset;
    data.cols =
      this.ranges.cols.min +
      Math.round(Math.random() * (this.ranges.cols.max - this.ranges.cols.min));
    data.rows =
      this.ranges.rows.min +
      Math.round(Math.random() * (this.ranges.rows.max - this.ranges.rows.min));

    return data;
  }

  private async createInitialPlatform() {
    await this.createPlatform({
      rows: 4,
      cols: 6,
      x: 200,
    });
  }
  createPlatform(data: { rows: number; cols: number; x: number }) {
    const platform = new Platform(this.game, data.rows, data.cols, data.x);
    this.container.addChild(platform.container);
    this.platforms.push(platform);
    this.current = platform;
  }

  update() {
    this.platforms.forEach((platform) => platform.move());
    if (
      this.current.container.x + this.current.container.width <
      window.innerWidth
    ) {
      this.createPlatform(this.randomData);
    }

    // // 06
  }

  destroy() {
    this.platforms.forEach((platform) => platform.destroy());
    this.container.destroy();
  }
}
