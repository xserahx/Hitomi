// === bossfight SCENE ===
function preload_bossfight_scene(scene) {
    PP.entities.player.preload(scene);
    scene.load.image('snowflake', 'assets/images/forest/neve.png');
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
    PP.game_state.boss = PP.entities.boss.create(scene);

    // === COLLIDER BOSS ===
    PP.physics.add_collider(scene, PP.game_state.boss, ground);
    for (let plat of PP.game_state.platforms) {
        PP.physics.add_collider(scene, PP.game_state.boss, plat);
    }
    PP.physics.add_overlap_f(scene, PP.game_state.player, PP.game_state.boss, () => {
        console.log("Boss overlap");
        if (PP.game_state.bossIsDead == false && PP.game_state.bossIsFriendly == false) { PP.entities.player.damage(scene, PP.game_state.player, PP.game_state.boss); }
        else if (PP.game_state.bossIsFriendly == true) {

            PP.game_state.askSamurai = PP.shapes.text_add(scene, 200, 360, "Haruki is defeated, i could ask him what is going on.");

            let button_si = PP.shapes.text_add(scene, 150, 400, "Stay");
            let button_no = PP.shapes.text_add(scene, 250, 400, "Don't stay");

            PP.interactive.mouse.add(button_si, "pointerdown", () => {
                PP.assets.destroy(PP.game_state.askSamurai);
                PP.assets.destroy(button_si);
                PP.assets.destroy(button_no);
                let victory = PP.shapes.text_add(scene, 580, 400, "Good ending is currently a work in progress, but thanks for playing!");
            });
            PP.interactive.mouse.add(button_no, "pointerdown", () => {
                PP.assets.destroy(PP.game_state.askSamurai);
                PP.assets.destroy(button_si);
                PP.assets.destroy(button_no);
            });
        }
    });

    // === CLICK DEL MOUSE PER ATTACCARE ===
    scene.input.on("pointerdown", () => {
        PP.entities.player.attack(scene, PP.game_state.player, PP.game_state.boss);
    });

        // --- NEVE ---
    // array per i fiocchi
    scene.snowflakes = [];

    // timer che crea fiocchi
    scene.time.addEvent({
        delay: 200,
        callback: () => {
            const x = Phaser.Math.Between(0, scene.sys.game.config.width);
            const flake = scene.add.image(x, 0, 'snowflake').setScale(0.2);
            scene.snowflakes.push(flake);
        },
        loop: true
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

    // muovi i fiocchi verso il basso
    for (let flake of scene.snowflakes) {
        flake.y += 2; // velocità caduta
        if (flake.y > scene.sys.game.config.height) {
            flake.destroy();
        }
    }

    if (config.player_is_hit == true) {
        console.log("Player hit!");
        PP.entities.player.damage(scene, PP.game_state.player);
        config.player_is_hit = false;
    }

    if(PP.game_state.bossIsFriendly == true){
        let go_away = PP.shapes.text_add(scene, 580, 500, "Run from the forest! --->");
    }
}

function destroy_bossfight_scene(scene) { }


PP.scenes.add("bossfight_scene", preload_bossfight_scene, create_bossfight_scene, update_bossfight_scene, destroy_bossfight_scene);