import { Container } from "pixi.js";
import Platform from "@/scripts/game/Platform";
import { IGameService } from "@/scripts/system/SceneManager";

export default class Platforms {
  public platforms: Platform[];
  public container: Container;
  public game: IGameService;
  public ranges!: any;
  public current!: any;

  constructor(game: IGameService) {
    this.platforms = [];
    this.container = new Container();
    this.game = game;
    this.update = this.update.bind(this);

    this.createInitialPlatform();
  }

  get randomData(): { rows: number; cols: number; x: number } {
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

  private createInitialPlatform(): void {
    this.createPlatform({
      rows: 4,
      cols: 6,
      x: 200,
    });
  }

  async createPlatform(data: { rows: number; cols: number; x: number }): Promise<void> {
    const platform = new Platform(this.game, data.rows, data.cols, data.x);
    this.container.addChild(platform.container);
    this.platforms.push(platform);
    this.current = platform;
  }

  update(): void {
    this.platforms.forEach((platform) => platform.move());
    if (
      this.current.container.x + this.current.container.width <
      window.innerWidth
    ) {
      this.createPlatform(this.randomData);
    }
  }

  destroy(): void {
    this.platforms.forEach((platform) => platform.destroy());
    this.container.destroy();
  }
}
