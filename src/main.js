import Phaser from "phaser";

import { MainScene } from "./scenes/MainScene.js";

import "./style.css";

const config = {
  type: Phaser.AUTO,
  title: "First_Game",
  description: "",
  parent: "game-container",
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  pixelArt: false,
  scene: [MainScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};
new Phaser.Game(config);
