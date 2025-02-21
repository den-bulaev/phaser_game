import { Math } from "phaser";

export class Bombs {
  constructor(scene, handleGameOver) {
    this.scene = scene;
    this.bombs = this.scene.physics.add.group();
    this.handleGameOver = handleGameOver;
  }

  createBombsPhysic(platforms, hero) {
    this.scene.physics.add.collider(this.bombs, platforms);
    this.scene.physics.add.collider(
      hero,
      this.bombs,
      this.hitBomb,
      null,
      this.scene
    );
  }

  createBombs(platforms, hero, texture) {
    this.createBombsPhysic(platforms, hero);

    const x = hero.x < 400 ? Math.Between(400, 800) : Math.Between(0, 400);
    const bomb = this.bombs.create(x, 16, texture);
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Math.Between(-200, 200), 20);
  }

  // eslint-disable-next-line no-unused-vars
  hitBomb(player, bomb) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play("turn");

    this.handleGameOver();
  }
}
