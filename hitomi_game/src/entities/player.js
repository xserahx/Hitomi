// src/entities/player.js
PP.entities = PP.entities || {};
PP.entities.player = {};

PP.entities.player.create = function(scene, x, y) {
    const player = scene.add.rectangle(x, y, 40, 60, 0xFFFF00);
    scene.physics.add.existing(player);
    player.body.setCollideWorldBounds(true);

    // Parametri salto realistico ma più alto
    player.jumpPressedTime = 0;
    player.canJump = false;
    player.coyoteTime = 150;       // ms
    player.jumpHoldTime = 400;     // aumento durata salto
    player.jumpForce = -650;       // aumento forza salto
    player.gravityUp = 600;        // salita morbida
    player.gravityDown = 1200;     // discesa più veloce
    player.jumpCutMultiplier = 2.5;
    player.lastGrounded = 0;

    player.body.setGravityY(player.gravityDown);

    return player;
};

PP.entities.player.update = function(scene, player, keys) {
    const speed = 200; 
    let movingLeft = keys.A.isDown || keys.LEFT.isDown;
    let movingRight = keys.D.isDown || keys.RIGHT.isDown;

    // Movimento orizzontale
    if (movingLeft && !movingRight) {
        player.body.setVelocityX(-speed);
    } else if (movingRight && !movingLeft) {
        player.body.setVelocityX(speed);
    } else {
        player.body.setVelocityX(0);
    }

    // Coyote time
    if (player.body.blocked.down) {
        player.canJump = true;
        player.lastGrounded = scene.time.now;
    } else if (scene.time.now - player.lastGrounded > player.coyoteTime) {
        player.canJump = false;
    }

    // Inizio salto
    if (Phaser.Input.Keyboard.JustDown(keys.SPACE) && player.canJump) {
        player.body.setVelocityY(player.jumpForce);
        player.jumpPressedTime = scene.time.now;
        player.canJump = false;
    }

    // Salto variabile
    if (keys.SPACE.isDown && (scene.time.now - player.jumpPressedTime < player.jumpHoldTime)) {
        player.body.setGravityY(player.gravityUp);
    } else {
        player.body.setGravityY(player.gravityDown);
    }

    // Early release
    if (Phaser.Input.Keyboard.JustUp(keys.SPACE) && player.body.velocity.y < 0) {
        player.body.setVelocityY(player.body.velocity.y / player.jumpCutMultiplier);
    }
};
