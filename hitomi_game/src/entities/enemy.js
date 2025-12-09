PP.entities = PP.entities || {};
PP.entities.enemy = {};

// === CREAZIONE NEMICI ===
PP.entities.enemy.create = function (scene, positions) {
  const enemies = [];

  for (let pos of positions) {
    const enemy = PP.shapes.rectangle_add(scene, pos.x, pos.y, 40, 60, "0xff0000", 1);
    PP.physics.add(scene, enemy, PP.physics.type.DYNAMIC);

    // Parametri base
    enemy.speed = pos.speed || 80;
    enemy.detectionRange = 250;
    enemy.deadZone = 5;

    // === NUOVI PARAMETRI PER PATTUGLIA ===
    enemy.patrolDistance = 100;
    enemy.startX = pos.x;
    enemy.patrolMode = true;
    enemy.patrolInterval = 2000;

    // === VITA ===
    enemy.maxLives = 1;
    enemy.lives = 1;
    enemy.isInvincible = false;
    enemy.isFlashing = false;
    enemy.isKnocked = false;
    enemy.lastPatrolSwitch = 0;
    enemies.push(enemy);
  }

  return enemies;
};

// === UPDATE NEMICI ===
PP.entities.enemy.update = function (scene, enemies, player) {
  for (let enemy of enemies) {
    if (!enemy || !enemy.ph_obj || !enemy.ph_obj.body) continue;

    const dx = player.geometry.body_x - enemy.geometry.body_x;
    const dy = player.geometry.body_y - enemy.geometry.body_y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // === INSEGUIMENTO ===
    if (distance <= enemy.detectionRange) {
      const dirX = dx < 0 ? -1 : 1;

      PP.physics.set_velocity_x(enemy, dirX * enemy.speed);
    }else{
      // === PATTUGLIAMENTO ===
      if (enemy.patrolDir === undefined) {
        enemy.patrolDir = 1; // parte andando a destra
        enemy.lastPatrolSwitch = scene.time.now;
      }
      // cambia direzione ogni intervallo
      if (scene.time.now - enemy.lastPatrolSwitch > enemy.patrolInterval) {
        enemy.patrolDir *= -1;
        enemy.lastPatrolSwitch = scene.time.now;
      }

      PP.physics.set_velocity_x(enemy, enemy.patrolDir * enemy.speed * 0.5);
    }
  }


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
  const dirX = (enemy.geometry.body_x < hitbox.geometry.body_x) ? -1 : 1; //Non c'è modo di avere la x del player

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
