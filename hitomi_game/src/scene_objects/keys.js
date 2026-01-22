PP.scene_objects = PP.scene_objects || {};
PP.scene_objects.key = {};

// Preload immagini piattaforme
PP.scene_objects.key.preload = function(scene) {
    // carico le immagini e salvo i riferimenti 
    PP.scene_objects.key.sprite = {};
    PP.scene_objects.key.sprite["chiave"] = PP.assets.image.load(scene, "assets/images/house/chiave.png", 50, 50);
    PP.scene_objects.key.sprite["door"] = PP.assets.image.load(scene, "assets/images/house/door.png", 100, 140);
    PP.scene_objects.key.sprite["doorframe"] = PP.assets.image.load(scene, "assets/images/house/doorframe.png", 100, 140);
};

// Creazione piattaforme
PP.scene_objects.key.create = function(scene, positions) {
    const keys = [];

    for (let p of positions) {
        // prendo lo sprite dal preload
        let sprite = PP.scene_objects.key.sprite[p.sprite_name];
        if (!sprite) {
            console.error("Sprite non trovato: " + p.sprite_name);
            continue;
        }

        // aggiungo l'immagine alla scena
        let plat = PP.assets.image.add(scene, PP.scene_objects.key.sprite[p.sprite_name], p.x, p.y, 0, 0);

        // aggiungo fisica e collisioni
        PP.physics.add(scene, plat, PP.physics.type.STATIC);
        
        if(p.sprite_name == "chiave"){PP.physics.set_collision_rectangle(plat, 50, 50, 0, 0);}
        else if(p.sprite_name == "door") {PP.physics.set_collision_rectangle(plat, 100, 140, 0, 0);}
        else {PP.physics.set_collision_rectangle(plat, 120, 140, 0, 0);}

        plat.id= p.id;
        plat.collected= p.collected;

        keys.push(plat);
    }

    return keys;
};
