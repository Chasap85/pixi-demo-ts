import { Background } from "./Background";
import { Hero } from "./Hero";
import Matter from "matter-js";
import Platforms from "./Platforms";
import { Container, Ticker } from "pixi.js";
import { IGameService } from "../system/SceneManager";
import { app } from "../../main";

/** Creates main game scene */
export default class GameScene {
  public bg!: Background;
  public hero!: Hero;
  public platforms!: Platforms;
  public container: Container;
  public gameService!: IGameService;

  constructor() {
    this.container = new Container();
    this.container.interactive = true;
  }

  /** Load up all the game objects */
  async create(gameService: IGameService): Promise<void> {
    this.container.removeChildren();
    this.gameService = gameService;

    this.createBackground(gameService);
    await this.createHero(gameService);
    this.createPlatforms(gameService);
    this.setEvents(gameService);
    app.ticker.add(this.update, this);
  }

  private async restartGame(): Promise<void> {
    this.destroy();

    await this.create(this.gameService);
  }

  setEvents(game: IGameService): void {
    Matter.Events.on(
      game.physics,
      "collisionStart",
      this.onCollisionStart.bind(this)
    );
  }

  onCollisionStart(event: Matter.IEventCollision<Matter.Engine>): void {
    const colliders = [event.pairs[0].bodyA, event.pairs[0].bodyB];
    const hero = colliders.find((body) => body.gameHero);
    const platform = colliders.find((body) => body.gamePlatform);
    // const powerUp = colliders.find(body => body.gamePowerUp);

    if (hero && platform) {
      this.hero.stayOnPlatform(platform.gamePlatform!);
    }

    // const diamond = colliders.find(body => body.gameDiamond);

    // if (hero && diamond) {
    //     this.hero.collectDiamond(diamond.gameDiamond);
    // }

    // if (hero && powerUp){
    //     this.hero.activatePowerUp(powerUp.gamePowerUp);
    // }
  }

  createBackground(game: IGameService): void {
    const bg = new Background(game);
    this.container.addChild(bg.container);
    this.bg = bg;
  }

  async createHero(game: IGameService): Promise<void> {
    const hero = new Hero(game);
    const sprite = await hero.createSprite();

    this.container.addChild(sprite);
    this.hero = hero;

    this.container.interactive = true;
    this.container.on("pointerdown", () => {
      this.hero.startJump();
    });

    this.hero.sprite.once("die", async () => {
      await this.restartGame();
    });
  }

  createPlatforms(game: IGameService): void {
    const platforms = new Platforms(game);

    this.container.addChild(platforms.container);
    this.platforms = platforms;
  }

  update(dt: Ticker): void {
    this.bg.update(dt.deltaTime);
    this.hero.update();
    if (this.platforms) {
      this.platforms.update();
    }
  }

  destroy(): void {
    Matter.Events.off(
      this.gameService.physics,
      "collisionStart",
      this.onCollisionStart.bind(this)
    );
    if (this.hero) this.hero.destroy();
    if (this.platforms) this.platforms.destroy();
    if (this.bg) this.bg.destroy();
    app.ticker.remove(this.update, this);
    // this.labelScore.destroy();
    // App.diamondManager.destroy();
  }
}
