import { Math as PhaserMath } from "phaser";

export class Fruits {
  constructor(scene, possibleDrops, hero, createEnemy) {
    this.scene = scene;
    this.possibleDrops = possibleDrops;
    this.hero = hero;
    this.createEnemy = createEnemy;

    this.score = 0;
    this.scoreText = "";
    this.starsAmount = 12;
    this.stepX = 70;
  }

  createFruits() {
    this.scene.scoreText = this.scene.add
      .text(400, 16, "Score: 0", {
        fontSize: "32px",
        fill: "#000",
      })
      .setOrigin(0.5, 0.5);

    const fruits = this.scene.physics.add.group({
      key: this.getNextTexture(),
      repeat: this.starsAmount - 1,
      setXY: { x: this.starsAmount, y: 0, stepX: this.stepX },
    });

    fruits.children.iterate((child) =>
      child.setBounceY(PhaserMath.FloatBetween(0.4, 0.8))
    );

    const collectFruit = (player, fruit) => {
      this.hero.setLiquidTint(fruit.texture.key);

      fruit.disableBody(true, true);

      this.score += 10;
      this.scene.scoreText.setText("Score: " + this.score);

      const nextTexture = this.getNextTexture();

      if (fruits.countActive(true) === 0) {
        fruits.children.iterate(function (child) {
          child.enableBody(true, child.x, 0, true, true);
          child.setTexture(nextTexture);
        });

        this.createEnemy();
      }
    };

    this.scene.physics.add.overlap(
      this.hero.heroSprite,
      fruits,
      collectFruit,
      null,
      this.scene
    );

    return fruits;
  }

  getNextTexture() {
    return this.possibleDrops[
      Math.floor(Math.random() * this.possibleDrops.length)
    ];
  }
}
