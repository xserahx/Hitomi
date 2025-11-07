// src/entities/enemy.js
//File che descrive le piattaforme mobili

PP.scene_objects = PP.scene_objects || {}
PP.scene_objects.moving_platform = {}

//Funzione che crea le piattaforme mobili
PP.scene_objects.moving_platform.create = function(scene, config) {
    const movingplatforms = scene.physics.add.group({allowGravity: false, immovable: true})

    for (let c of config) {
      const plat = scene.add.rectangle(c.x, c.y, c.w, c.h, 0x333333)
      scene.physics.add.existing(plat)
      plat.startX = c.x
      plat.startY = c.y
      plat.range = c.range || 100
      plat.speed = c.speed || 50
      plat.direction = c.direction || 'x'
      plat.forward = true

      movingplatforms.add(plat)
    }
    return movingplatforms
}

//Funzione che gestiscse il funzionamento delle piattaforme mobili
PP.scene_objects.moving_platform.update = function(scene, platforms) {
  for (let plat of platforms) {
    if (plat.direction === 'x') {
      if (plat.forward) {
        plat.body.setVelocityX(plat.speed)
        if (plat.x > plat.startX + plat.range) plat.forward = false
      } else {
        plat.body.setVelocityX(-plat.speed)
        if (plat.x < plat.startX - plat.range) plat.forward = true
      }
    } else if (plat.direction === 'y') {
      if (plat.forward) {
        plat.body.setVelocityY(plat.speed)
        if (plat.y > plat.startY + plat.range) plat.forward = false
      } else {
        plat.body.setVelocityY(-plat.speed)
        if (plat.y < plat.startY - plat.range) plat.forward = true
      }
    }
  }
}