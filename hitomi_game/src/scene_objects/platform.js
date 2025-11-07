// src/entities/enemy.js
// File che gestisce il funzionamento delkle piattaforme

PP.scene_objects = PP.scene_objects || {}
PP.scene_objects.platform = {}

//Funzione per la creazione delle piattaforme
PP.scene_objects.platform.create = function(scene, positions) {
    const platforms = scene.physics.add.staticGroup()

    for (let p of positions) {
      // create a visual rectangle (centered)
      const plat = scene.add.rectangle(p.x, p.y, p.w, p.h, 0x000000)
      // add an arcade static body that matches the rectangle
      scene.physics.add.existing(plat, true) // true -> static body
      // ensure the physics body matches the rectangle size and position
      plat.body.setSize(p.w, p.h)
      // add the rectangle to the static group so we can collider with the group
      platforms.add(plat)
    }
    return platforms
}