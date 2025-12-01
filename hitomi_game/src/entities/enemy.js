PP.entities = PP.entities || {};
PP.entities.enemy = {};

// === CREAZIONE NEMICI ===
PP.entities.enemy.create = function (scene, positions) {
  const enemies = [];

  for (let pos of positions) {
    const enemy = PP.shapes.rectangle_add(scene, pos.x, pos.y, 40, 60, "0xff0000", 1);
    PP.physics.add(scene, enemy, PP.physics.type.DYNAMIC);
    PP.physics.set_collide_world_bounds(enemy, true);

    // Parametri base
    enemy.speed = pos.speed || 80;
    enemy.detectionRange = pos.detection || 250;
    enemy.deadZone = pos.deadZone || 5;

    // === NUOVI PARAMETRI PER PATTUGLIA ===
    enemy.patrolDistance = pos.patrolDistance || 100;
    enemy.startX = pos.x;
    enemy.direction = 1;
    enemy.patrolMode = true;

    // === VITA ===
    enemy.maxLives = 2;
    enemy.lives = 2;
    enemy.isInvincible = false;
    enemy.isFlashing = false;
    enemy.isKnocked = false;

    enemies.push(enemy);
  }

  return enemies;
};

// === UPDATE NEMICI ===
PP.entities.enemy.update = function (scene, enemies, player) {
  /*for (let enemy of enemies) {
    const dx = player.x - enemy.x;
    const distance = Math.abs(dx);

    // Se il player è vicino → insegui
    if (distance < enemy.detectionRange) {
      enemy.patrolMode = false;

      if (dx > enemy.deadZone) {
        PP.physics.set_velocity_x(enemy, enemy.speed);
      } else if (dx < -enemy.deadZone) {
        PP.physics.set_velocity_x(enemy, -enemy.speed);
      } else {
        PP.physics.set_velocity_x(enemy, 0);
      }
    }
    // Altrimenti → pattuglia avanti e indietro
    else {
      enemy.patrolMode = true;

      // Sposta
      PP.physics.set_velocity_x(enemy, enemy.direction * enemy.speed * 0.5);

      // Inverti direzione ai bordi della zona di pattuglia
      if (enemy.x > enemy.startX + enemy.patrolDistance) {
        enemy.direction = -1;
      } else if (enemy.x < enemy.startX - enemy.patrolDistance) {
        enemy.direction = 1;
      }
    }
  }*/


};
PP.entities.enemy.damage = function (scene, enemy, hitbox) {
  if (enemy.isInvincible) return;

  enemy.lives -= 1;
  enemy.isInvincible = true;

  // === LAMPEGGIO ROSSO ===
  enemy.isFlashing = true;
  let flashCount = 0;
  const originalColor = enemy.ph_obj.fillColor; //Non esiste una funzione di poliphazer per zambiare colore

  PP.timers.add_timer(scene, 100, (s) => {
    if (!enemy.isFlashing) return;

    enemy.ph_obj.fillColor = flashCount % 2 === 0 ? 0x800000 : originalColor; //Non esiste una funzione di poliphazer per zambiare colore
    flashCount++;

    if (flashCount >= enemy.maxLives) {
      enemy.isFlashing = false;
      enemy.ph_obj.fillColor = originalColor; //Non esiste una funzione di poliphazer per zambiare colore
      flashCount = 0;
    }
  }, true);

  // === KNOCKBACK ===
  enemy.isKnocked = true;
  const knockbackX = 600;
  const knockbackY = -300;
  const dirX = (enemy.geometry.x < hitbox.geometry.x) ? -1 : 1; //Non c'è modo di avere la x del player

  PP.physics.set_velocity_x(enemy, knockbackX * dirX);
  PP.physics.set_velocity_y(enemy, knockbackY);

  PP.timers.add_timer(scene, 200, (s) => {
    enemy.isKnocked = false;
  }, false);

  // === INVINCIBILITÀ TEMPORANEA ===
  PP.timers.add_timer(scene, 1500, (s) => {
    enemy.isInvincible = false;
    enemy.fillColor = originalColor;
  }, false);

  if (enemy.lives <= 0) {
    PP.shapes.destroy(enemy);
  }
}
