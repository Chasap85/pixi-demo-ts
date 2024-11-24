import { Assets, AssetsClass } from "pixi.js";

export default class Loader {
  private manifest = {
    bundles: [
      {
        name: "game-assets",
        assets: [
          { alias: "bg", src: "/assets/images/bg.png" },
          { alias: "diamond", src: "/assets/images/diamond.png" },
          { alias: "hero", src: "/assets/images/hero.png" },
          { alias: "jump", src: "/assets/images/jump.png" },
          { alias: "platform", src: "/assets/images/platform.png" },
          { alias: "powerUp", src: "/assets/images/powerUp.png" },
          { alias: "tile", src: "/assets/images/tile.png" },
          { alias: "walk1", src: "/assets/images/walk1.png" },
          { alias: "walk2", src: "/assets/images/walk2.png" },
        ],
      },
    ],
  };

  async init(): Promise<void> {
    await Assets.init({ manifest: this.manifest });
  }

  async loadGameAssets(): Promise<AssetsClass> {
    await this.init();
    return Assets.loadBundle("game-assets");
  }
}
