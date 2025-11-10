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
    player.isDashing = false;
    player.dashSpeed = 600;        // velocità durante il dash
    player.dashTime = 200;         // durata del dash in ms
    player.dashCooldown = 200;    // cooldown tra dash in ms
    player.lastDash = 0;

    player.body.setGravityY(player.gravityDown);

    return player;
};

PP.entities.player.update = function(scene, player, keys) {
    const speed = 200;
    let movingLeft = keys.A.isDown || keys.LEFT.isDown;
    let movingRight = keys.D.isDown || keys.RIGHT.isDown;

    // Dash
    if (Phaser.Input.Keyboard.JustDown(keys.SHIFT) && !player.isDashing && (scene.time.now - player.lastDash > player.dashCooldown)) {
        // attiva dash
        player.isDashing = true;
        player.lastDash = scene.time.now;

        // determina direzione
        let dir = 0;
        if (keys.A.isDown || keys.LEFT.isDown) {
            dir = -1;
        } else if (keys.D.isDown || keys.RIGHT.isDown) {
            dir = +1;
        } else {
            // se non si muove orizzontalmente, dash verso il fronte (esempio: destra)
            dir = player.body.velocity.x >= 0 ? +1 : -1;
        }
        player.body.setVelocityX(dir * player.dashSpeed);
    }

    // Durante il dash: controllo durata
    if (player.isDashing) {
        if (scene.time.now - player.lastDash > player.dashTime) {
            // termina dash
            player.isDashing = false;
        } else {
            return; // esci da update prima che la logica normale del movimento orizzontale prenda il sopravvento
        }
    }

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

