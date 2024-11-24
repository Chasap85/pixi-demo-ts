import { Sprite } from "pixi.js";
import { IGameService } from "../system/SceneManager";
import Matter from "matter-js";
import { diamondManager } from "./DiamondManager";
import { app } from "../../main";

export class Diamond {
  public sprite!: Sprite;
  public game: IGameService;
  public body!: any;

  constructor(game: IGameService, x: number, y: number) {
    this.game = game;
    this.sprite = Sprite.from("diamond");
    this.sprite.x = x;
    this.sprite.y = y;
    app.ticker.add(this.update, this);
    // this.createSprite(x, y);
  }

  public createBody(): void {
    const globalPosition = this.sprite.getGlobalPosition();

    this.body = Matter.Bodies.rectangle(
      globalPosition.x + this.sprite.width / 2,
      globalPosition.y + this.sprite.height / 2,
      this.sprite.width,
      this.sprite.height,
      { friction: 0, isStatic: true, render: { fillStyle: "#060a19" } }
    );
    this.body.isSensor = true;
    this.body.gameDiamond = this;
    Matter.World.add(this.game.physics.world, this.body);
    diamondManager.addDiamond(this)
  }

  public update(): void {
    if (this.sprite) {
      const diamondX =
        this.sprite.width / 2 + this.sprite.x + this.sprite.parent.x;
      const diamondY =
        this.sprite.height / 2 + this.sprite.y + this.sprite.parent.y;

      Matter.Body.setPosition(this.body, { x: diamondX, y: diamondY });

      if (diamondX < -this.sprite.width) {
        this.destroy();
        return;
      }
    }
  }

  public destroy(): void {
    if (this.sprite) {
      Matter.World.remove(this.game.physics.world, this.body);
      this.sprite.destroy();
      diamondManager.removeDiamond(this);
      app.ticker.remove(this.update, this);
    }
  }
}
