import { Input } from "phaser";

export class Hero {
  constructor(scene, x, y, texture, possibleDrops) {
    this.scene = scene;
    this.texture = texture;
    this.liquid = this.scene.physics.add.sprite(x, y, "liquid");
    this.heroSprite = this.scene.physics.add.sprite(x, y, texture);
    this.heroSprite.setBounce(0.2);
    this.heroSprite.setCollideWorldBounds(true);
    this.speed = 200;
    this.possibleDrops = possibleDrops;
    this.direction = "right";
    this.liquidColor = "";
    this.isEmpty = true;
    this.#createAnimations();
  }

  #createAnimations() {
    this.liquid.body.setAllowGravity(false);
    this.liquid.visible = false;

    this.scene.events.on("postupdate", () => {
      this.liquid.x = this.heroSprite.x;
      this.liquid.y = this.heroSprite.y;
    });

    if (!this.scene.anims.exists("liquid")) {
      this.scene.anims.create({
        key: "liquid",
        frames: this.scene.anims.generateFrameNumbers("liquid", {
          start: 0,
          end: 19,
        }),
        frameRate: 10,
        repeat: -1,
      });
    }

    this.liquid.play("liquid");

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
    const keyS = this.scene.input.keyboard.addKey(Input.Keyboard.KeyCodes.S);

    if (cursors.left.isDown || keyA.isDown) {
      this.direction = "left";
      this.heroSprite.setVelocityX(-160);
      this.heroSprite.anims.play(
        this.heroSprite.body.touching.down ? "left" : "jumpLeft",
        true
      );
    } else if (cursors.right.isDown || keyD.isDown) {
      this.direction = "right";
      this.heroSprite.setVelocityX(160);
      this.heroSprite.anims.play(
        this.heroSprite.body.touching.down ? "right" : "jumpRight",
        true
      );
    } else {
      this.heroSprite.setVelocityX(
        (cursors.down.isDown || keyS.isDown) &&
          !this.heroSprite.body.touching.down
          ? -15
          : 0
      );
      this.heroSprite.anims.play("turn");
    }

    if (
      (cursors.up.isDown || keyW.isDown) &&
      this.heroSprite.body.touching.down
    ) {
      this.heroSprite.setVelocityY(-330);
    }

    if (
      (cursors.down.isDown || keyS.isDown) &&
      !this.heroSprite.body.touching.down
    ) {
      this.heroSprite.setGravity(900);
    } else {
      this.heroSprite.setGravity(0);
    }
  }

  setLiquidTint(color) {
    this.liquidColor = this.possibleDrops[color];
    this.liquid.setTintFill(this.possibleDrops[color]);
    this.liquid.visible = true;
    this.isEmpty = false;
  }
}
