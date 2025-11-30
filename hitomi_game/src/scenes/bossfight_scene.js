// === bossfight SCENE ===
function preload_bossfight_scene(scene) {
    // Caricamenti opzionali
}

// === CREAZIONE SCENA ===
function create_bossfight_scene(scene) {

    // === GROUND ===
    const ground = PP.shapes.rectangle_add(scene, 640, 700, 1280, 40, "0x000000", 1);
    PP.physics.add(scene, ground, PP.physics.type.STATIC);
    /* === PIATTAFORME ===
    const platformPositions = [
        { x: 150, y: 550, w: 200, h: 20 },
        { x: 395, y: 400, w: 200, h: 20 },
        { x: 640, y: 550, w: 200, h: 20 },
        { x: 885, y: 400, w: 200, h: 20 },
        { x: 1130, y: 550, w: 200, h: 20 }
    ];

    PP.game_state.platforms = PP.scene_objects.platform.create(scene, platformPositions);*/

    // === PLAYER ===
    const startX = scene.scene.settings.data?.x ?? PP.game_state.playerPosition?.x ?? 1200;
    const startY = scene.scene.settings.data?.y ?? PP.game_state.playerPosition?.y ?? 500;

    PP.game_state.player = PP.entities.player.create(scene, startX, startY);

    // === COLLIDER PLAYER ===
    PP.physics.add_collider(scene, PP.game_state.player, ground);

    /*for (let plat of PP.game_state.platforms) {
        PP.physics.add_collider(scene, PP.game_state.player, plat);
    }*/

    // === HUD VITE ===
    PP.game_state.playerLivesText = PP.shapes.text_add(scene, 20, 20, "Lives:");
    // === NEMICI ===
    const bossPositions = [{ x: 400, y: 200, speed: 80 }];
    PP.game_state.enemies = PP.entities.boss.create(scene, bossPositions);

    for (let boss of PP.game_state.enemies) {

        // collisioni con terreno e piattaforme
        PP.physics.add_collider(scene, boss, ground);

        /*for (let plat of PP.game_state.platforms) {
            PP.physics.add_collider(scene, boss, plat);
        }*/

        // Overlap player-nemico
        PP.physics.add_overlap_f(scene, PP.game_state.player, boss, () => {
            PP.entities.player.damage(scene, PP.game_state.player);
        });
    }


    PP.game_state.changingWorld = false;
}

function update_bossfight_scene(scene) {
    PP.entities.player.update(scene, PP.game_state.player);
    PP.entities.boss.update(scene, PP.game_state.enemies, PP.game_state.player);

    if (PP.game_state.player) {
        PP.game_state.playerPosition = {
            x: PP.game_state.player.x,
            y: PP.game_state.player.y
        };
    }

        // === CLICK DEL MOUSE PER ATTACCARE ===
    if (PP.interactive.kb.is_key_down(scene, PP.key_codes.TAB) ){
            console.log("ATTACK");
            PP.entities.player.attack(scene, PP.game_state.player, PP.game_state.enemies);
    }

    if(config.player_is_hit == true){
        PP.entities.player.damage(scene, PP.game_state.player);
        config.player_is_hit = false;
    }
}

function destroy_bossfight_scene(scene) {}


PP.scenes.add("bossfight_scene", preload_bossfight_scene, create_bossfight_scene, update_bossfight_scene, destroy_bossfight_scene);