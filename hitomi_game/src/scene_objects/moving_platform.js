// src/scene_objects/moving_platform.js

PP.scene_objects = PP.scene_objects || {};
PP.scene_objects.moving_platform = {};

// === CREAZIONE DELLE PIATTAFORME MOBILI ===
PP.scene_objects.moving_platform.create = function(scene, config) {
    const movingPlatforms = scene.physics.add.group({ allowGravity: false, immovable: true });

    for (let c of config) {
        let plat = scene.add.rectangle(c.x, c.y, c.w, c.h, 0x333333);
        scene.physics.add.existing(plat, false);
        plat.startX = c.x;
        plat.startY = c.y;
        plat.range = c.range || 50;
        plat.speed = c.speed || 50;
        plat.direction = c.direction || 'x';
        plat.forward = true;

        movingPlatforms.add(plat);
    }

    return movingPlatforms;
};

// === AGGIORNAMENTO DELLE PIATTAFORME MOBILI ===
PP.scene_objects.moving_platform.update = function(scene, platformsGroupOrArray) {
    if (!platformsGroupOrArray) return;

    // Se è un gruppo, prendi i figli
    const platforms = platformsGroupOrArray.getChildren
        ? platformsGroupOrArray.getChildren()
        : platformsGroupOrArray;

    for (let plat of platforms) {
        if (!plat || !plat.body) continue;

        // Movimento Y
        if (plat.direction === 'y') {
            plat.body.setVelocityY(plat.forward ? plat.speed : -plat.speed);
            if (plat.y > plat.startY + plat.range) plat.forward = false;
            if (plat.y < plat.startY - plat.range) plat.forward = true;
        }

        // Movimento X (se ti serve)
        else if (plat.direction === 'x') {
            plat.body.setVelocityX(plat.forward ? plat.speed : -plat.speed);
            if (plat.x > plat.startX + plat.range) plat.forward = false;
            if (plat.x < plat.startX - plat.range) plat.forward = true;
        }
    }
};

