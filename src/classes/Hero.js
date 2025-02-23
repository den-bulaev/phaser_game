import { Input } from "phaser";

export class Hero {
  constructor(scene, x, y, texture) {
    this.scene = scene;
    this.texture = texture;
    this.heroSprite = this.scene.physics.add.sprite(x, y, texture);
    this.heroSprite.setBounce(0.2);
    this.heroSprite.setCollideWorldBounds(true);
    this.speed = 200;
    this.createAnimations();
  }

  createAnimations() {
    if (this.scene.anims.exists("left")) {
      return;
    }

    this.scene.anims.create({
      key: "jumpLeft",
      frames: this.scene.anims.generateFrameNumbers(this.texture, {
        start: 3,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "left",
      frames: this.scene.anims.generateFrameNumbers(this.texture, {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: this.keyA,
      frames: this.scene.anims.generateFrameNumbers(this.texture, {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "turn",
      frames: [{ key: this.texture, frame: 4 }],
      frameRate: 20,
    });

    this.scene.anims.create({
      key: "jumpRight",
      frames: this.scene.anims.generateFrameNumbers(this.texture, {
        start: 8,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: "right",
      frames: this.scene.anims.generateFrameNumbers(this.texture, {
        start: 5,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.scene.anims.create({
      key: this.keyD,
      frames: this.scene.anims.generateFrameNumbers(this.texture, {
        start: 5,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  move() {
    const cursors = this.scene.input.keyboard.createCursorKeys();
    const keyD = this.scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.D);
    const keyA = this.scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.A);
    const keyW = this.scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.W);

    // if (
    //   (cursors.left.isDown || keyA.isDown) &&
    //   !this.heroSprite.body.touching.down
    // ) {
    //   this.heroSprite.anims.play("jumpLeft", true);
    // } else if (
    //   (cursors.right.isDown || keyD.isDown) &&
    //   !this.heroSprite.body.touching.down
    // ) {
    //   this.heroSprite.anims.play("jumpRight", true);
    // }

    if (cursors.left.isDown || keyA.isDown) {
      this.heroSprite.setVelocityX(-160);
      this.heroSprite.anims.play(
        this.heroSprite.body.touching.down ? "left" : "jumpLeft",
        true
      );
    } else if (cursors.right.isDown || keyD.isDown) {
      this.heroSprite.setVelocityX(160);
      this.heroSprite.anims.play(
        this.heroSprite.body.touching.down ? "right" : "jumpRight",
        true
      );
    } else {
      this.heroSprite.setVelocityX(0);
      this.heroSprite.anims.play("turn");
    }

    if (
      (cursors.up.isDown || keyW.isDown) &&
      this.heroSprite.body.touching.down
    ) {
      this.heroSprite.setVelocityY(-330);
    }
  }
}
