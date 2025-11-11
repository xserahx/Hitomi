PP.entities = PP.entities || {};
PP.entities.enemy = {};

// === CREAZIONE NEMICI ===
PP.entities.enemy.create = function (scene, positions) {
  const enemies = [];

  for (let pos of positions) {
    const enemy = scene.add.rectangle(pos.x, pos.y, 40, 60, 0xff0000);
    scene.physics.add.existing(enemy);
    enemy.body.setCollideWorldBounds(true);

    // Parametri base
    enemy.speed = pos.speed || 80;
    enemy.detectionRange = pos.detection || 250;
    enemy.deadZone = pos.deadZone || 5;

    // === NUOVI PARAMETRI PER PATTUGLIA ===
    enemy.patrolDistance = pos.patrolDistance || 100;
    enemy.startX = pos.x;
    enemy.direction = 1;
    enemy.patrolMode = true;

    enemies.push(enemy);
  }

  return enemies;
};

// === UPDATE NEMICI ===
PP.entities.enemy.update = function (scene, enemies, player) {
  for (let enemy of enemies) {
    const dx = player.x - enemy.x;
    const distance = Math.abs(dx);

    // Se il player è vicino → insegui
    if (distance < enemy.detectionRange) {
      enemy.patrolMode = false;

      if (dx > enemy.deadZone) {
        enemy.body.setVelocityX(enemy.speed);
      } else if (dx < -enemy.deadZone) {
        enemy.body.setVelocityX(-enemy.speed);
      } else {
        enemy.body.setVelocityX(0);
      }
    }
    // Altrimenti → pattuglia avanti e indietro
    else {
      enemy.patrolMode = true;

      // Sposta
      enemy.body.setVelocityX(enemy.direction * enemy.speed * 0.5);

      // Inverti direzione ai bordi della zona di pattuglia
      if (enemy.x > enemy.startX + enemy.patrolDistance) {
        enemy.direction = -1;
      } else if (enemy.x < enemy.startX - enemy.patrolDistance) {
        enemy.direction = 1;
      }
    }
  }
};
