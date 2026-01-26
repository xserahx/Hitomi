PP.entities = PP.entities || {};
PP.entities.player = {};

PP.entities.player.preload = function (scene) {
    PP.entities.player.img = PP.assets.sprite.load_spritesheet(scene, "assets/images/player/spritesheet_bambino.png", 120, 120);
}

PP.entities.player.create = function (scene, x, y) {
  const player = PP.assets.sprite.add(scene, PP.entities.player.img, x, y, 0.5, 0.5);
  PP.physics.add(scene, player, PP.physics.type.DYNAMIC);
  PP.physics.set_collision_rectangle(player,40,120,40,0);
  
  // === STATI VITA ===
  player.maxLives = 3;
  if(PP.game_state.changingWorld==false) {
    player.lives = 3;
    PP.game_state.actualLives = 3;
  }else {
    player.lives = PP.game_state.actualLives;
  }
  console.log("VITE INIZIALI " + player.lives);
  player.isInvincible = false;
  player.isKnocked = false;

  // Parametri salto e movimento
  player.jumpPressedTime = 0;
  player.canJump = false;
  player.coyoteTime = 150;
  player.jumpAnticTime = 100;
  player.jumpHoldTime = 400;
  player.jumpForce = -650;
  player.gravityUp = 600;
  player.gravityDown = 1200;
  player.jumpCutMultiplier = 2.5;
  player.jumpState = "ground";   // ground | anticipation | up | down
  player.lastGrounded = 0;
  player.isDashing = false;
  player.dashSpeed = 600;
  player.dashTime = 200;
  player.dashCooldown = 400;
  player.lastDash = 0;

  // === ATTACCO ===
  player.isAttacking = false;

  // === CUTSCENES ===
    player.inCutscene = false;

  PP.physics.set_acceleration_y(player, player.gravityDown);

  // === ANIMAZIONI ===
  PP.assets.sprite.animation_add(player, "camminata", 0, 7, 16, -1);
  player.isWalkingAnim = false;

  PP.assets.sprite.animation_add(player, "idle", 8, 12, 5, -1);
  player.isIdleAnim = false;

  PP.assets.sprite.animation_add(player, "attacco", 16, 21, 20, 0);
  player.isAttackingAnim = false;

  PP.assets.sprite.animation_add(player, "salto_pre", 24, 24, 1, 0);

  PP.assets.sprite.animation_add(player, "salto1", 25, 26, 10, 0);

  PP.assets.sprite.animation_add(player, "salto2", 27, 29, 12, 0);
  if (PP.game_state.isPLayerFlipped == true){player.geometry.flip_x = true;}

  return player;
};

PP.entities.player.update = function (scene, player) {
  // === STATO CUTSCENE / PAUSA / MORTE ===
  player.inCutscene = PP.game_state.bossIsDead || 
                      PP.game_state.duringBossCutscene || 
                      PP.game_state.pause || 
                      PP.game_state.tutorialCutscene;

  if (player.lives === 0 || player.inCutscene) {
    player.isInvincible = true;
    PP.physics.set_velocity_x(player, 0);
    return;
  }

  // === INPUT ===
  const movingLeft  = PP.interactive.kb.is_key_down(scene, PP.key_codes.A) || PP.interactive.kb.is_key_down(scene, PP.key_codes.LEFT);
  const movingRight = PP.interactive.kb.is_key_down(scene, PP.key_codes.D) || PP.interactive.kb.is_key_down(scene, PP.key_codes.RIGHT);
  let speed = 200;
  if (PP.game_state.has_baby) player.dashSpeed = 400;

  // === DEV MODE ===
  if (PP.interactive.kb.is_key_down(scene, PP.key_codes.P) && !PP.game_state.DevMode) {
    PP.shapes.text_add(scene, player.geometry.body_x, player.geometry.body_y - 200, "PLAYER IS NOW IN DEV MODE");
    PP.game_state.DevMode = true;
  } else if (PP.interactive.kb.is_key_down(scene, PP.key_codes.O) && PP.game_state.DevMode) {
    PP.shapes.text_add(scene, player.geometry.body_x, player.geometry.body_y - 200, "PLAYER IS NOT IN DEV MODE ANYMORE");
    PP.game_state.DevMode = false;
  }

  // === DASH ===
  if (PP.interactive.kb.is_key_down(scene, PP.key_codes.SHIFT) && !player.inCutscene &&
      !player.isDashing && PP.timers.getTime(scene) - player.lastDash > player.dashCooldown) {
    player.isDashing = true;
    player.lastDash = PP.timers.getTime(scene);
    PP.physics.change_gravity(scene, 200);
    PP.physics.set_velocity_x(player, (player.geometry.flip_x ? -1 : 1) * player.dashSpeed);
  }

  if (player.isDashing) {
    if (PP.timers.getTime(scene) - player.lastDash > player.dashTime) {
      player.isDashing = false;
    } else return;
  }

  // === MOVIMENTO ORIZZONTALE ===
  if (!player.isKnocked && !player.isAttacking) {
    let velocityX = 0;
    if (movingLeft && !movingRight) velocityX = -speed;
    else if (movingRight && !movingLeft) velocityX = speed;

    PP.physics.set_velocity_x(player, velocityX);

    // flip del player solo se si muove
    if (velocityX < 0) player.geometry.flip_x = true;
    else if (velocityX > 0) player.geometry.flip_x = false;
    PP.game_state.isPLayerFlipped = player.geometry.flip_x;

    if (player.ph_obj.body.blocked.down && !player.isAttacking) {
      if (velocityX === 0) {
        PP.assets.sprite.animation_play(player, "idle");
        player.isWalkingAnim = false;
      } else if (!player.isWalkingAnim) {
        PP.assets.sprite.animation_play(player, "camminata");
        player.isWalkingAnim = true;
      }
    }
  }

  // === PAUSA ===
  if (PP.game_state.pause) {
    PP.physics.set_velocity_x(player, 0);
    PP.assets.sprite.animation_stop(player);
    return;
  }

  // === COYOTE TIME / ATTERAGGIO ===
  if (player.ph_obj.body.blocked.down) {
      player.canJump = true;
      player.lastGrounded = PP.timers.getTime(scene);

      // Resettiamo jumpState se non siamo in anticipazione
      if (player.jumpState !== "anticipation") {
          player.jumpState = "ground"; // <--- questa linea è cruciale
      }
  } else if (PP.timers.getTime(scene) - player.lastGrounded > player.coyoteTime) {
      player.canJump = false;
  }

  // === INPUT → ANTICIPAZIONE SALTO ===
  if (PP.interactive.kb.is_key_down(scene, PP.key_codes.SPACE) &&
      player.canJump && !player.inCutscene && player.jumpState === "ground") {
    player.jumpState = "anticipation";
    player.jumpAnticStart = PP.timers.getTime(scene);
  }

  // === ANTICIPAZIONE → SALTO ===
  if (player.jumpState === "anticipation" &&
      PP.timers.getTime(scene) - player.jumpAnticStart > player.jumpAnticTime) {
    PP.physics.set_velocity_y(player, player.jumpForce);
    player.jumpPressedTime = PP.timers.getTime(scene);
    player.canJump = false;
    player.jumpState = "up";
  }

  // === JUMP HOLD / GRAVITY ===
  if (player.jumpState === "up" &&
      PP.interactive.kb.is_key_down(scene, PP.key_codes.SPACE) &&
      PP.timers.getTime(scene) - player.jumpPressedTime < player.jumpHoldTime) {
    PP.physics.set_acceleration_y(player, player.gravityUp);
  } else {
    PP.physics.set_acceleration_y(player, player.gravityDown);
  }

  // === JUMP CUT ===
  if (PP.interactive.kb.is_key_up(scene, PP.key_codes.SPACE) &&
      PP.physics.get_velocity_y(player) < 0) {
    PP.physics.set_velocity_y(player, PP.physics.get_velocity_y(player) / player.jumpCutMultiplier);
  }

  // === TRANSIZIONE UP → DOWN ===
  if (player.jumpState === "up" && PP.physics.get_velocity_y(player) > 0) player.jumpState = "down";

  // === ANIMAZIONI SALTO / CAMMINATA / IDLE / ATTACCO ===
  if (!player.isAttacking) {
      if (!player.ph_obj.body.blocked.down) {
          // player in aria → animazioni salto
          let jumpAnim = player.jumpState === "anticipation" ? "salto_pre" :
                        player.jumpState === "up" ? "salto1" :
                        player.jumpState === "down" ? "salto2" : null;
          if (jumpAnim && player.currentAnim !== jumpAnim) {
              PP.assets.sprite.animation_play(player, jumpAnim);
              player.currentAnim = jumpAnim;
          }
      } else {
          // player a terra → animazioni camminata/idle
          const velocityX = PP.physics.get_velocity_x(player);
          if (velocityX === 0) {
              if (player.currentAnim !== "idle") {
                  PP.assets.sprite.animation_play(player, "idle");
                  player.currentAnim = "idle";
              }
          } else {
              if (player.currentAnim !== "camminata") {
                  PP.assets.sprite.animation_play(player, "camminata");
                  player.currentAnim = "camminata";
              }
          }
      }
  }
};

// === FUNZIONE DI ATTACCO ===
PP.entities.player.attack = function (scene, player, enemies) {
  if (player.isAttacking || player.inCutscene) return;
  if (player.isDashing) return;

  player.isAttacking = true;
  player.isAttackingAnim = true;

  // --- BLOCCA MOVIMENTO ---
  PP.physics.set_velocity_x(player, 0);

  // --- AVVIA ANIMAZIONE DI ATTACCO ---
  PP.assets.sprite.animation_play(player, "attacco");

  // --- HITBOX ---
  let dir = player.geometry.flip_x ? -1 : 1;
  let hitboxX = player.geometry.body_x + (dir === -1 ? -50 : 80);
  let hitboxY = player.geometry.body_y + 40;

  const hitbox = PP.shapes.rectangle_add(scene, hitboxX, hitboxY, 100, 100, "0xABCDEF", 1);
  PP.physics.add(scene, hitbox, PP.physics.type.STATIC);

  if (Array.isArray(enemies)) {
    enemies.forEach(enemy => {
      PP.physics.add_overlap_f(scene, hitbox, enemy, () => {
        PP.entities.enemy.damage(scene, enemy, hitbox);
      });
    });
  } else {
    PP.physics.add_overlap_f(scene, hitbox, enemies, () => {
      if (!PP.game_state.bossIsFriendly)
        PP.entities.boss.damage(scene, enemies, hitbox);
    });
  }

  // distrugge hitbox
  PP.timers.add_timer(scene, 100, () => {
    PP.shapes.destroy(hitbox);
  }, false);

  // fine attacco
  PP.timers.add_timer(scene, 500, () => {
    player.isAttacking = false;
    player.isAttackingAnim = false;
    PP.assets.sprite.animation_play(player, "idle");
  }, false);
};

// === FUNZIONE DI DANNO ===
PP.entities.player.damage = function (scene, player, enemy) {
  if (player.isInvincible || PP.game_state.DevMode) return;

  player.lives -= 1;
  PP.game_state.actualLives = player.lives;
  console.log("vite attuali " + player.lives);
  player.isInvincible = true;

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
      if (player.inCutscene == false) player.isInvincible = false;
    }, false);


  // === GAME OVER ===
  if (player.lives <= 0) {
    scene.cameras.main.shake(2000, 0.01);
    scene.time.delayedCall(2000, () => {
      player.lives = player.maxLives;
      PP.scenes.start("game_over");
    });
  }
}

// === RACCOLTA BAMBINO ===
PP.entities.player.get_baby = function (scene, player) {
  PP.game_state.has_baby = true;
  console.log("Player has baby:", PP.game_state.has_baby);
}

// === CAMBIO MONDO ===
PP.entities.player.changeWorld = function (scene) {
  console.log("World changing to:", PP.game_state.otherWorld);
  config.player_x = PP.game_state.player.geometry.x;
  config.player_y = PP.game_state.player.geometry.y;
  PP.scenes.start(PP.game_state.otherWorld);
  PP.game_state.changingWorld = true;
}
