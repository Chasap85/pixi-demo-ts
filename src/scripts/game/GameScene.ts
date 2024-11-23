import Game from "../Game";
import Scene from "../system/Scene";
import { Background } from "./Background";
import { Hero } from "./Hero";

export default class GameScene extends Scene {
  public bg!: Background;
  public hero!: Hero;

  constructor(game: Game) {
    super(game);
    this.game = game;
    this.container.interactive = true;
  }
  async create(): Promise<void> {
    this.createBackground();
    await this.createHero();
  }

  createBackground(): void {
    this.bg = new Background(this.game);
    this.container.addChild(this.bg.container);
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
  }
}
