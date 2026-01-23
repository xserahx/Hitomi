PP.entities = PP.entities || {};
PP.entities.player = {};

PP.entities.player.preload = function (scene) {
    PP.entities.player.img = PP.assets.sprite.load_spritesheet(scene, "assets/images/player/s_bimbo/spritesheet.png", 90, 120);
}

PP.entities.player.create = function (scene, x, y) {
  const player = PP.assets.sprite.add(scene, PP.entities.player.img, x, y, 0.5, 0.5);
  PP.physics.add(scene, player, PP.physics.type.DYNAMIC);
  PP.physics.set_collision_rectangle(player,40,120,22.5,0);
  
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

  // === CUTSCENES ===
    player.inCutscene = false;

  PP.physics.set_acceleration_y(player, player.gravityDown);

  // === ANIMAZIONI ===
  PP.assets.sprite.animation_add(player, "camminata", 0, 7, 10, -1);
  player.isWalkingAnim = false;

  PP.assets.sprite.animation_add(player, "idle", 8, 12, 10, -1);
  player.isIdleAnim = false;

  PP.assets.sprite.animation_add(player, "attacco", 16, 21, 10, 0);
  player.isAttackingAnim = false;

  if (PP.game_state.isPLayerFlipped == true){player.geometry.flip_x = true;}

  return player;
};

PP.entities.player.update = function (scene, player) {
  if(PP.game_state.bossIsDead == true || PP.game_state.duringBossCutscene == true || PP.game_state.pause == true){
    player.inCutscene = true;
  }else{player.inCutscene = false;}
  
  if (player.lives == 0 || player.inCutscene == true) {
    player.isInvincible == true;
    PP.physics.set_velocity_x(player, 0);
    return;
  }

  let speed = 200; 
  let movingLeft = PP.interactive.kb.is_key_down(scene, PP.key_codes.A) || PP.interactive.kb.is_key_down(scene, PP.key_codes.LEFT);
  let movingRight = PP.interactive.kb.is_key_down(scene, PP.key_codes.D) || PP.interactive.kb.is_key_down(scene, PP.key_codes.RIGHT);
  
  if(PP.game_state.has_baby == true){
    speed = 200;
    player.dashSpeed = 400;
  }

  config.player_x = player.geometry.body_x;
  config.player_y = player.geometry.body_y;

  // === DEV MODE ===
  if (PP.interactive.kb.is_key_down(scene, PP.key_codes.P) && PP.game_state.DevMode == false) {
    let Advertisment = PP.shapes.text_add(scene, player.geometry.body_x, player.geometry.body_y - 200, "PLAYER IS NOW IN DEV MODE");
    PP.game_state.DevMode = true;
  }else if (PP.interactive.kb.is_key_down(scene, PP.key_codes.O) && PP.game_state.DevMode == true) {
    let Advertisment = PP.shapes.text_add(scene, player.geometry.body_x, player.geometry.body_y - 200, "PLAYER IS NOT IN DEV MODE ANYMORE");
    PP.game_state.DevMode = false;
  }

  // === DASH ===
  if (
    PP.interactive.kb.is_key_down(scene, PP.key_codes.SHIFT) && player.inCutscene == false &&
    !player.isDashing &&
    PP.timers.getTime(scene) - player.lastDash > player.dashCooldown
  ) {
    player.isDashing = true;
    player.lastDash = PP.timers.getTime(scene);

    PP.physics.change_gravity(scene, 200);
    let dir = player.geometry.flip_x ? -1 : 1;
    PP.physics.set_velocity_x(player, dir * player.dashSpeed);
  }

  if (player.isDashing) {
    if (PP.timers.getTime(scene) - player.lastDash > player.dashTime) {
      player.isDashing = false;
    } else {
      return;
    }
  }


  // === MOVIMENTO ORIZZONTALE ===
  if (!player.isKnocked && !player.isAttacking) {
    if (movingLeft && !movingRight) {
      player.geometry.flip_x = true;
      PP.game_state.isPLayerFlipped = true;
      PP.physics.set_velocity_x(player, -speed);
      if (!player.isWalkingAnim) {
        PP.assets.sprite.animation_play(player, "camminata");
        player.isWalkingAnim = true;
      }
    }
    else if (movingRight && !movingLeft && player.inCutscene == false) {
      player.geometry.flip_x = false;
      PP.game_state.isPLayerFlipped = false;
      PP.physics.set_velocity_x(player, speed);
      if (!player.isWalkingAnim) {
        PP.assets.sprite.animation_play(player, "camminata");
        player.isWalkingAnim = true;
      }
    }
    else{
      PP.physics.set_velocity_x(player, 0);
      if (player.isWalkingAnim) {
        PP.assets.sprite.animation_play(player, "idle");
        player.isWalkingAnim = false;
      }
    }
  }

  if(PP.game_state.pause == true){ 
    console.log("Pausing player movement and animation");
      PP.physics.set_velocity_x(player, 0);
      PP.assets.sprite.animation_stop(player);
    }

  // === COYOTE TIME SALTO===
  if (player.ph_obj.body.blocked.down) { 
  // uso player.ph_obj perché la proprietà body.blocked.down non appartiene a Poliphaser e dunque per farla leggere a Phaser occorre aggiungerlo in quanto è come se player è wrappato in Poliphaser
    player.canJump = true;
    player.lastGrounded = PP.timers.getTime(scene);
  } else if (scene.time.now - player.lastGrounded > player.coyoteTime) {
    player.canJump = false;
  }

  // === SALTO ===
  if (PP.interactive.kb.is_key_down(scene, PP.key_codes.SPACE) && player.canJump && player.inCutscene == false) {
    PP.physics.set_velocity_y(player, player.jumpForce);
    player.jumpPressedTime = PP.timers.getTime(scene);
    player.canJump = false;
  }

  if (PP.interactive.kb.is_key_down(scene, PP.key_codes.SPACE) && player.inCutscene == false && PP.timers.getTime(scene) - player.jumpPressedTime < player.jumpHoldTime)
    PP.physics.set_acceleration_y(player, player.gravityUp);
  else PP.physics.set_acceleration_y(player, player.gravityDown);

  if (PP.interactive.kb.is_key_up(scene, PP.key_codes.SPACE) && PP.physics.get_velocity_y(player) < 0)
    {PP.physics.set_velocity_y(player, PP.physics.get_velocity_y(player) / player.jumpCutMultiplier);}
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
  PP.timers.add_timer(scene, 400, () => {
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
