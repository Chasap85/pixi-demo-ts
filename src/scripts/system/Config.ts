interface ConfigType {
  bgSpeed: number;
  score: {
    x: number;
    y: number;
    anchor: number;
    style: {
      fontFamily: string;
      fontWeight: string;
      fontSize: number;
      fill: string[];
    };
  };
  diamonds: {
    chance: number;
    offset: {
      min: number;
      max: number;
    };
  };
  powerUp: {
    chance: number;
    duration: number;
    radius: number;
    offset: {
      min: number;
      max: number;
    };
  };
  platforms: {
    moveSpeed: number;
    ranges: {
      rows: { min: number; max: number };
      cols: { min: number; max: number };
      offset: { min: number; max: number };
    };
  };
  hero: {
    jumpSpeed: number;
    maxJumps: number;
    position: { x: number; y: number };
  };
  scenes: {
    [key: string]: typeof GameScene;
  };
}

export const Config: ConfigType = {
    bgSpeed: 2,
    score: {
        x: 10,
        y: 10,
        anchor: 0,
        style: {
            fontFamily: "Verdana",
            fontWeight: "bold",
            fontSize: 44,
            fill: ["#FF7F50"]
        }
    },
    diamonds: {
        chance: 0.4,
        offset: {
            min: 100,
            max: 200
        }
    },
    powerUp: {
        chance: 0.5,
        duration: 5000,
        radius: 300,
        offset: {
            min: 100,
            max: 500,
        }
    },
    platforms: {
        moveSpeed: -1.5,
        ranges: {
            rows: {
                min: 2,
                max: 6
            },
            cols: {
                min: 3,
                max: 9
            },
            offset: {
                min: 60,
                max: 200
            }
        }
    },
    hero: {
        jumpSpeed: 15,
        maxJumps: 2,
        position: {
            x: 350,
            y: 595
        }
    },
    scenes: {
        "Game": GameScene
    }
};