import { Text, TextStyle } from "pixi.js";
import { IGameService } from "../system/SceneManager";

export class LabelScore extends Text {
  constructor(game: IGameService) {
    super();
    this.x = game.config.score.x;
    this.y = game.config.score.y;
    this.anchor.set(game.config.score.anchor);
    this.style = new TextStyle({
      fontFamily: game.config.score.style.fontFamily,
      fontWeight: game.config.score.style.fontWeight as any,
      fontSize: game.config.score.style.fontSize,
      fill: game.config.score.style.fill,
    });
    this.renderScore();
  }

  renderScore(score = 0) {
    this.text = `Score: ${score}`;
  }
}
