PP.entities = PP.entities || {};
PP.entities.boss = {};

// === CREAZIONE BOSS ===
PP.entities.boss.create = function (scene, positions) {
  const boss = PP.shapes.rectangle_add(scene, 1230, 500, 80, 120, "0xff0000", 1);
  PP.physics.add(scene, boss, PP.physics.type.DYNAMIC);
  PP.physics.set_collide_world_bounds(boss, true);

  boss.speed = 0;
  boss.detectionRange = 1280;
  boss.deadZone = 5;
  boss.dashzone = 400;
  boss.dashSpeed = 700;
  boss.direction = 1;
  boss.maxLives = 10;
  boss.lives = 3;

  boss.isAttacking = false;

  return boss;
};

// === UPDATE BOSS ===
PP.entities.boss.update = function (scene, boss, player) {

  const dx = player.geometry.x - boss.geometry.x;
  const distance = Math.abs(dx);

  if (distance < boss.detectionRange && PP.game_state.bossIsDead == false && PP.game_state.bossIsFriendly == false) {

    if (dx > boss.deadZone && boss.lives > 0) {
      if (dx < boss.dashzone) { PP.physics.set_velocity_x(boss, boss.speed); }
      else { PP.physics.set_velocity_x(boss, boss.dashSpeed); }
      boss.direction = 1;
    } else if (dx < -boss.deadZone && boss.lives > 0) {
        if (dx > -boss.dashzone) { PP.physics.set_velocity_x(boss, -boss.speed); }
        else { PP.physics.set_velocity_x(boss, -boss.dashSpeed); }
      boss.direction = -1;
    } else {
      PP.physics.set_velocity_x(boss, 0);
    }
  }

  if(PP.game_state.bossIsDead == true){
    boss.speed = 50;

    if(boss.geometry.body_x > 80)
    {
      PP.physics.set_velocity_x(boss, -boss.speed);
    }else {
      boss.speed = 0;
      PP.game_state.bossIsDead = false;
      PP.game_state.bossIsFriendly = true;
    }
  }

  //Se il player è vicino, attacca
  if (dx < 300 && dx > -300 && PP.game_state.bossIsDead == false && PP.game_state.bossIsFriendly == false) {
    PP.entities.boss.attack(scene, boss, player);
  }
};


// === FUNZIONE DI ATTACCO ===
PP.entities.boss.attack = function (scene, boss, player) {

  //Per evitare bug
  if (boss.isDashing == true || boss.isAttacking == true || PP.game_state.bossIsDead == true || PP.game_state.bossIsFriendly == true) return;

  boss.isAttacking = true;

  //attacca verso l'ultima direzione presa
  let dir = boss.direction;

  const hitbox = PP.shapes.rectangle_add(scene, boss.geometry.x + 50 * dir, boss.geometry.y, 100, 80, "0xABCDEF", 1);
  PP.physics.add(scene, hitbox, PP.physics.type.STATIC);
  //PP.physics.set_allow_gravity(hitbox, false); RETARDED


  PP.physics.add_overlap_f(scene, hitbox, player, (scene, player) => {
    config.player_is_hit = true;
  });

  PP.timers.add_timer(scene, 100, (s) => {
    PP.shapes.destroy(hitbox);
  }, false);

  PP.timers.add_timer(scene, 1000, (s) => {
    boss.isAttacking = false;
  }, false);

}

// === FUNZIONE DI DANNO
PP.entities.boss.damage = function (scene, boss, hitbox) {
  if (boss.isInvincible || PP.game_state.bossIsDead == true) return;

  boss.lives -= 1;
  console.log("vite boss: " + boss.lives);
  boss.isInvincible = true;

  // === LAMPEGGIO ROSSO ===
  boss.isFlashing = true;
  let flashCount = 0;
  const originalColor = boss.ph_obj.fillColor; //Non esiste una funzione di poliphazer per zambiare colore

  PP.timers.add_timer(scene, 100, (s) => {
    if (!boss.isFlashing) return;

    boss.ph_obj.fillColor = flashCount % 2 === 0 ? 0x800000 : originalColor; //Non esiste una funzione di poliphazer per zambiare colore
    flashCount++;

    if (flashCount >= boss.maxLives) {
      boss.isFlashing = false;
      boss.ph_obj.fillColor = originalColor; //Non esiste una funzione di poliphazer per zambiare colore
      flashCount = 0;
    }
  }, true);

  // === KNOCKBACK ===
  boss.isKnocked = true;
  const knockbackX = 600;
  const knockbackY = -300;
  const dirX = (boss.geometry.x < hitbox.geometry.x) ? -1 : 1; //Non c'è modo di avere la x del player

  PP.physics.set_velocity_x(boss, knockbackX * dirX);
  PP.physics.set_velocity_y(boss, knockbackY);boss
  PP.timers.add_timer(scene, 200, (s) => {
    boss.isKnocked = false;
  }, false);

  // === INVINCIBILITÀ TEMPORANEA ===
  PP.timers.add_timer(scene, 1500, (s) => {
    boss.isInvincible = false;
    boss.fillColor = originalColor;
  }, false);

  if (boss.lives <= 0) {
    PP.game_state.bossIsDead = true;
  }
}