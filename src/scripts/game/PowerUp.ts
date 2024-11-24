import gsap from "gsap";
import { Sprite } from "pixi.js";
import { app } from "../../main";
import { IGameService } from "../system/SceneManager";
import Matter from "matter-js";

export class PowerUp {
    public sprite: Sprite;
    public game: IGameService;
    public body!: any;

    constructor(game:IGameService, x:number, y:number) {
        this.game = game
        this.sprite = Sprite.from('powerUp')
        this.sprite.x = x;
        this.sprite.y = y;

        app.ticker.add(this.update, this);
    }

    createAnimation() {
        gsap.to(this.sprite, {
            y: this.sprite.y - 10,
            duration: 1,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut"
        });
    }

    createBody() {
        this.body = Matter.Bodies.circle(
            this.sprite.x + this.sprite.width / 2,
            this.sprite.y + this.sprite.height / 2,
            this.sprite.width / 2,
            { isSensor: true, isStatic: true, label: "powerup" }
        )
        this.body.gamePowerUp = this;
        Matter.World.add(this.game.physics.world, this.body);
    }

    update() {
        if (this.sprite){
            Matter.Body.setPosition(this.body, {
                x: this.sprite.width / 2 + this.sprite.x + this.sprite.parent.x,
                y: this.sprite.height / 2 + this.sprite.y + this.sprite.parent.y
            })
        }
    }

    destroy() {
        if (this.sprite){
            this.game.app.ticker.remove(this.update, this);
            Matter.World.remove(this.game.physics.world, this.body);
            gsap.killTweensOf(this.sprite);
            this.sprite.destroy();
            // this.sprite = null;
        }
    }
}