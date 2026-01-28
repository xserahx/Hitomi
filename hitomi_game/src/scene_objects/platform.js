PP.scene_objects = PP.scene_objects || {};
PP.scene_objects.platform = {};

// Preload immagini piattaforme
PP.scene_objects.platform.preload = function(scene) {
    // carico le immagini e salvo i riferimenti 
    PP.scene_objects.platform.sprite = {};

    // Piattaforme tutorial e casa
    PP.scene_objects.platform.sprite["vaso"] = PP.assets.image.load(scene, "assets/images/house/vaso.png");
    PP.scene_objects.platform.sprite["piattaforma"] = PP.assets.image.load(scene, "assets/images/house/piattaforma.png");
     PP.scene_objects.platform.sprite["armadio"] = PP.assets.image.load(scene, "assets/images/house/armadio.png");
    PP.scene_objects.platform.sprite["rialzino"] = PP.assets.image.load(scene, "assets/images/house/rialzino.png");
    PP.scene_objects.platform.sprite["muro_grande"] = PP.assets.image.load(scene, "assets/images/house/muro_grande.png", 100, 620);
    PP.scene_objects.platform.sprite["basetta_1"] = PP.assets.image.load(scene, "assets/images/house/basetta_1.png", 150, 20);
    PP.scene_objects.platform.sprite["basetta_2"] = PP.assets.image.load(scene, "assets/images/house/basetta_2.png", 150, 20);
    PP.scene_objects.platform.sprite["palo"] = PP.assets.image.load(scene, "assets/images/house/palo.png", 50, 270);
    PP.scene_objects.platform.sprite["culla"] = PP.assets.image.load(scene, "assets/images/culla.png", 100, 60);

    // Piattaforme foresta
    PP.scene_objects.platform.sprite["tronco"] = PP.assets.image.load(scene, "assets/images/forest/parallasse/tronco.png", 300, 350);
    PP.scene_objects.platform.sprite["piattaforma_foresta"] = PP.assets.image.load(scene, "assets/images/forest/parallasse/piattaforma_erbetta.png");
    PP.scene_objects.platform.sprite["roccia_1"] = PP.assets.image.load(scene, "assets/images/forest/parallasse/roccia_1.png", 500, 150);
    PP.scene_objects.platform.sprite["roccia_2"] = PP.assets.image.load(scene, "assets/images/forest/parallasse/roccia_2.png", 500, 150);

    // Particelle 
    let graphics = scene.add.graphics();
    graphics.fillStyle(0xffffff);
    graphics.fillCircle(10, 10, 10);
    graphics.generateTexture('ghost_particle', 20, 20);
    graphics.destroy();

    PP.scene_objects.platform.sprite["particelle"] = { id: 'ghost_particle' };
};

PP.scene_objects.platform.create = function(scene, positions) {
    const platforms = [];

    for (let p of positions) {

        // uso phaser per generare le particelle e animarle poiché non possibile con il framework PP
        
        // PARTICELLE
        if (p.sprite_name === "particelle") {

    scene.add.particles(
        p.x + p.w / 2,
        p.y + p.h / 2,
        'ghost_particle',
        {
            x: { min: -p.w / 2, max: p.w / 2 },
            y: { min: -p.h / 2, max: p.h / 2 },
            quantity: 1,
            frequency: 50,
            lifespan: 1500,
            scale: { start: 1, end: 0.5 },
            alpha: { start: 0.8, end: 0 },
            tint: 0x93DC5C,
            blendMode: 'SCREEN',
            speedX: { min: -10, max: 10 },
            speedY: { min: -10, max: 10 },
            rotate: { min: 0, max: 360 }
        }
    );
    continue;
}

        // PIATTAFORME 
        let sprite = PP.scene_objects.platform.sprite[p.sprite_name];
        if (!sprite) {
            console.error("Sprite non trovato: " + p.sprite_name);
            continue;
        }

        let plat = PP.assets.image.add(scene, sprite, p.x, p.y, 0.5, 0, 0.5);
        PP.physics.add(scene, plat, PP.physics.type.STATIC);
        PP.physics.set_collision_rectangle(plat, p.w, p.h, 0, 0);

        platforms.push(plat);
    }

    return platforms;
};
