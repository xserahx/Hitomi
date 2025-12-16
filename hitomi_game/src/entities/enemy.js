PP.entities = PP.entities || {};
PP.entities.enemy = {};

// === PRELOAD ===
PP.entities.enemy.preload = function (scene) {
  PP.entities.enemy.sprite = {};
  PP.entities.enemy.sprite.ombrello = PP.assets.image.load(scene,"assets/images/mob/ombrello.png");
  PP.entities.enemy.sprite.slug = PP.assets.image.load(scene,"assets/images/mob/slug.png");
  PP.entities.enemy.sprite.lanterna = PP.assets.image.load(scene,"assets/images/mob/lanterna.png");
};

// === CREAZIONE NEMICI ===
PP.entities.enemy.create = function (scene, positions) {
  const enemies = [];

  for (let pos of positions) {
    const sprite = PP.entities.enemy.sprite[pos.sprite_name];
    if (!sprite) {
      console.error("Sprite non trovato:", pos.sprite_name);
      continue;
    }

    const enemy = PP.assets.image.add(scene,sprite,pos.x,pos.y,0.5,0,0.5);
    PP.physics.add(scene, enemy, PP.physics.type.DYNAMIC);

    // === PARAMETRI ===
    enemy.speed = pos.speed ?? 80;
    enemy.detectionRange = 250;

    enemy.patrolDir = 1;
    enemy.patrolInterval = 2000;
    enemy.lastPatrolSwitch = 0;

    enemy.maxLives = 1;
    enemy.lives = 1;
    enemy.isInvincible = false;
    enemy.isKnocked = false;

    enemies.push(enemy);
  }

  return enemies;
};

// === UPDATE ===
PP.entities.enemy.update = function (scene, enemies, player) {
  for (let enemy of enemies) {
    if (!enemy?.ph_obj?.body) continue;

    const dx = player.geometry.body_x - enemy.geometry.body_x;
    const distance = Math.abs(dx);

    if (distance < enemy.detectionRange) {
      const dir = dx < 0 ? -1 : 1;
      PP.physics.set_velocity_x(enemy, dir * enemy.speed);
      
      // Flip in base alla direzione
      enemy.geometry.flip_x = dir > 0; // true = destra, false = sinistra
    } else {
      if (scene.time.now - enemy.lastPatrolSwitch > enemy.patrolInterval) {
        enemy.patrolDir *= -1;
        enemy.lastPatrolSwitch = scene.time.now;
      }
      PP.physics.set_velocity_x(enemy, enemy.patrolDir * enemy.speed * 0.5);

      // Flip durante la pattuglia
      enemy.geometry.flip_x = enemy.patrolDir > 0;
    }
  }
};

// === DANNO ===
PP.entities.enemy.damage = function (scene, enemy, hitbox) {
  if (enemy.isInvincible) return;

  enemy.lives--;
  enemy.isInvincible = true;

  // knockback
  const dir = enemy.geometry.body_x < hitbox.geometry.body_x ? -1 : 1;
  PP.physics.set_velocity_x(enemy, 400 * dir);
  PP.physics.set_velocity_y(enemy, -250);

  PP.timers.add_timer(scene, 200, () => {
    enemy.isKnocked = false;
  }, false);

  PP.timers.add_timer(scene, 800, () => {
    enemy.isInvincible = false;
  }, false);

  if (enemy.lives <= 0) {
    PP.assets.destroy(enemy);
  }
};