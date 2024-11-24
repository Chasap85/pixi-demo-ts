import { Application, Container, Texture, Ticker } from "pixi.js";
import { Config } from "./system/Config";
import { Assets, Sprite } from "pixi.js";
import Loader from "./system/Loader";
import * as Matter from "matter-js";
import SceneManger from "./system/SceneManager";
import { Background } from "./game/Background";
import { app } from "../main";

export class Game {
  public stage = new Container();
  // public gameContainer = new Container();
  public background = new Background();

  public isGameOver = false;

  constructor(){
    this.stage.interactive = true;
    app.stage.addChild(this.stage);
  }

  public init(){
  }

  // public addToGame(...views: Container[]){
  //   console.log(...views)
  //   views.forEach((view)=> {
  //     this.gameContainer.addChild(view);
  //   })
  // }

  // pass update to all the game objects
  public update(dt: number){

  }
}