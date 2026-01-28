PP.entities = PP.entities || {};
PP.entities.boss = {};

// === PRELOAD ===
PP.entities.boss.preload = function (scene) {
  PP.entities.boss.img_samurai = PP.assets.sprite.load_spritesheet(scene, "assets/images/mob/spritesheet_samurai.png", 133, 132);
};

// === CREAZIONE BOSS ===
PP.entities.boss.create = function (scene, positions) {
  const img_samurai = PP.entities.boss.img_samurai;
  const boss = PP.assets.sprite.add(scene, img_samurai, 1230, 500, 0.5, 0.5);
  PP.physics.add(scene, boss, PP.physics.type.DYNAMIC);
  PP.physics.set_collision_rectangle(boss, 60, 132, 60, 0);

  boss.state = "idle"; // idle | walk | attack | dead

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
  PP.assets.sprite.animation_add(boss, "camminata", 6, 12, 10, -1);
  PP.assets.sprite.animation_add(boss, "attacco", 0, 5, 8, 0);

  boss.isAttacking = false;
  boss.inCutscene = false;

  return boss;
};

// === UPDATE BOSS ===
PP.entities.boss.update = function (scene, boss, player) {

  // === STATO DEAD
if (boss.state === "dead") {

  if (boss.geometry.body_x > 120) {
    PP.physics.set_velocity_x(boss, -50);
    PP.assets.sprite.animation_play(boss, "camminata", true);
  } else {
    PP.physics.set_velocity_x(boss, 0);
    boss.state = "dead_idle";
    PP.game_state.bossIsFriendly = true;
    PP.assets.sprite.animation_play(boss, "idle", true);
  }

  return; 
}

  if (PP.game_state.bossIsDead == true || PP.game_state.duringBossCutscene == true) {
    boss.inCutscene = true;
  } else { boss.inCutscene = false; }

  if(PP.game_state.reset == true) {
    boss.lives = boss.maxLives;
    PP.game_state.reset = false;
  }

  const dx = player.geometry.x - boss.geometry.x;
  const distance = Math.abs(dx);

  if (boss.state !== "dead" && boss.state !== "dead_idle") {
    // se sconfitto, non guarda il player

    if (dx > 0) {
      boss.geometry.flip_x = false; // guarda a destra verso il player
      boss.direction = 1;
    } else {
      boss.geometry.flip_x = true;  // guarda a sinistra verso il player
      boss.direction = -1;
    }
  }

  if (distance < boss.detectionRange && boss.inCutscene == false && PP.game_state.bossIsFriendly == false) {

    if (dx > boss.deadZone && boss.lives > 0) {
      if (dx < boss.walkzone) { PP.physics.set_velocity_x(boss, boss.speed);}
      else { PP.physics.set_velocity_x(boss, boss.walkSpeed); }
      boss.direction = 1;
    } else if (dx < -boss.deadZone && boss.lives > 0) {
      if (dx > -boss.walkzone) { PP.physics.set_velocity_x(boss, -boss.speed); }
      else { PP.physics.set_velocity_x(boss, -boss.walkSpeed); }
      boss.direction = -1;
    } else {
      PP.physics.set_velocity_x(boss, 0);
    }
  }

  if (PP.game_state.bossIsDead == true) {
    boss.speed = 50;

    if (boss.geometry.body_x > 120) {
      PP.physics.set_velocity_x(boss, -boss.speed);
    } else {
      boss.speed = 0;
      PP.physics.set_velocity_x(boss, 0);
      PP.game_state.bossIsDead = false;
      PP.game_state.bossIsFriendly = true
      PP.assets.sprite.animation_play(boss, "idle");
    }
  }

  //Se il player è vicino, attacca
  if (dx < 300 && dx > -300 && boss.inCutscene == false && PP.game_state.bossIsFriendly == false) {
    PP.entities.boss.attack(scene, boss, player);
  }
};

PP.entities.boss.walk = function (scene, boss) {
  boss.isWalking = true;
  boss.state = "walk";
  PP.assets.sprite.animation_play(boss, "camminata", true);
}

PP.entities.boss.attack = function (scene, boss, player) {

  if (boss.isWalking || boss.isAttacking || boss.inCutscene || PP.game_state.bossIsFriendly) return;

 boss.isAttacking = true;
 boss.state = "attack";
 PP.assets.sprite.animation_play(boss, "attacco", true);

PP.timers.add_timer(scene, 1000, () => {
  boss.isAttacking = false;
  boss.state = "idle"; 
}, false);

  let dir = boss.direction;

  const hitbox = PP.shapes.rectangle_add(scene,boss.geometry.x + 50 * dir, boss.geometry.y, 100, 80, "0xABCDEF", 0);

  PP.physics.add(scene, hitbox, PP.physics.type.STATIC);

  PP.physics.add_overlap_f(scene, hitbox, player, () => {
    PP.entities.player.damage(scene, PP.game_state.player, hitbox);
  });

  PP.timers.add_timer(scene, 100, () => {
    PP.shapes.destroy(hitbox);
  }, false);

};

// === FUNZIONE DI DANNO
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
  boss.state = "dead";
}

 // === ANIMAZIONI BOSS ===
const mv = boss.geometry.body_velocity_x;  // mv = movimento orizzontale

if (boss.state === "attack") {
  PP.assets.sprite.animation_play(boss, "attacco", true);
}
else if (boss.state === "dead") {
  PP.assets.sprite.animation_play(boss, "idle", true);
}
else if (Math.abs(mv) > 5) {
  boss.state = "walk";
  PP.assets.sprite.animation_play(boss, "camminata", true);
}
else {
  boss.state = "idle";
  PP.assets.sprite.animation_play(boss, "idle", true);
}

};  