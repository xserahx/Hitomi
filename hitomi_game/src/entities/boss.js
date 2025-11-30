PP.entities = PP.entities || {};
PP.entities.boss = {};

// === CREAZIONE NEMICI ===
PP.entities.boss.create = function (scene, positions) {
  const enemies = [];

  for (let pos of positions) {
    const boss = PP.shapes.rectangle_add(scene, pos.x, pos.y, 80, 120, "0xff0000", 1);
    PP.physics.add(scene, boss, PP.physics.type.DYNAMIC);
    PP.physics.set_collide_world_bounds(boss, true);

    // Parametri base
    boss.speed = pos.speed || 150;
    boss.detectionRange = pos.detection || 1280;
    boss.deadZone = pos.deadZone || 5;
    boss.dashzone = pos.dashzone || 400;
    boss.dashSpeed = pos.dashSpeed || 700;
    boss.direction = 1;

    // === VITA ===
    boss.hp = 3;

    // === ATTACCO ===
    boss.isAttacking = false;

    enemies.push(boss);
  }

  return enemies;
};

// === UPDATE NEMICI ===
PP.entities.boss.update = function (scene, enemies, player) {
  for (let boss of enemies) {
    const dx = player.geometry.x - boss.geometry.x;
    const distance = Math.abs(dx);


    // Se il player è vicino → insegui
    if (distance < boss.detectionRange) {

      if (dx > boss.deadZone) {
        if (dx < boss.dashzone) { PP.physics.set_velocity_x(boss, boss.speed); }
        else { PP.physics.set_velocity_x(boss, boss.dashSpeed); }
        boss.direction = 1;
      } else if (dx < -boss.deadZone) {
        if (dx > -boss.dashzone) { PP.physics.set_velocity_x(boss, -boss.speed); }
        else { PP.physics.set_velocity_x(boss, -boss.dashSpeed); }
        boss.direction = -1;
      } else {
        PP.physics.set_velocity_x(boss, 0);
      }
    }

    //Se il player è vicino, attacca
    if (dx < 300 && dx > -300) {

      PP.entities.boss.attack(scene, boss, player);
    }
  }

  PP.entities.boss.damage = function (scene, hitbox, boss) {
  }
};


// === FUNZIONE DI ATTACCO ===
PP.entities.boss.attack = function (scene, boss, player) {

  //Per evitare bug
  if (boss.isDashing == true || boss.isAttacking == true) return;

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