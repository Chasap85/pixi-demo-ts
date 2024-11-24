import { Container } from "pixi.js";
import { Config } from "../system/Config";
import Matter from "matter-js";
import { IGameService } from "../system/SceneManager";

export default class Platform {
  public game: IGameService;
  public body!: any;
  public container!: Container;
  public diamonds: any;
  public powerUps: any;
  private rows: number;
  private cols: number;
  private tile: any;
  private tileSize!: number;
  private width!: number;
  private height!: number;
  private dx: number;

  constructor(game: IGameService, rows: number, cols: number, x: number) {
    this.game = game;
    this.diamonds = [];
    this.powerUps = [];

    this.rows = rows;
    this.cols = cols;

    this.container = new Container();
    this.dx = Config.platforms.moveSpeed;
    this.init(x);
    // this.createDiamonds();
    // this.createPowerUps();
  }

  private async init(x: number): Promise<void> {
    await this.createContainer(x);
    await this.createTiles();
    await this.createBody();
  }

  private async createContainer(x: number): Promise<void> {
    this.tile = await this.game.sprite("tile");
    this.tileSize = this.tile.width;
    this.width = this.tileSize * this.cols;
    this.height = this.tileSize * this.rows;

    this.container.x = x;
    this.container.y = window.innerHeight - this.height;
  }

  private async createTiles(): Promise<void> {
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        await this.createTile(row, col);
      }
    }
  }

  private async createTile(row: number, col: number): Promise<void> {
    const texture = row === 0 ? "platform" : "tile";
    const tile = await this.game.sprite(texture);
    tile.x = col * tile.width;
    tile.y = row * tile.height;
    this.container.addChild(tile);
  }

  private async createBody(): Promise<void> {
    this.body = Matter.Bodies.rectangle(
      this.width / 2 + this.container.x,
      this.height / 2 + this.container.y,
      this.width,
      this.height,
      { friction: 0, isStatic: true }
    );
    Matter.World.add(this.game.physics.world, this.body);
    this.body.gamePlatform = this;
  }

  move(): void {
    if (this.body) {
      Matter.Body.setPosition(this.body, {
        x: this.body.position.x + this.dx,
        y: this.body.position.y,
      });
      this.container.x = this.body.position.x - this.width / 2;
      this.container.y = this.body.position.y - this.height / 2;
    }
  }

  destroy(): void {
    Matter.World.remove(this.game.physics.world, this.body);
    // this.diamonds.forEach((diamond) => diamond.destroy());
    // this.powerUps.forEach((powerUp) => powerUp.destroy());
    this.container.destroy();
  }
}
