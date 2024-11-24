import { Assets } from "pixi.js";

export default class Loader {
  private manifest = {
    bundles: [
      {
        name: "game-assets",
        assets: [
          { alias: "bg", src: "src/sprites/bg.png" },
          { alias: "diamond", src: "src/sprites/diamond.png" },
          { alias: "hero", src: "src/sprites/hero.png" },
          { alias: "jump", src: "src/sprites/jump.png" },
          { alias: "platform", src: "src/sprites/platform.png" },
          { alias: "powerUp", src: "src/sprites/powerUp.png" },
          { alias: "tile", src: "src/sprites/tile.png" },
          { alias: "walk1", src: "src/sprites/walk1.png" },
          { alias: "walk2", src: "src/sprites/walk2.png" },
        ],
      },
    ],
  };

  async init() {}

  async loadGameAssets() {
    await this.init();
    return Assets.loadBundle("game-assets");
  }
}
export const manifest = {
  bundles: [
    {
      name: "game-assets",
      assets: [
        { alias: "bg", src: "src/sprites/bg.png" },
        { alias: "diamond", src: "src/sprites/diamond.png" },
        { alias: "hero", src: "src/sprites/hero.png" },
        { alias: "jump", src: "src/sprites/jump.png" },
        { alias: "platform", src: "src/sprites/platform.png" },
        { alias: "powerUp", src: "src/sprites/powerUp.png" },
        { alias: "tile", src: "src/sprites/tile.png" },
        { alias: "walk1", src: "src/sprites/walk1.png" },
        { alias: "walk2", src: "src/sprites/walk2.png" },
      ],
    },
  ],
};

export async function initAssets() {
  await Assets.init({ manifest: manifest });
  await Assets.backgroundLoadBundle('game-assets');
}
