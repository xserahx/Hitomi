PP.scene_objects = PP.scene_objects || {};
PP.scene_objects.platform = {};

// Preload immagini piattaforme
PP.scene_objects.platform.preload = function(scene) {
    // carico le immagini e salvo i riferimenti 
    PP.scene_objects.platform.sprite = {};
    PP.scene_objects.platform.sprite["vaso"] = PP.assets.image.load(scene, "assets/images/house/vaso.png");
    PP.scene_objects.platform.sprite["piattaforma"] = PP.assets.image.load(scene, "assets/images/house/piattaforma.png");
    PP.scene_objects.platform.sprite["armadio"] = PP.assets.image.load(scene, "assets/images/house/armadio.png");
    PP.scene_objects.platform.sprite["rialzino"] = PP.assets.image.load(scene, "assets/images/house/rialzino.png");
    PP.scene_objects.platform.sprite["muro_grande"] = PP.assets.image.load(scene, "assets/images/house/muro_grande.png", 100, 620);
    PP.scene_objects.platform.sprite["basetta"] = PP.assets.image.load(scene, "assets/images/house/basetta.png", 150, 20);
    PP.scene_objects.platform.sprite["palo"] = PP.assets.image.load(scene, "assets/images/house/palo.png", 50, 270);
    PP.scene_objects.platform.sprite["culla"] = PP.assets.image.load(scene, "assets/images/culla.png", 100, 60);
    PP.scene_objects.platform.sprite["nuvoletta_1"] = PP.assets.image.load(scene, "assets/images/house/nuvoletta_1.png", 100, 60);
};

// Creazione piattaforme
PP.scene_objects.platform.create = function(scene, positions) {
    const platforms = [];

    for (let p of positions) {
        // prendo lo sprite dal preload
        let sprite = PP.scene_objects.platform.sprite[p.sprite_name];
        if (!sprite) {
            console.error("Sprite non trovato: " + p.sprite_name);
            continue;
        }

        // aggiungo l'immagine alla scena
        let plat = PP.assets.image.add(scene, PP.scene_objects.platform.sprite[p.sprite_name], p.x, p.y, 0.5, 0, 0.5);

        // aggiungo fisica e collisioni
        PP.physics.add(scene, plat, PP.physics.type.STATIC);
        PP.physics.set_collision_rectangle(plat, p.w, p.h, 0, 0);

        platforms.push(plat);
    }

    return platforms;
};
