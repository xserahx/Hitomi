// src/entities/enemy.js
// File che descrive il funzionamento dei nemici |PROVA|

PP.entities = PP.entities || {}
PP.entities.enemy = {}

//Funzione per creare un nemico
PP.entities.enemy.create = function(scene, positions) {
  const enemies = []

  for (let pos of positions) {
    const enemy = scene.add.rectangle(pos.x, pos.y, 40, 60, 0xff0000)
    scene.physics.add.existing(enemy)
    enemy.body.setCollideWorldBounds(true)
    enemies.push(enemy)
  }

  return enemies
}

//Meccaniche dei nemici
PP.entities.enemy.update = function(scene, enemies, player) {
  const detectionRange = 300
  const speed = 100
  const deadZone = 10

  for (let enemy of enemies) {
    const dx = player.x - enemy.x

    // Movement logic
    if (Math.abs(dx) < detectionRange) {
      if (dx > deadZone) {
        enemy.body.setVelocityX(speed)
      } else if (dx < -deadZone) {
        enemy.body.setVelocityX(-speed)
      } else {
        enemy.body.setVelocityX(0)
      }
    } else {
      enemy.body.setVelocityX(0)
    }
  }
}
