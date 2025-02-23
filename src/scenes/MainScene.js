import { Scene } from "phaser";

import { Hero } from "../classes/Hero";
import { Fruits } from "../classes/Fruits";

import alienShip from "../assets/alienShipBig.png";
import platform from "../assets/platform.png";
import sky from "../assets/skyWithMountain.png";
import watermelonCracked from "../assets/cracked_watermelon.png";
import banana from "../assets/banana.png";
import orange from "../assets/orange.png";
import apple from "../assets/apple.png";
import dude from "../assets/blender.png";

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
    this.load.image("alienShip", alienShip);
    this.load.image("platform", platform);
    this.load.image("sky", sky);
    this.load.image("watermelonCracked", watermelonCracked);
    this.load.image("banana", banana);
    this.load.image("orange", orange);
    this.load.image("apple", apple);
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

    // Fruits
    this.stars = new Fruits(
      this,
      ["watermelonCracked", "banana", "orange", "apple"],
      this.player.heroSprite,
      this.handleGameOver.bind(this)
    ).createStars(platforms, "alienShip");

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
