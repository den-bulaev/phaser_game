import { Math } from "phaser";

export class Enemies {
  constructor(scene, handleGameOver) {
    this.scene = scene;
    this.enemies = this.scene.physics.add.group();
    this.handleGameOver = handleGameOver;
  }

  createEnemiesPhysic(platforms, hero) {
    this.scene.physics.add.collider(this.enemies, platforms);
    this.scene.physics.add.collider(
      hero,
      this.enemies,
      this.hitEnemy,
      null,
      this.scene
    );
  }

  createEnemies(platforms, hero, texture) {
    this.createEnemiesPhysic(platforms, hero);

    const x = hero.x < 400 ? Math.Between(400, 800) : Math.Between(0, 400);
    const enemy = this.enemies.create(x, 16, texture);
    enemy.setBounce(1);
    enemy.setCollideWorldBounds(true);
    enemy.setVelocity(Math.Between(-200, 200), 20);
  }

  // eslint-disable-next-line no-unused-vars
  hitEnemy(player, enemy) {
    this.physics.pause();
    player.setTint(0xff0000);
    player.anims.play("turn");

    this.handleGameOver();
  }
}
