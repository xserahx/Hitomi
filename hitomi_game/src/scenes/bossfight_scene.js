// === bossfight SCENE ===
function preload_bossfight_scene(scene) {
    PP.scene_objects.platform.preload(scene);
    PP.entities.player.preload(scene);
    scene.load.image('snowflake', 'assets/images/forest/neve.png');
    PP.game_state.lives = PP.assets.sprite.load_spritesheet(scene, "assets/images/heart.png", 120, 50);
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

    // === HUD VITE (CUORI) ===
    PP.game_state.hearts = [];

    for (let i = 0; i < PP.game_state.player.maxLives; i++) {
        let x = 60 + (i * 80);
        let heart = PP.assets.sprite.add(scene, PP.game_state.lives, x, 50, 0.5, 0.5);
        PP.assets.sprite.animation_add(heart, "Cuore", 0, 8, 8, 1);
        heart.tile_geometry.scroll_factor_x = 0;
        heart.tile_geometry.scroll_factor_y = 0;
        PP.game_state.hearts.push(heart);
    }
    
    // === BOSS ===
    PP.game_state.boss = PP.entities.boss.create(scene);

    // === COLLIDER BOSS ===
    PP.physics.add_collider(scene, PP.game_state.boss, ground);
    for (let plat of PP.game_state.platforms) {
        PP.physics.add_collider(scene, PP.game_state.boss, plat);
    }
    PP.physics.add_overlap_f(scene, PP.game_state.player, PP.game_state.boss, () => {
        console.log("Boss overlap");
        if (!(PP.game_state.player.lives <= 0)) {
            
                // HUD DANNO
                let currentIndex = PP.game_state.player.lives - 1;
                PP.assets.sprite.animation_play(PP.game_state.hearts[currentIndex], "Cuore");
            }
            
        if (!PP.game_state.bossIsDead && !PP.game_state.bossIsFriendly) { PP.entities.player.damage(scene, PP.game_state.player, PP.game_state.boss); }
        else if (PP.game_state.bossIsFriendly == true) {

            PP.game_state.askSamurai = PP.shapes.text_add(scene, 200, 360, "Haruki is defeated, i could ask him what is going on.");

            let button_si = PP.shapes.text_add(scene, 150, 400, "Stay");
            let button_no = PP.shapes.text_add(scene, 250, 400, "Don't stay");

            PP.interactive.mouse.add(button_si, "pointerdown", () => {
                PP.assets.destroy(PP.game_state.askSamurai);
                PP.assets.destroy(button_si);
                PP.assets.destroy(button_no);
                if(PP.game_state.has_baby == true){PP.scenes.start("musubi_scene");}
                else{PP.scenes.start("kakurebi_scene");}
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

    if(PP.game_state.bossIsFriendly == true){
        let go_away = PP.shapes.text_add(scene, 580, 500, "Run from the forest! --->");
    }

    if(PP.game_state.bossIsFriendly == true && PP.game_state.player.geometry.x >= 1250){
        PP.scenes.start("teitai_scene");
    }
}

function destroy_bossfight_scene(scene) { }


PP.scenes.add("bossfight_scene", preload_bossfight_scene, create_bossfight_scene, update_bossfight_scene, destroy_bossfight_scene);