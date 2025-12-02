// === TUTORIAL SCENE ===
function preload_tutorial_scene(scene) {
    // Caricamenti opzionali
}

// === CREAZIONE SCENA ===
function create_tutorial_scene(scene) {

    // === MURI ===
    const leftWall = PP.shapes.rectangle_add(scene, 0, 360, 40, 720, "0x000000", 0);
    PP.physics.add(scene, leftWall, PP.physics.type.STATIC);

    const rightWall = PP.shapes.rectangle_add(scene, 1280, 360, 40, 720, "0x000000", 0);
    PP.physics.add(scene, rightWall, PP.physics.type.STATIC);

    // === GROUND ===
    const ground = PP.shapes.rectangle_add(scene, 640, 700, 1280, 40, "0x000000", 1);
    PP.physics.add(scene, ground, PP.physics.type.STATIC);
    // === PIATTAFORME ===
    const platformPositions = [ 
        { x: 250, y: 370, w: 50, h: 400 },  // colonna di sinistra
        { x: 890, y: 480, w: 200, h: 20 },  // piattaforma iniziale
        { x: 1100, y: 650, w: 100, h: 60 }, // muretto
        { x: 500, y: 500, w: 200, h: 20 }, // piattaforma centrale
        { x: 350, y: 350, w: 200, h: 20 }, // base del nemico
        { x: 70, y: 650, w: 100, h: 60 }   // culla del bimbo
    ];

    PP.game_state.platforms = PP.scene_objects.platform.create(scene, platformPositions);

    // === BAMBINO ===
    const baby = PP.shapes.rectangle_add(scene, 70, 600, 40, 40, "0x00ff00", 1);
    PP.physics.add(scene, baby, PP.physics.type.STATIC);

    // === PLAYER ===
    const startX = scene.scene.settings.data?.x ?? PP.game_state.playerPosition?.x ?? 1200;
    const startY = scene.scene.settings.data?.y ?? PP.game_state.playerPosition?.y ?? 500;

    PP.game_state.player = PP.entities.player.create(scene, startX, startY);

    // === COLLIDER PLAYER ===
    PP.physics.add_collider(scene, PP.game_state.player, ground);
    PP.physics.add_collider(scene, PP.game_state.player, leftWall);
    PP.physics.add_collider(scene, PP.game_state.player, rightWall);

    for (let plat of PP.game_state.platforms) {
        PP.physics.add_collider(scene, PP.game_state.player, plat);
    }

    // === COLLDIER BAMBINO ===
     PP.physics.add_overlap_f(scene, PP.game_state.player, baby, () => {
        /*PP.timers.add_timer(scene, 300, (s) => {
             PP.game_state.askChild = PP.shapes.text_add(scene, 640, 360, "Vuoi raccogliere il bambino?");
        }, true);*/

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

    // === HUD VITE ===
    PP.game_state.playerLivesText = PP.shapes.text_add(scene, 20, 20, "Lives:");
    // === NEMICI ===
    const enemyPositions = [{ x: 400, y: 200, speed: 80 }];
    PP.game_state.enemies = PP.entities.enemy.create(scene, enemyPositions);

    for (let enemy of PP.game_state.enemies) {

        // collisioni con terreno e piattaforme
        PP.physics.add_collider(scene, enemy, ground);

        for (let plat of PP.game_state.platforms) {
            PP.physics.add_collider(scene, enemy, plat);
        }

        // Overlap player-nemico
        PP.physics.add_overlap_f(scene, PP.game_state.player, enemy, () => {
            PP.entities.player.damage(scene, PP.game_state.player, enemy);
        });
    }
    // === CLICK DEL MOUSE PER ATTACCARE ===
    scene.input.on("pointerdown", () => {
        PP.entities.player.attack(scene, PP.game_state.player, PP.game_state.enemies);
    });

    // === CAMERA ===
    const worldWidth = rightWall.geometry.body_x - leftWall.geometry.body_x + 40;
    const worldHeight = ground.geometry.body_y + 40;
    scene.cameras.main.setBounds(leftWall.geometry.body_x, 0, worldWidth, worldHeight);
    PP.camera.start_follow(scene, PP.game_state.player, 0, 0);

    PP.game_state.changingWorld = false;
}

function update_tutorial_scene(scene) {
    PP.entities.player.update(scene, PP.game_state.player);
    PP.entities.enemy.update(scene, PP.game_state.enemies, PP.game_state.player);

    if (PP.game_state.player) {
        PP.game_state.playerPosition = {
            x: PP.game_state.player.x,
            y: PP.game_state.player.y
        };
    }
}

function destroy_tutorial_scene(scene) {}


PP.scenes.add("tutorial_scene", preload_tutorial_scene, create_tutorial_scene, update_tutorial_scene, destroy_tutorial_scene);