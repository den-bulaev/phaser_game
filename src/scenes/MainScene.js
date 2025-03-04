import { Scene, Math } from "phaser";

import { Hero } from "../classes/Hero";
import { Fruits } from "../classes/Fruits";
import { Enemies } from "../classes/Enemies";

import alienShip from "../assets/alienShipBig.png";
import platform from "../assets/platform.png";
import sky from "../assets/skyWithMountain.png";
import watermelon from "../assets/cracked_watermelon.png";
import banana from "../assets/banana.png";
import orange from "../assets/orange.png";
import apple from "../assets/apple.png";
import grapes from "../assets/grapes.png";
import pear from "../assets/pear.png";
import blender from "../assets/blender.png";
import fruitShield from "../assets/fruit_shield.png";
import liquidSprite from "../assets/liquidSprite.png";

export class MainScene extends Scene {
  constructor() {
    super("Main");

    this.player = null;
    this.fruitShield = null;
    this.enemies = null;
    this.liquid = null;
    this.fruits = null;
    this.playBtn = null;
    this.gameOverText = "";
    this.restartBtn = null;
    this.possibleDrops = {
      watermelon: 0xf74a6c,
      banana: 0xf7ef04,
      apple: 0x8aff59,
      orange: 0xf78e04,
      grapes: 0x8880fc,
      pear: 0xccff96,
    };
  }

  preload() {
    this.load.image("alienShip", alienShip);
    this.load.image("platform", platform);
    this.load.image("sky", sky);
    this.load.image("watermelon", watermelon);
    this.load.image("banana", banana);
    this.load.image("orange", orange);
    this.load.image("apple", apple);
    this.load.image("grapes", grapes);
    this.load.image("pear", pear);
    this.load.image("fruitShield", fruitShield);
    this.load.spritesheet("blender", blender, {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.load.spritesheet("liquid", liquidSprite, {
      frameWidth: 18,
      frameHeight: 19,
    });
  }

  create() {
    this.input.keyboard.on("keydown-SPACE", () => {
      if (this.player.isEmpty) {
        return;
      }

      const fruitShield = this.physics.add.image(
        this.player.heroSprite.x,
        this.player.heroSprite.y,
        "fruitShield"
      );

      if (this.player.liquidColor) {
        fruitShield.setTintFill(this.player.liquidColor);
      }

      if (this.player.direction === "left") {
        fruitShield.flipX = true;
      }

      fruitShield.body.setAllowGravity(false);
      fruitShield.setVelocityX(this.player.direction === "left" ? -300 : 300);
      fruitShield.setCollideWorldBounds(true);
      fruitShield.body.onWorldBounds = true;

      fruitShield.body.world.on("worldbounds", (body) => {
        if (body.gameObject === fruitShield) {
          fruitShield.setVelocityX(0);
          fruitShield.destroy();
        }
      });

      this.physics.add.collider(
        fruitShield,
        this.enemies.enemies,
        (bullet, enemy) => {
          let direction = new Math.Vector2(
            enemy.x - bullet.x,
            enemy.y - bullet.y
          );
          direction.normalize().scale(300);
          enemy.body.setVelocity(direction.x, direction.y);
          bullet.destroy();
        }
      );
    });

    this.add.image(400, 300, "sky");

    // Platforms
    const platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, "platform").setScale(2).refreshBody();
    platforms.create(600, 400, "platform");
    platforms.create(50, 250, "platform");
    platforms.create(750, 220, "platform");

    // Player
    this.player = new Hero(this, 100, 450, "blender", this.possibleDrops);
    this.physics.add.collider(this.player.heroSprite, platforms);

    // Enemies
    this.enemies = new Enemies(this, this.handleGameOver);

    // Fruits
    this.fruits = new Fruits(
      this,
      Object.keys(this.possibleDrops),
      this.player,
      () =>
        this.enemies.createEnemies(
          platforms,
          this.player.heroSprite,
          "alienShip"
        )
    ).createFruits();

    this.physics.add.collider(this.fruits, platforms);

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
