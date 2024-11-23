import { Container, Sprite } from "pixi.js";
import Game from "../Game";

export class Background {
  public game: Game;
  public speed: number;
  public container: Container;
  private sprites: Sprite[] = [];

  constructor(game: Game) {
    this.game = game;
    this.speed = this.game.config.bgSpeed;
    this.container = new Container();
    this.createSprites();
  }

  createSprites(): void {
    for (let i = 0; i < 3; i++) {
      this.createSprite(i);
    }
  }

  async createSprite(i: number): Promise<void> {
    const sprite: Sprite = await this.game.sprite("bg");
    sprite.x = sprite.width * i;
    sprite.y = 0;

    this.container.addChild(sprite);
    this.sprites.push(sprite);
  }

  move(sprite: Sprite, offset: number): void {
    const spriteRightX = sprite.x + sprite.width;

    const screenLeftX = 0;

    if (spriteRightX <= screenLeftX) {
      sprite.x += sprite.width * this.sprites.length;
    }

    sprite.x -= offset;
  }

  update(dt: any): void {
    const offset = this.speed * dt;

    this.sprites.forEach((sprite) => {
      this.move(sprite, offset);
    });
  }

  destroy(): void {
    this.container.destroy();
  }
}
