import Matter from "matter-js";
import { AnimatedSprite, Graphics, Sprite } from "pixi.js";
import gsap from "gsap";
import Platform from "./Platform";
import { IGameService } from "../system/SceneManager";
import { diamondManager } from "./DiamondManager";

export class Hero {
  public game: IGameService;
  public jumpIndex: number;
  public score: number;
  private dy: number;
  public maxJumps: number;
  public sprite!: AnimatedSprite;
  public body!: Matter.Body;
  public platform!: Platform | null;
  private powerupActive: boolean;
  private powerField: any;
  public attractedDiamonds!: Map<any, any>;

  constructor(game: IGameService) {
    this.game = game;
    this.dy = this.game.config.hero.jumpSpeed;
    this.maxJumps = this.game.config.hero.maxJumps;
    this.jumpIndex = 0;
    this.score = 0;
    this.powerupActive = false;

    // this.update = this.update.bind(this);
    // app.ticker.add(this.update, this);
    // this.startJump = this.startJump.bind(this);
    // keep track of each diamond and corresponding animation instance
    this.attractedDiamonds = new Map();
  }

  async createSprite(): Promise<AnimatedSprite> {
    // debugger;
    const walk1 = await this.game.res("walk1");
    const walk2 = await this.game.res("walk2");

    this.sprite = new AnimatedSprite([walk1, walk2]);

    const startX = this.game.config.hero.position.x;
    const startY = this.game.config.hero.position.y;

    const height = this.sprite.height;
    const width = this.sprite.width;

    this.sprite.x = startX;
    this.sprite.y = startY;
    this.sprite.loop = true;
    this.sprite.animationSpeed = 0.1;
    this.sprite.play();

    this.createBody(startX, startY, height, width);

    return this.sprite;
  }

  private createBody(x: number, y: number, h: number, w: number): void {
    this.body = Matter.Bodies.rectangle(x + w / 2, y + h / 2, w, h, {
      friction: 0,
    });

    Matter.World.add(this.game.physics.world, this.body);
    this.body.gameHero = this;
  }

  public startJump(): void {
    console.log(this.jumpIndex);
    if (this.platform || this.jumpIndex === 1) {
      ++this.jumpIndex;
      this.platform = null;
      Matter.Body.setVelocity(this.body, { x: 0, y: -this.dy });
    }
  }

  public collectDiamond(diamond) {
    ++this.score;
    if (this.attractedDiamonds.has(diamond)) {
      const tween = this.attractedDiamonds.get(diamond);
      if (tween) {
        tween.kill();
      }
      this.attractedDiamonds.delete(diamond);
    }
    this.sprite.emit("score");
    diamond.destroy();
  }

  activatePowerUp(powerUp) {
    powerUp.destroy();
    if (this.powerupActive) return;

    this.powerupActive = true;

    this.powerField = new Graphics();
    this.powerField.fill(0x4287f5, 0.2);
    this.powerField.drawCircle(0, 0, 300);
    this.sprite.addChild(this.powerField);

    this.powerField.alpha = 0;
    gsap.to(this.powerField, {
      alpha: 1,
      duration: 0.5,
      yoyo: true,
      repeat: -1,
    });

    setTimeout(
      () => this.deactivatePowerup(),
      this.game.config.powerUp.duration
    );
  }

  public stayOnPlatform(platform: Platform): void {
    this.platform = platform;
    this.jumpIndex = 0;
  }

  destroy(): void {
    Matter.World.add(this.game.physics.world, this.body);
    // gsap.killTweensOf(this.sprite);
    this.sprite.destroy();
  }

  update(): void {
    this.sprite.x = this.body.position.x - this.sprite.width / 2;
    this.sprite.y = this.body.position.y - this.sprite.height / 2;

    if (this.powerupActive) {
      this.startAttractingDiamonds();
    }

    if (this.sprite.y > window.innerHeight) {
      this.sprite.emit("die");
    }
  }

  deactivatePowerup() {
    this.powerupActive = false;
    if (this.powerField) {
      gsap.killTweensOf(this.powerField);
      this.sprite.removeChild(this.powerField);
      this.powerField.destroy();
      this.powerField = null;
    }
  }

  startAttractingDiamonds() {
    const heroPosition = {
      x: this.sprite.x + this.sprite.width / 2,
      y: this.sprite.y + this.sprite.height / 2,
    };

    const nearbyDiamonds = diamondManager.getNearbyDiamonds(
      heroPosition.x,
      heroPosition.y,
      this.game.config.powerUp.radius
    );

    for (const diamond of nearbyDiamonds) {
      if (this.attractedDiamonds.has(diamond)) continue;

      const tween = gsap.to(
        {},
        {
          duration: 0.6,
          ease: "power1.in",
          onUpdate: () => {
            if (!diamond.body?.destroyed) {
              diamond.x = gsap.utils.interpolate(
                diamond.x,
                this.sprite.x - diamond.parent.x,
                0.05
              );
              diamond.y = gsap.utils.interpolate(
                diamond.y,
                this.sprite.y - diamond.parent.y,
                0.5
              );
            }
          },
          onComplete: () => {
            if (diamond) {
              this.collectDiamond(diamond);
            }
          },
        }
      );
      this.attractedDiamonds.set(diamond, tween);
    }
  }
}
