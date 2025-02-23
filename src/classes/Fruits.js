import { Math as PhaserMath } from "phaser";
import { Enemies } from "./Enemies";

export class Fruits {
  constructor(scene, possibleDrops, hero, handleGameOver) {
    this.scene = scene;
    this.possibleDrops = possibleDrops;
    this.hero = hero;
    this.handleGameOver = handleGameOver;

    this.score = 0;
    this.scoreText = "";
    this.starsAmount = 12;
    this.stepX = 70;
  }

  createStars(platforms, bombTexture) {
    this.scene.scoreText = this.scene.add
      .text(400, 16, "Score: 0", {
        fontSize: "32px",
        fill: "#000",
      })
      .setOrigin(0.5, 0.5);

    const stars = this.scene.physics.add.group({
      key: this.getNextTexture(),
      repeat: this.starsAmount - 1,
      setXY: { x: this.starsAmount, y: 0, stepX: this.stepX },
    });

    stars.children.iterate((child) =>
      child.setBounceY(PhaserMath.FloatBetween(0.4, 0.8))
    );

    const collectStar = (player, star) => {
      star.disableBody(true, true);

      this.score += 10;
      this.scene.scoreText.setText("Score: " + this.score);

      const nextTexture = this.getNextTexture();

      if (stars.countActive(true) === 0) {
        stars.children.iterate(function (child) {
          child.enableBody(true, child.x, 0, true, true);
          child.setTexture(nextTexture);
        });

        const enemies = new Enemies(this.scene, this.handleGameOver);
        enemies.createBombs(platforms, player, bombTexture);
      }
    };

    this.scene.physics.add.overlap(
      this.hero,
      stars,
      collectStar,
      null,
      this.scene
    );

    return stars;
  }

  getNextTexture() {
    return this.possibleDrops[
      Math.floor(Math.random() * this.possibleDrops.length)
    ];
  }
}
