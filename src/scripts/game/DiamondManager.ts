import { Diamond } from "@/scripts/game/Diamond";

/**
 * @class Diamond Manager
 * @description Diamond Manager class can be used to locate current diamonds
 *              in the scene. This makes it easier by not having to remember the
 *              App.scenes.scene dot notations and can just check the set of
 *              current diamond objects
 */
export class DiamondManager {
  public diamonds: Set<Diamond>;
  constructor() {
    this.diamonds = new Set();
  }

  addDiamond(diamond: Diamond) {
    this.diamonds.add(diamond);
  }

  removeDiamond(diamond: Diamond) {
    this.diamonds.delete(diamond);
  }
  /**
   * Hero depends on powerup to gain fast diamond collection as long
   * as the nearby diamonds are within the radius.
   * @param {*} x Hero x position or any x position
   * @param {*} y Hero y position or any y position
   * @param {*} radius Power-up radius or any radius
   * @return {diamond}
   */
  async getNearbyDiamonds(x: number, y: number, radius: number): Promise<Diamond[]> {
    if (this.diamonds) {
      return Array.from(this.diamonds).filter((diamond) => {
        if (!diamond) return false;

        const diamondX = diamond.sprite.x + diamond.sprite.parent.x;
        const diamondY = diamond.sprite.y + diamond.sprite.parent.y;

        const dx = diamondX - x;
        const dy = diamondY - y;
        const distanceSquared = dx * dx + dy * dy;
        const radiusSquared = radius * radius;

        return distanceSquared <= radiusSquared;
      });
    }
    return [];
  }

  destroy() {
    this.diamonds.clear();
  }
}
export const diamondManager = new DiamondManager();
