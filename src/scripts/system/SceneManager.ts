import { Assets, Container, Ticker } from "pixi.js";
import { Game } from "../Game";
import { app } from "../../main";

export interface AppScene<T = any> extends Container {
  create?: (data?: T) => void;
  show?: () => Promise<void>;
  update?: (time: Ticker) => void;
}

interface AppSceneConstructor {
  readonly assetBundle?: string[];
  new (): AppScene;
}

class SceneManger {
  //   public container: Container;
  //   private game: Game;
  public scene?: AppScene;
  public gameView = new Container();

  //   constructor() {
  //     this.game = game;
  //     this.container = new Container();
  //     this.container.interactive = true;
  //     // this.scene = null;
  //   }

  public init() {
    app.stage.interactive = true;
    app.stage.addChild(this.gameView);
    this.gameView.interactive = true;
  }

  private async destroyScene(scene: AppScene) {
    if (scene.update) {
      app.ticker.remove(scene.update, scene);
    }

    if (scene.parent) {
      scene.parent.removeChild(scene);
    }
  }

  public async start(Scene: AppSceneConstructor): Promise<void> {
    const current = this.scene;
    if (current) {
      await this.destroyScene(current);
    }

    if (Scene.assetBundle) {
      await Assets.loadBundle(Scene.assetBundle);
    }

    this.scene = new Scene();
    this.scene.create?.();

    if(this.scene.update){
        app.ticker.add(this.scene.update, this.scene);
    }

    if(this.scene.show){
        await this.scene.show();
    }
  }

  update(dt: any): void {
    if (this.scene && this.scene.update) {
      this.scene.update(dt);
    }
  }
}

export const sceneManager = new SceneManger();
