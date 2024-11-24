import { Container, Sprite, Ticker } from "pixi.js";
import { Config } from "../system/Config";
import { Game } from "../Game";

export class Background {
  public speed: number;
  public container: Container;
  private sprites: Sprite[] = [];

  constructor() {
    this.speed = Config.bgSpeed;
    this.container = new Container();
    // this.createSprites();
    this.createSprites();
  }

  createSprites(): void {
    for (let i = 0; i < 3; i++) {
      this.createSprite(i);
    }
  }

  async createSprite(i: number): Promise<void> {
    const sprite: Sprite = await Sprite.from('bg')
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

  update(dt:any): void {
    const offset = this.speed * dt.deltaTime;

    this.sprites.forEach((sprite) => {
      this.move(sprite, offset);
    });
  }

  public destroy(): void {
    this.container.destroy();
  }
}
