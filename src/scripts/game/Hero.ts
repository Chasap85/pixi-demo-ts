import * as Matter from "matter-js";
import { Sprite, AnimatedSprite } from "pixi.js";
import gsap from "gsap";
import Game from "../Game";
import GameScene from "./GameScene";

export class Hero {
  public game: Game;
  public jumpIndex: number;
  public score: number;
  private dy: number;
  public maxJumps: number;
  public sprite!: AnimatedSprite;
  public body!: any;

  constructor(game: Game) {
    this.game = game;
    // this.game.app.ticker.add(this.update, this);
    this.dy = this.game.config.hero.jumpSpeed;
    this.maxJumps = this.game.config.hero.maxJumps;
    this.jumpIndex = 0;
    this.score = 0;
    this.startJump = this.startJump.bind(this)
    // keep track of each diamond and corresponding animation instance
    // this.attractedDiamonds = new Map();
  }

  async createSprite(): Promise<AnimatedSprite> {
    // debugger;
    const walk1 = await this.game.res("walk1");
    const walk2 = await this.game.res("walk2");

    this.sprite = new AnimatedSprite([walk1, walk2]);

    this.sprite.x = this.game.config.hero.position.x;
    this.sprite.y = this.game.config.hero.position.y;
    this.sprite.loop = true;
    this.sprite.animationSpeed = 0.1;
    this.sprite.play();
    this.createBody();

    return this.sprite;
  }

  createBody() {
    this.body = Matter.Bodies.rectangle(
      this.sprite.x + this.sprite.width / 2,
      this.sprite.y + this.sprite.height / 2,
      this.sprite.width,
      this.sprite.height,
      { friction: 0 }
    );
    Matter.World.add(this.game.physics.world, this.body);
    this.body.gameHero = this;
  }

  startJump() {
    console.log("JUMP");
  }

  destroy() {
    this.game.app.ticker.remove(this.update, this);
    // Matter.World.add(this.game.physics.world, this.body);
    // gsap.killTweensOf(this.sprite);
    this.sprite.destroy();
  }

  update() {}
}
