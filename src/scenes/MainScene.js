import { Scene } from "phaser";

import { Hero } from "../classes/Hero";
import { Stars } from "../classes/Stars";

import bomb from "../assets/bomb.png";
import platform from "../assets/platform.png";
import sky from "../assets/sky.png";
import star from "../assets/star.png";
import dude from "../assets/dude.png";

export class MainScene extends Scene {
  constructor() {
    super("Main");

    this.player = null;
    this.stars = null;
    this.playBtn = null;
    this.gameOverText = "";
    this.restartBtn = null;
  }

  preload() {
    this.load.image("bomb", bomb);
    this.load.image("platform", platform);
    this.load.image("sky", sky);
    this.load.image("star", star);
    this.load.spritesheet("dude", dude, {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    this.add.image(400, 300, "sky");

    // Platforms
    const platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, "platform").setScale(2).refreshBody();
    platforms.create(600, 400, "platform");
    platforms.create(50, 250, "platform");
    platforms.create(750, 220, "platform");

    // Player
    this.player = new Hero(this, 100, 450, "dude");
    this.physics.add.collider(this.player.heroSprite, platforms);

    // Stars
    this.stars = new Stars(
      this,
      12,
      "star",
      70,
      this.player.heroSprite,
      this.handleGameOver.bind(this)
    ).createStars(platforms, "bomb");

    this.physics.add.collider(this.stars, platforms);

    this.gameOverText = this.add
      .text(400, 300, "GAME OVER", {
        fontSize: "32px",
        fontStyle: "bold",
        strokeThickness: 10,
        fill: "#ad1414",
      })
      .setOrigin(0.5, 0.5);
    this.gameOverText.visible = false;

    this.restartBtn = this.add
      .text(400, 350, "Restart", {
        fontSize: "32px",
        fontStyle: "bold",
        fill: "#74DC10",
        backgroundColor: "#FFFFFF",
        padding: { x: 10, y: 5 },
      })
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .on(
        "pointerdown",
        () => {
          this.scene.restart();
        },
        this
      )
      .on("pointerover", () => this.restartBtn.setStyle({ fill: "#80ff02" }))
      .on("pointerout", () => this.restartBtn.setStyle({ fill: "#74DC10" }));

    this.restartBtn.visible = false;
  }

  update() {
    this.player.move();
  }

  handleGameOver() {
    this.gameOverText.visible = true;
    this.restartBtn.visible = true;
  }
}
