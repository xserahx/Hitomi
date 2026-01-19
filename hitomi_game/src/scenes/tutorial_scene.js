// === TUTORIAL SCENE ===
let tutorial_bg;

function preload_tutorial_scene(scene) {
    tutorial_bg = PP.assets.image.load(scene, "assets/images/tutorial/tutorial_background.png", 1280, 920);
    PP.entities.player.preload(scene);
    PP.entities.enemy.preload(scene);
    PP.scene_objects.platform.preload(scene);
    PP.game_state.lives = PP.assets.sprite.load_spritesheet(scene, "assets/images/heart.png", 120, 50);
}
// === CREAZIONE SCENA ===
function create_tutorial_scene(scene) {
    PP.assets.tilesprite.add(scene, tutorial_bg, -20, -30, 1280, 920, 0, 0);
    PP.game_state.otherWorld = "ghostly_tutorial_scene";
    PP.game_state.currentScene = "tutorial_scene";
    if(PP.game_state.changingWorld==false){PP.game_state.isPLayerFlipped = true;}

    // === MURI ===
    const leftWall = PP.shapes.rectangle_add(scene, 0, 500, 40, 720, "0x000000", 0);
    PP.physics.add(scene, leftWall, PP.physics.type.STATIC);

    const rightWall = PP.shapes.rectangle_add(scene, 1240, 500, 40, 720, "0x000000", 0);
    PP.physics.add(scene, rightWall, PP.physics.type.STATIC);

    // === GROUND ===
    const ground = PP.shapes.rectangle_add(scene, 3830, 870, 7700, 25, "0x000000", 0);
    PP.physics.add(scene, ground, PP.physics.type.STATIC);

    // === PIATTAFORME ===
    const platformPositions = [ 
        { x: 380, y: 465, w: 40, h: 395, sprite_name: "palo" },  // colonna di sinistra
        { x: 820, y: 675, w: 150, h: 40, sprite_name: "piattaforma" },  // piattaforma iniziale
        { x: 1030, y: 767, w: 110, h: 90, sprite_name: "rialzino" }, // muretto
        { x: 400, y: 550, w: 150, h: 20, sprite_name: "basetta" }, // base del nemico
        { x: 60, y: 797, w: 100, h: 60, sprite_name: "culla" }   // culla del bimbo
    ];

    PP.game_state.platforms = PP.scene_objects.platform.create(scene, platformPositions);

    // === BAMBINO ===
    const baby = PP.shapes.rectangle_add(scene, 95, 777, 40, 40, "0xffffff", 1);
    PP.physics.add(scene, baby, PP.physics.type.STATIC);

    // === PLAYER ===
    let startX = scene.scene.settings.data?.x ?? PP.game_state.playerPosition?.x ?? 1175;
    let startY = scene.scene.settings.data?.y ?? PP.game_state.playerPosition?.y ?? 400;

    PP.game_state.player = PP.entities.player.create(scene, startX, startY);

    // === COLLIDER PLAYER ===
    PP.physics.add_collider(scene, PP.game_state.player, ground);
    PP.physics.add_collider(scene, PP.game_state.player, leftWall);
    PP.physics.add_collider(scene, PP.game_state.player, rightWall);

    for (let plat of PP.game_state.platforms) {
        PP.physics.add_collider(scene, PP.game_state.player, plat);
    }

    // Check se sta cambiando mondo
    if(PP.game_state.changingWorld){
        PP.game_state.player.geometry.x = config.player_x;
        PP.game_state.player.geometry.y = config.player_y;
    }

    // === COLLIDER BAMBINO ===
     PP.physics.add_overlap_f(scene, PP.game_state.player, baby, () => {
        let layer_domanda = PP.layers.create(scene);
        PP.layers.set_z_index(layer_domanda, 10);


        PP.game_state.askChild = PP.shapes.text_add(scene, 640, 360, "Vuoi raccogliere il bambino?");

        let button_si = PP.shapes.text_add(scene, 580, 400, "Si");
        let button_no = PP.shapes.text_add(scene, 780, 400, "No");

        //PP.layers.add_to_layer(layer_domanda, game_state.askChild);
        PP.layers.add_to_layer(layer_domanda, button_no);
        PP.layers.add_to_layer(layer_domanda, button_si);

        PP.interactive.mouse.add(button_si,"pointerdown",() => {
            PP.entities.player.get_baby(scene, PP.game_state.player);
            PP.scenes.start("house_scene");
        });
        PP.interactive.mouse.add(button_no,"pointerdown",() => {
            PP.scenes.start("house_scene");
        });

    });

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
    
    // === NEMICI ===
    const enemyPositions = [
    { x: 400, y: 200, w: 75, h: 75, speed: 100, sprite_name: "lanterna" }
  ] ;
    PP.game_state.enemies = PP.entities.enemy.create(scene, enemyPositions);

    for (let enemy of PP.game_state.enemies) {

        // collisioni con terreno e piattaforme
        PP.physics.add_collider(scene, enemy, ground);

        for (let plat of PP.game_state.platforms) {
            PP.physics.add_collider(scene, enemy, plat);
        }

        // Overlap player-nemico
        PP.physics.add_overlap_f(scene, PP.game_state.player, enemy, () => {
            if (!(PP.game_state.player.lives <= 0) && !PP.game_state.player.isInvincible) {

                // HUD DANNO
                let currentIndex = PP.game_state.player.lives - 1;
                PP.assets.sprite.animation_play(PP.game_state.hearts[currentIndex], "Cuore");
            }
            PP.entities.player.damage(scene, PP.game_state.player, enemy);
        });
    }
    // === CLICK DEL MOUSE PER ATTACCARE ===
    scene.input.on("pointerdown", () => {
        PP.entities.player.attack(scene, PP.game_state.player, PP.game_state.enemies);
    });

    // === CAMERA ===
   const worldWidth = rightWall.geometry.body_x - leftWall.geometry.body_x + 20;
   const worldHeight = ground.geometry.body_y + 20;
   scene.cameras.main.setBounds(leftWall.geometry.body_x, 0, worldWidth, worldHeight);
   PP.camera.start_follow(scene, PP.game_state.player, 0, 0);

    // === CARTELLO ===
    const sign1 = PP.shapes.rectangle_add(scene, 1175, 800, 40, 40, "0x00ff00", 1);
    PP.physics.add(scene, sign1, PP.physics.type.STATIC);
    const sign2 = PP.shapes.rectangle_add(scene, 1030, 730, 40, 40, "0x00ff00", 1);
    PP.physics.add(scene, sign2, PP.physics.type.STATIC);
    const sign3 = PP.shapes.rectangle_add(scene, 820, 640, 40, 40, "0x00ff00", 1);
    PP.physics.add(scene, sign3, PP.physics.type.STATIC);

    PP.physics.add_overlap_f(scene, PP.game_state.player, sign1, () => {
        let tutorial = PP.shapes.text_add(scene, 600, 200, "Press A, D to move around. Press SPACE to jump.");

        PP.timers.add_timer(scene, 250, (s) => {
            PP.assets.destroy(tutorial);
        }, false);
    });

    PP.physics.add_overlap_f(scene, PP.game_state.player, sign2, () => {
        let tutorial = PP.shapes.text_add(scene, 600, 200, "Press SHIFT to dash.");

        PP.timers.add_timer(scene, 250, (s) => {
            PP.assets.destroy(tutorial);
        }, false);
    });

    PP.physics.add_overlap_f(scene, PP.game_state.player, sign3, () => {
        let tutorial = PP.shapes.text_add(scene, 600, 200, "Press U to change world.");

        PP.timers.add_timer(scene, 250, (s) => {
             PP.assets.destroy(tutorial);
        }, false);
    });

    PP.game_state.changingWorld = false;
}

function update_tutorial_scene(scene) {
    PP.entities.player.update(scene, PP.game_state.player);
    PP.entities.enemy.update(scene, PP.game_state.enemies, PP.game_state.player);

        // === CAMBIO MONDO ===
    if (PP.interactive.kb.is_key_down(scene, PP.key_codes.U)) {
        console.log("Changing world");
        PP.entities.player.changeWorld(scene);
    }

    if (PP.game_state.player) {
        PP.game_state.playerPosition = {
            x: PP.game_state.player.x,
            y: PP.game_state.player.y
        };
    }
}

function destroy_tutorial_scene(scene) {}

PP.scenes.add("tutorial_scene", preload_tutorial_scene, create_tutorial_scene, update_tutorial_scene, destroy_tutorial_scene);