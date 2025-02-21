import { Math } from "phaser";
import { Bombs } from "./Bombs";

export class Stars {
  constructor(scene, starsAmount, starTexture, stepX, hero, handleGameOver) {
    this.scene = scene;
    this.starsAmount = starsAmount;
    this.starTexture = starTexture;
    this.stepX = stepX;
    this.hero = hero;
    this.handleGameOver = handleGameOver;

    this.score = 0;
    this.scoreText = "";
  }

  createStars(platforms, bombTexture) {
    this.scene.scoreText = this.scene.add
      .text(400, 16, "Score: 0", {
        fontSize: "32px",
        fill: "#000",
      })
      .setOrigin(0.5, 0.5);

    const stars = this.scene.physics.add.group({
      key: this.starTexture,
      repeat: this.starsAmount - 1,
      setXY: { x: this.starsAmount, y: 0, stepX: this.stepX },
    });

    stars.children.iterate((child) =>
      child.setBounceY(Math.FloatBetween(0.4, 0.8))
    );

    const collectStar = (player, star) => {
      star.disableBody(true, true);

      this.score += 10;
      this.scene.scoreText.setText("Score: " + this.score);

      if (stars.countActive(true) === 0) {
        stars.children.iterate(function (child) {
          child.enableBody(true, child.x, 0, true, true);
        });

        const bombs = new Bombs(this.scene, this.handleGameOver);
        bombs.createBombs(platforms, player, bombTexture);
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
}
