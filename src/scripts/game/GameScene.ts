import Game from "../Game";
import Scene from "../system/Scene";
import { Background } from "./Background";

export default class GameScene extends Scene {
    public bg!: Background;
    constructor(game:Game){
        super(game);
        this.game = game;
    }
    create(): void {
        this.createBackground();
    }

    createBackground(){
        this.bg = new Background(this.game)
        this.container.addChild(this.bg.container)
    }
}