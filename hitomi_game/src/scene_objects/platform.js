// src/scene_objects/platform.js
// File che gestisce le piattaforme statiche

PP.scene_objects = PP.scene_objects || {};
PP.scene_objects.platform = {};

// === CREAZIONE DELLE PIATTAFORME STATICHE ===
PP.scene_objects.platform.create = function(scene, positions) {
    const platforms = [];

    for (let p of positions) {
        // Creo un rettangolo visivo centrato
        let plat = PP.shapes.rectangle_add(scene, p.x, p.y, p.w, p.h, "0x000000", 1);
        // Aggiungo il corpo fisico statico che corrisponde al rettangolo
        PP.physics.add(scene, plat, PP.physics.type.STATIC);
        // Assicuro che il corpo fisico corrisponda a dimensione e posizione del rettangolo
        PP.physics.set_collision_rectangle(plat, p.w, p.h, 0, 0);
        // Aggiungo il rettangolo al gruppo statico per la collisione
        platforms.push(plat);
    }

    return platforms;
};
