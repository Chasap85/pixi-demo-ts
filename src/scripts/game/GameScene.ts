import Game from "../Game";
import { Background } from "./Background";
import { Hero } from "./Hero";
import * as Matter from "matter-js";
import Platforms from "./Platforms";
import { Container } from "pixi.js";

export default class GameScene {
  public game: Game;
  public bg!: Background;
  public hero!: Hero;
  public platforms!: Platforms;
  public container: Container;

  constructor(game: Game) {
    this.game = game;
    this.container = new Container();
    this.container.interactive = true;
    this.create();
    this.update = this.update.bind(this);
    this.game.app.ticker.add(this.update, this);
  }
  async create(): Promise<void> {
    this.createBackground();
    await this.createHero();
    this.createPlatforms(this.game);
    this.setEvents();
  }

  setEvents() {
    Matter.Events.on(
      this.game.physics,
      "collisionStart",
      this.onCollisionStart.bind(this)
    );
  }

  onCollisionStart(event: any) {
    // console.log("EVENT", event);
    const colliders = [event.pairs[0].bodyA, event.pairs[0].bodyB];
    const hero = colliders.find((body) => body.gameHero);
    const platform = colliders.find((body) => body.gamePlatform);
    console.log(hero)
    // const powerUp = colliders.find(body => body.gamePowerUp);

    if (hero && platform) {
      this.hero.stayOnPlatform(platform.gamePlatform);
    }

    // const diamond = colliders.find(body => body.gameDiamond);

    // if (hero && diamond) {
    //     this.hero.collectDiamond(diamond.gameDiamond);
    // }

    // if (hero && powerUp){
    //     this.hero.activatePowerUp(powerUp.gamePowerUp);
    // }
  }

  createBackground(): void {
    const bg = new Background(this.game);
    this.container.addChild(bg.container);
    this.bg = bg;
  }

  async createHero(): Promise<void> {
    const hero = new Hero(this.game);
    const sprite = await hero.createSprite();

    this.container.addChild(sprite);
    this.hero = hero;

    this.container.interactive = true;
    this.container.on("pointerdown", () => {
      this.hero.startJump();
    });

    this.hero.sprite.once("die", () => {
        this.game.start();
    });
  }

  createPlatforms(game: Game) {
    const platforms = new Platforms(game);

    this.container.addChild(platforms.container);
    this.platforms = platforms;
  }

  update(dt: any) {
    this.bg.update(dt);
    if (this.platforms) {
      this.platforms.update();
    }
  }

  destroy() {
    Matter.Events.off(
      this.game.physics,
      "collisionStart",
      this.onCollisionStart.bind(this)
    );
    this.game.app.ticker.remove(this.update, this);
    if (this.bg && this.hero) {
      this.bg.destroy();
      this.hero.destroy();
    }
    // this.platforms.destroy();
    // this.labelScore.destroy();
    // App.diamondManager.destroy();
  }
}
