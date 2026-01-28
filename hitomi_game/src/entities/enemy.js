PP.entities = PP.entities || {};
PP.entities.enemy = {};

// === PRELOAD ===
PP.entities.enemy.preload = function (scene) {
  PP.entities.enemy.sprite = {};
  PP.entities.enemy.sprite.ombrello = PP.assets.sprite.load_spritesheet(scene,"assets/images/mob/spritesheet_ombrello.png", 58, 102);
  PP.entities.enemy.sprite.bambino = PP.assets.sprite.load_spritesheet(scene,"assets/images/mob/spritesheet_bambino.png", 52, 52);
  PP.entities.enemy.sprite.pterodattilo = PP.assets.sprite.load_spritesheet(scene,"assets/images/mob/spritesheet_pterodattilo.png", 150, 105);
  PP.entities.enemy.sprite.slug = PP.assets.sprite.load_spritesheet(scene,"assets/images/mob/spritesheet_slug.png", 102, 102);
  PP.entities.enemy.sprite.lanterna = PP.assets.sprite.load_spritesheet(scene,"assets/images/mob/spritesheet_lanterna.png", 58, 57);
  PP.entities.enemy.sprite.ciabatta = PP.assets.sprite.load_spritesheet(scene,"assets/images/mob/spritesheet_ciabatta.png", 100, 100);
};

PP.entities.enemy.create = function (scene, positions) {
  const enemies = [];

  for (let pos of positions) {
    const sheet = PP.entities.enemy.sprite[pos.sprite_name];
    if (!sheet) {
      console.error("Spritesheet non trovato:", pos.sprite_name);
      continue;
    }

    const enemy = PP.assets.sprite.add(scene,sheet,pos.x,pos.y,0.5,0.5);

    PP.physics.add(scene, enemy, PP.physics.type.DYNAMIC);

    // === PARAMETRI BASE ===
    enemy.type = pos.sprite_name;
    enemy.speed = pos.speed ?? 80;
    enemy.detectionRange = 250;

    enemy.patrolDir = 1;
    enemy.patrolInterval = 2000;
    enemy.lastPatrolSwitch = 0;

    enemy.maxLives = 1;
    enemy.lives = 1;
    enemy.isInvincible = false;
    enemy.isKnocked = false;

    // === STATO ANIMAZIONI ===
    enemy.isWalkingAnim = false;

    // === ANIMAZIONI YOKAI ===
    switch (enemy.type) {

      case "ombrello":
        PP.assets.sprite.animation_add(enemy, "walk", 9, 0, 10, -1);
        PP.physics.set_collision_rectangle(enemy, 49, 85, 5, 3);
        break;

      case "bambino":
        PP.assets.sprite.animation_add(enemy, "walk", 13, 0, 10, -1);
        PP.physics.set_collision_rectangle(enemy, 48, 50, 5, 2);
        break;

      case "lanterna":
        PP.assets.sprite.animation_add(enemy, "walk", 0, 9, 10, -1);
        PP.physics.set_collision_rectangle(enemy, 53, 49, 5, 2);
        break;

      case "pterodattilo":
        PP.assets.sprite.animation_add(enemy, "walk", 8, 0, 10, -1);
        PP.physics.set_collision_rectangle(enemy, 120, 100, 10, 0);
        break;

      case "slug":
        PP.assets.sprite.animation_add(enemy, "walk", 0, 6, 10, -1);
        PP.physics.set_collision_rectangle(enemy, 90, 90, 8, 10);
        break;

      case "ciabatta":
        PP.assets.sprite.animation_add(enemy, "walk", 0, 6, 8, -1);
        PP.physics.set_collision_rectangle(enemy, 80, 90, 3, 0);
        break;
    }

    enemies.push(enemy);
  }

  return enemies;
};


PP.entities.enemy.update = function (scene, enemies, player) {
  for (let enemy of enemies) {
    if (!enemy?.ph_obj?.body) continue;

    const dx = player.geometry.body_x - enemy.geometry.body_x;
    const distance = Math.abs(dx);
    let moving = false;

    if (distance < enemy.detectionRange && PP.game_state.pause == false) {
      const dir = dx < 0 ? -1 : 1;
      if (!PP.game_state.pause) {PP.physics.set_velocity_x(enemy, dir * enemy.speed);}
      else{PP.physics.set_velocity_x(enemy, 0);}
      if (!PP.game_state.pause){enemy.geometry.flip_x = dir > 0;}
      moving = true;
    } else {
      if (scene.time.now - enemy.lastPatrolSwitch > enemy.patrolInterval) {
        enemy.patrolDir *= -1;
        enemy.lastPatrolSwitch = scene.time.now;
      }

      if (!PP.game_state.pause){PP.physics.set_velocity_x(enemy, enemy.patrolDir * enemy.speed * 0.5);}
      else{PP.physics.set_velocity_x(enemy, 0);}
      if (!PP.game_state.pause){enemy.geometry.flip_x = enemy.patrolDir > 0;}
      moving = true;
    }

    // === ANIMAZIONE YOKAI ===
    if (moving) {
      if (enemy.currentAnim !== "walk") {
        PP.assets.sprite.animation_play(enemy, "walk");
        enemy.currentAnim = "walk";
        }
    }
    if(PP.game_state.pause==true){
        console.log("Stopping animation");
        PP.assets.sprite.animation_stop(enemy);
      }
  }};

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