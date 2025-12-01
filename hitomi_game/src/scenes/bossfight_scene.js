// === bossfight SCENE ===
function preload_bossfight_scene(scene) {
    // Caricamenti opzionali
}

// === CREAZIONE SCENA ===
function create_bossfight_scene(scene) {

    // === GROUND ===
    const ground = PP.shapes.rectangle_add(scene, 640, 700, 1280, 40, "0x000000", 1);
    PP.physics.add(scene, ground, PP.physics.type.STATIC);
    // === PIATTAFORME ===
    const platformPositions = [
        { x: -5, y: 360, w: 10, h: 720 },
        { x: 1285, y: 360, w: 10, h: 720 }
    ];

    PP.game_state.platforms = PP.scene_objects.platform.create(scene, platformPositions);

    // === PLAYER ===
    const startX = scene.scene.settings.data?.x ?? PP.game_state.playerPosition?.x ?? 70;
    const startY = scene.scene.settings.data?.y ?? PP.game_state.playerPosition?.y ?? 500;

    PP.game_state.player = PP.entities.player.create(scene, startX, startY);

    // === COLLIDER PLAYER ===
    PP.physics.add_collider(scene, PP.game_state.player, ground);

    for (let plat of PP.game_state.platforms) {
        PP.physics.add_collider(scene, PP.game_state.player, plat);
    }

    // === HUD VITE ===
    PP.game_state.playerLivesText = PP.shapes.text_add(scene, 20, 20, "Lives:");
    // === BOSS ===
    PP.game_state.boss = PP.entities.boss.create(scene)
    PP.physics.add_collider(scene, PP.game_state.boss, ground);
    for (let plat of PP.game_state.platforms) {
        PP.physics.add_collider(scene, PP.game_state.boss, plat);
    }
    PP.physics.add_overlap_f(scene, PP.game_state.player, PP.game_state.boss, () => {
        PP.entities.player.damage(scene, PP.game_state.player, PP.game_state.boss);
    });

    // === CLICK DEL MOUSE PER ATTACCARE ===
    scene.input.on("pointerdown", () => {
        PP.entities.player.attack(scene, PP.game_state.player, PP.game_state.boss);
    });

    PP.game_state.changingWorld = false;
}

function update_bossfight_scene(scene) {
    PP.entities.player.update(scene, PP.game_state.player);
    PP.entities.boss.update(scene, PP.game_state.boss, PP.game_state.player);

    if (PP.game_state.player) {
        PP.game_state.playerPosition = {
            x: PP.game_state.player.x,
            y: PP.game_state.player.y
        };
    }
}

function destroy_bossfight_scene(scene) {}


PP.scenes.add("bossfight_scene", preload_bossfight_scene, create_bossfight_scene, update_bossfight_scene, destroy_bossfight_scene);