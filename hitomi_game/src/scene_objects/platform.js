// src/scene_objects/platform.js
// File che gestisce le piattaforme statiche

PP.scene_objects = PP.scene_objects || {};
PP.scene_objects.platform = {};

// === CREAZIONE DELLE PIATTAFORME STATICHE ===
PP.scene_objects.platform.create = function(scene, positions) {
    const platforms = scene.physics.add.staticGroup();

    for (let p of positions) {
        // Creo un rettangolo visivo centrato
        let plat = scene.add.rectangle(p.x, p.y, p.w, p.h, 0x000000);
        // Aggiungo il corpo fisico statico che corrisponde al rettangolo
        scene.physics.add.existing(plat, true); // true -> static body
        // Assicuro che il corpo fisico corrisponda a dimensione e posizione del rettangolo
        plat.body.setSize(p.w, p.h);
        // Aggiungo il rettangolo al gruppo statico per la collisione
        platforms.add(plat);
    }

    return platforms;
};
