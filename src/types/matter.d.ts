import * as Matter from 'matter-js';
import { Hero } from '../scripts/game/Hero';
import Platform from '../scripts/game/Platform';
import { PowerUp } from '../scripts/game/PowerUp';

declare module 'matter-js' {
    interface Body {
        gameHero?: Hero;
        gamePlatform?: Platform;
        gameDiamond?: Diamond;
        gamePowerUp?: PowerUp;
    }
}