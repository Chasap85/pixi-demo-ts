import { Container, Sprite } from "pixi.js";
import { IGameService } from "../system/SceneManager";

export class Background {
  public game: IGameService;
  public speed: number;
  public container: Container;
  private sprites: Sprite[] = [];

  constructor(gameService: IGameService) {
    this.game = gameService;
    this.speed = gameService.config.bgSpeed;
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

  update(dt:number): void {
    const offset = this.speed * dt;

    this.sprites.forEach((sprite) => {
      this.move(sprite, offset);
    });
  }

  public destroy(): void {
    this.container.destroy();
  }
}
