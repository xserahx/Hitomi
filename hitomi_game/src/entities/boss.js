PP.entities = PP.entities || {};
PP.entities.boss = {};

// === PRELOAD ===
PP.entities.boss.preload = function (scene) {
  PP.entities.boss.img_samurai = PP.assets.sprite.load_spritesheet(scene, "assets/images/mob/spritesheet_samurai.png", 204, 201);
};

// === CREAZIONE BOSS ===
PP.entities.boss.create = function (scene, positions) {
  const img_samurai = PP.entities.boss.img_samurai;
  const boss = PP.assets.sprite.add(scene, img_samurai, 1150, 890, 0.5, 0.5);
  PP.physics.add(scene, boss, PP.physics.type.DYNAMIC);
  PP.physics.set_collision_rectangle(boss, 68, 200, 90, 0);

  boss.state = "idle"; // idle | walk | attack | dead | dash
  boss.state_check = "idle";

  boss.speed = 200;
  boss.detectionRange = 1280;
  boss.deadZone = 5;
  boss.walkzone = 400;
  boss.walkSpeed = 500;
  boss.geometry.flip_x = true;
  boss.direction = -1;
  boss.maxLives = 10;
  boss.lives = 3;

  PP.assets.sprite.animation_add(boss, "idle", 13, 15, 3, -1);
  PP.assets.sprite.animation_add(boss, "walk", 6, 12, 10, -1);
  PP.assets.sprite.animation_add_list(boss, "attack", [0, 1, 1, 1, 2, 2, 2, 3, 4, 5, 5,5,5, 4, 3, 2, 1, 0], 15, 0);
  PP.assets.sprite.animation_add(boss, "dash", 6, 12, 15, -1);
  PP.assets.sprite.animation_add(boss, "dying", 16, 24, 4.5, 0);
  PP.assets.sprite.animation_add(boss, "dead", 23, 29, 4.5, -1);

  boss.isAttacking = false;
  boss.inCutscene = false;

  const bossground = PP.shapes.rectangle_add(scene, 640, 1010, 1280, 40, "0x000000", 0);
  PP.physics.add(scene, bossground, PP.physics.type.STATIC);
  PP.physics.add_collider_f(scene, boss, bossground, () => {
    if (boss.state_check !== boss.state && PP.game_state.pause == false) {
      PP.assets.sprite.animation_play(boss, boss.state, true);
      boss.state_check = boss.state;
    }else if(PP.game_state.pause == true){
      PP.assets.sprite.animation_stop(boss);
    }
  });

  return boss;
};

// === UPDATE BOSS ===
PP.entities.boss.update = function (scene, boss, player) {
  // === CALCOLO DELLA DISTANZA DAL PLAYER ===
  const dx = player.geometry.x - boss.geometry.x;
  const distance = Math.abs(dx);

  // === GESTIONE CUTSCENE E RESET ===
  if (PP.game_state.bossIsDead == true || PP.game_state.duringBossCutscene == true || PP.game_state.pause == true) {
    boss.inCutscene = true;
  } else { boss.inCutscene = false; }

  if (PP.game_state.reset == true) {
    boss.lives = boss.maxLives;
    PP.game_state.reset = false;
  }


  // === MORTE DEL BOSS ===
  //Quando il boss muore, si avvicina alla aprte sinistra dello schermo e diventa amichevole
  if (PP.game_state.bossIsDead == true) {

    if (boss.geometry.body_x > 120) {
      boss.geometry.flip_x = true;
      PP.physics.set_velocity_x(boss, -50);
      boss.state = "walk";
    } else {
      PP.physics.set_velocity_x(boss, 0);
      boss.state = "dying";
      boss.geometry.flip_x = false;
      PP.game_state.bossIsDead = false;
      PP.game_state.bossIsFriendly = true;

      PP.timers.add_timer(scene, 900, () => {
        boss.state = "dead";
      }, false);
    }
    return;
  }

  // === DIREZIONE DEL BOSS ===
  if (PP.game_state.bossIsDead == false && boss.state !== "idle" && boss.isAttacking == false) {
    // se sconfitto, non guarda il player
    if (dx > 0) {
      boss.geometry.flip_x = false; // guarda a destra verso il player
      if(boss.geometry.flip_x == false) {PP.physics.set_collision_rectangle(boss, 68, 200, 55, 0);}
      boss.direction = 1;
    } else {
      boss.geometry.flip_x = true;  // guarda a sinistra verso il player
      boss.direction = -1;
      if(boss.geometry.flip_x == true) {PP.physics.set_collision_rectangle(boss, 68, 200, 90, 0);}  
    }
  }

  // === MOVIMENTO VERSO IL PLAYER ===
  if (distance < boss.detectionRange && PP.game_state.bossIsFriendly == false) {

    if (dx > boss.deadZone && boss.lives > 0 && boss.isAttacking == false && boss.inCutscene == false) {
      if (dx < boss.walkzone) {
        PP.physics.set_velocity_x(boss, boss.speed);
        boss.state = "walk";
      }
      else {
        PP.physics.set_velocity_x(boss, boss.walkSpeed);
        boss.state = "dash";
      }
      boss.direction = 1;
    } else if (dx < -boss.deadZone && boss.lives > 0 && boss.isAttacking == false && boss.inCutscene == false) {
      if (dx > -boss.walkzone) {
        PP.physics.set_velocity_x(boss, -boss.speed);
        boss.state = "walk";
      }
      else {
        PP.physics.set_velocity_x(boss, -boss.walkSpeed);
        boss.state = "dash";
      }
      boss.direction = -1;
    } else {
      PP.physics.set_velocity_x(boss, 0);
    }
  }

  // === TRIGGER DI ATTACCO ===
  if (dx < 100 && dx > -100 && boss.inCutscene == false && PP.game_state.bossIsFriendly == false && boss.isAttacking == false) {
    PP.entities.boss.attack(scene, boss, player);
  }
};



// === FUNZIONE DI ATTACCO ===
PP.entities.boss.attack = function (scene, boss, player) {
  if (boss.isWalking || boss.isAttacking || boss.inCutscene || PP.game_state.bossIsFriendly) return;

  boss.isAttacking = true;
  boss.state = "attack";

  PP.timers.add_timer(scene, 1500, () => {
    boss.isAttacking = false;
    boss.state = "idle";
  }, false);

  let dir = boss.direction;
  PP.assets.sprite.animation_play(boss, "attack", false);

  let warning = PP.shapes.rectangle_add(scene, boss.geometry.x + 50 * dir, boss.geometry.y - 25, 125, 80, "0xFF0000", 0.3);
  let hitbox;

  PP.timers.add_timer(scene, 500, () => {
    PP.assets.destroy(warning);

    hitbox = PP.shapes.rectangle_add(scene, boss.geometry.x + 50 * dir, boss.geometry.y - 25, 125, 80, "0xABCDEF", 0);
    PP.physics.add(scene, hitbox, PP.physics.type.STATIC);

    PP.physics.add_overlap_f(scene, hitbox, player, () => {
      PP.entities.player.damage(scene, PP.game_state.player, hitbox);
    });

    PP.timers.add_timer(scene, 450, () => {
      PP.shapes.destroy(hitbox);
    }, false);
  }, false);
};

// === FUNZIONE DI DANNO ===
PP.entities.boss.damage = function (scene, boss, hitbox) {
  if (boss.isInvincible || boss.inCutscene == true) return;

  boss.lives -= 1;
  console.log("vite boss: " + boss.lives);
  boss.isInvincible = true;

  // === INVINCIBILITÀ TEMPORANEA ===
  PP.timers.add_timer(scene, 1500, (s) => {
    boss.isInvincible = false;
  }, false);

  if (boss.lives <= 0) {
    PP.game_state.bossIsDead = true;
    boss.isAttacking = false;
  }

  // === ANIMAZIONI BOSS ===
  const mv = boss.geometry.body_velocity_x;  // mv = movimento orizzontale

  if (boss.state === "attack") {
    PP.assets.sprite.animation_play(boss, "attack", true);
  }
  else if (boss.state === "dead") {
    PP.assets.sprite.animation_play(boss, "idle", true);
  }
  else if (Math.abs(mv) > 5) {
    boss.state = "walk";
    PP.assets.sprite.animation_play(boss, "walk", true);
  }
  else {
    boss.state = "idle";
    PP.assets.sprite.animation_play(boss, "idle", true);
  }

};  