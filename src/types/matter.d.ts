import * as Matter from 'matter-js';
import { Hero } from '../scripts/game/Hero';
import Platform from '../scripts/game/Platform';

declare module 'matter-js' {
    interface Body {
        gameHero?: Hero;
        gamePlatform?: Platform;
        gameDiamond?: any;
    }
}