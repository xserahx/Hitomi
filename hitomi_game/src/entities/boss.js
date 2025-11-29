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
    boss.speed = pos.speed || 80;
    boss.detectionRange = pos.detection || 250;
    boss.deadZone = pos.deadZone || 5;

    // === NUOVI PARAMETRI PER PATTUGLIA ===
    boss.patrolDistance = pos.patrolDistance || 100;
    boss.startX = pos.x;
    boss.direction = 1;
    boss.patrolMode = true;

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
    const dx = player.x - boss.x;
    const distance = Math.abs(dx);



    // Se il player è vicino → insegui
    if (distance < boss.detectionRange) {
      boss.patrolMode = false;

      if (dx > boss.deadZone) {
        PP.physics.set_velocity_x(boss, boss.speed);
      } else if (dx < -boss.deadZone) {
        PP.physics.set_velocity_x(boss, -boss.speed);
      } else {
        PP.physics.set_velocity_x(boss, 0);
      }
    }


    // Altrimenti → pattuglia avanti e indietro
    else {
      boss.patrolMode = true;

      // Sposta
      PP.physics.set_velocity_x(boss, boss.direction * boss.speed * 0.5);

      // Inverti direzione ai bordi della zona di pattuglia
      if (boss.x > boss.startX + boss.patrolDistance) {
        boss.direction = -1;
      } else if (boss.x < boss.startX - boss.patrolDistance) {
        boss.direction = 1;
      }
    }

    //Se il player è vicino, attacca
    if(dx < 60){
        PP.entities.boss.attack(scene, boss, player);
    }
  }

PP.entities.boss.damage = function (scene, a, b) {
}
};


// === FUNZIONE DI ATTACCO ===
PP.entities.boss.attack = function (scene, boss, player) {

  //Per evitare bug
  if (boss.isDashing == true || boss.isAttacking == true) return;

  boss.isAttacking = true;

  //attacca verso l'ultima direzione presa
  const dir = boss.Direction;

  const hitbox = PP.shapes.rectangle_add(scene, boss.x * dir + 50, boss.y, 60, 80, "0xABCDEF", 1);
  PP.physics.add(scene, hitbox, PP.physics.type.STATIC);  
  //PP.physics.set_allow_gravity(hitbox, false); RETARDED

  for (let pg of player) {
    PP.physics.add_overlap_f(scene, hitbox, pg, PP.entities.player.damage(scene, hitbox, player));
  }

}