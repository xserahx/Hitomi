PP.entities = PP.entities || {};
PP.entities.player = {};

PP.entities.player.create = function (scene, x, y) {
  const player = PP.shapes.rectangle_add(scene, x, y, 80, 120, "0xFFFF00", 1);
  PP.physics.add(scene, player, PP.physics.type.DYNAMIC);

  // === STATI VITA ===
  player.maxLives = 3;
  player.lives = 3;
  player.isInvincible = false;
  player.isKnocked = false;

  // Parametri salto e movimento
  player.jumpPressedTime = 0;
  player.canJump = false;
  player.coyoteTime = 150;
  player.jumpHoldTime = 400;
  player.jumpForce = -650;
  player.gravityUp = 600;
  player.gravityDown = 1200;
  player.jumpCutMultiplier = 2.5;
  player.lastGrounded = 0;
  player.isDashing = false;
  player.dashSpeed = 900; //600 ORIGINALE
  player.dashTime = 200;
  player.dashCooldown = 400;
  player.lastDash = 0;

  // === ATTACCO ===
  player.isAttacking = false;
  player.lastDirection = 1;

  PP.physics.set_acceleration_y(player, player.gravityDown);

  return player;
};

PP.entities.player.update = function (scene, player) {
  const speed = 400; //200 ORIGINALE
  let movingLeft = PP.interactive.kb.is_key_down(scene, PP.key_codes.A) || PP.interactive.kb.is_key_down(scene, PP.key_codes.LEFT);
  let movingRight = PP.interactive.kb.is_key_down(scene, PP.key_codes.D) || PP.interactive.kb.is_key_down(scene, PP.key_codes.RIGHT);

  config.player_x = player.geometry.body_x;
  // === DASH ===
  if (
    PP.interactive.kb.is_key_down(scene, PP.key_codes.SHIFT) &&
    !player.isDashing &&
    PP.timers.getTime(scene) - player.lastDash > player.dashCooldown
  ) {
    player.isDashing = true;
    player.lastDash = PP.timers.getTime(scene);

    PP.physics.set_velocity_x(player, player.lastDirection * player.dashSpeed);
  }

  if (player.isDashing) {
    if (PP.timers.getTime(scene) - player.lastDash > player.dashTime) {
      player.isDashing = false;
    } else {
      return;
    }
  }

  // === MOVIMENTO ORIZZONTALE ===
  if (!player.isKnocked) {
    if (movingLeft && !movingRight) {
      player.lastDirection = -1;
      PP.physics.set_velocity_x(player, -speed);
    }
    else if (movingRight && !movingLeft) {
      player.lastDirection = 1;
      PP.physics.set_velocity_x(player, speed);
    }
    else PP.physics.set_velocity_x(player, 0);
  }

  // === COYOTE TIME SALTO===
  if (player.ph_obj.body.blocked.down) { //uso player.ph_obj perché la proprietà body.blocked.donw non appartiene a Poliphazer e dunque per farla leggere a Phazer occorre aggiungerlo in quanto è come se player è wrappato in Poliphazer
    player.canJump = true;
    player.lastGrounded = PP.timers.getTime(scene);
  } else if (scene.time.now - player.lastGrounded > player.coyoteTime) {
    player.canJump = false;
  }

  // === SALTO ===
  if (PP.interactive.kb.is_key_down(scene, PP.key_codes.SPACE) && player.canJump) {
    PP.physics.set_velocity_y(player, player.jumpForce);
    player.jumpPressedTime = PP.timers.getTime(scene);
    player.canJump = false;
  }

  if (PP.interactive.kb.is_key_down(scene, PP.key_codes.SPACE) && PP.timers.getTime(scene) - player.jumpPressedTime < player.jumpHoldTime)
    PP.physics.set_acceleration_y(player, player.gravityUp);
  else PP.physics.set_acceleration_y(player, player.gravityDown);

  if (PP.interactive.kb.is_key_up(scene, PP.key_codes.SPACE) && PP.physics.get_velocity_y(player) < 0)
    PP.physics.set_velocity_y(player, PP.physics.get_velocity_y(player) / player.jumpCutMultiplier);
};

// === FUNZIONE DI ATTACCO ===
PP.entities.player.attack = function (scene, player, enemies) {
  if (player.isAttacking) return; // evita spam
  //Per evitare bug
  if (player.isDashing == true || player.isAttacking == true) return;

  player.isAttacking = true;

  const hitbox = PP.shapes.rectangle_add(scene, player.geometry.body_x + 50 * player.lastDirection, player.geometry.body_y +70, 100, 100, "0xABCDEF", 1);
  PP.physics.add(scene, hitbox, PP.physics.type.STATIC);

  if (Array.isArray(enemies)) {
    for (let enemy of enemies) {
      PP.physics.add_overlap_f(scene, hitbox, enemy, () => {
        PP.entities.enemy.damage(scene, enemy, hitbox);
      });
    }
  } else {
    PP.physics.add_overlap_f(scene, hitbox, enemies, () => {
      PP.entities.boss.damage(scene, enemies, hitbox);
    });
  }

  PP.timers.add_timer(scene, 100, (s) => {
    PP.shapes.destroy(hitbox);
  }, false);

  PP.timers.add_timer(scene, 400, (s) => {
    player.isAttacking = false;
  }, false);
}

// === FUNZIONE DI DANNO ===
PP.entities.player.damage = function (scene, player, enemy) {
  if (player.isInvincible) return;

  player.lives -= 1;
  player.isInvincible = true;

  // === LAMPEGGIO ROSSO ===
  player.isFlashing = true;
  let flashCount = 0;
  const originalColor = player.ph_obj.fillColor; //Non esiste una funzione di poliphazer per zambiare colore

  PP.timers.add_timer(scene, 100, (s) => {
    if (!player.isFlashing) return;

    player.ph_obj.fillColor = flashCount % 2 === 0 ? 0xff0000 : originalColor; //Non esiste una funzione di poliphazer per zambiare colore
    flashCount++;

    if (flashCount >= player.maxLives) {
      player.isFlashing = false;
      player.ph_obj.fillColor = originalColor; //Non esiste una funzione di poliphazer per zambiare colore
      flashCount = 0;
    }
  }, true);

  // === KNOCKBACK ===
  player.isKnocked = true;
  const knockbackX = 600;
  const knockbackY = -300;
  const dirX = (player.geometry.body_x < enemy.geometry.body_x) ? -1 : 1; //Non c'è modo di avere la x del player

  PP.physics.set_velocity_x(player, knockbackX * dirX);
  PP.physics.set_velocity_y(player, knockbackY);

  PP.timers.add_timer(scene, 200, (s) => {
    player.isKnocked = false;
  }, false);

  // === INVINCIBILITÀ TEMPORANEA ===
  PP.timers.add_timer(scene, 1500, (s) => {
    player.isInvincible = false;
    player.fillColor = originalColor;
  }, false);


  // === GAME OVER ===
  if (player.lives <= 0) {
    scene.cameras.main.shake(300, 0.01);
    scene.time.delayedCall(300, () => {
      scene.scene.restart();
      player.lives = player.maxLives;
    });
  }
}

// === RACCOLTA BAMBINO ===
PP.entities.player.get_baby = function (scene, player) {
  player.has_baby = true;
  console.log("Player has baby:", player.has_baby);
}