// === TUTORIAL SCENE ===
let red_heart;
let black_heart;

function preload_tutorial_scene(scene) {
    PP.entities.player.preload(scene);
    PP.scene_objects.platform.preload(scene);
    red_heart = PP.assets.image.load(scene, "assets/images/cuore_rosso.png",120,50);
    black_heart = PP.assets.image.load(scene, "assets/images/cuore_nero.png",120,50);

}
// === CREAZIONE SCENA ===
function create_tutorial_scene(scene) {
    PP.game_state.otherWorld = "ghostly_tutorial_scene";

    // === MURI ===
    const leftWall = PP.shapes.rectangle_add(scene, 0, 360, 40, 720, "0x000000", 0);
    PP.physics.add(scene, leftWall, PP.physics.type.STATIC);

    const rightWall = PP.shapes.rectangle_add(scene, 1280, 360, 40, 720, "0x000000", 0);
    PP.physics.add(scene, rightWall, PP.physics.type.STATIC);

    // === GROUND ===
    const ground = PP.shapes.rectangle_add(scene, 620, 700, 1280, 40, "0x000000", 1);
    PP.physics.add(scene, ground, PP.physics.type.STATIC);
    // === PIATTAFORME ===
    const platformPositions = [ 
        { x: 450, y: 285, w: 40, h: 395, sprite_name: "palo" },  // colonna di sinistra
        { x: 890, y: 480, w: 150, h: 40, sprite_name: "piattaforma" },  // piattaforma iniziale
        { x: 1100, y: 590, w: 110, h: 90, sprite_name: "rialzino" }, // muretto
        { x: 470, y: 380, w: 150, h: 20, sprite_name: "basetta" }, // base del nemico
        { x: 70, y: 650, w: 100, h: 60, sprite_name: "culla" }   // culla del bimbo
    ];

    PP.game_state.platforms = PP.scene_objects.platform.create(scene, platformPositions);

    // === BAMBINO ===
    const baby = PP.shapes.rectangle_add(scene, 70, 600, 40, 40, "0x00ff00", 1);
    PP.physics.add(scene, baby, PP.physics.type.STATIC);

    // === PLAYER ===
    let startX = scene.scene.settings.data?.x ?? PP.game_state.playerPosition?.x ?? 1200;
    let startY = scene.scene.settings.data?.y ?? PP.game_state.playerPosition?.y ?? 500;

    //Check se sta cambaindo mondo
    if(PP.game_state.changingWorld){
        startX = config.player_x;
        startY = config.player_y;
    }

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

    // === HUD VITE (CUORI) ===
    PP.game_state.maxLives = 3;
    PP.game_state.currentLives = 3;
    PP.game_state.hearts = [];

    for (let i = 0; i < PP.game_state.maxLives; i++) {
    const heart = scene.add.image(40 + (i * 40), 40, "red_heart");
    heart.setScrollFactor(0); // rimane sullo schermo
    PP.game_state.hearts.push(heart);
}
    for (let i = 0; i < PP.game_state.maxLives; i++) {
    if (i < PP.game_state.currentLives) {
        PP.game_state.hearts[i].setTexture("red_heart");
    } else {
        PP.game_state.hearts[i].setTexture("black_heart");
    }
}
    
    // === NEMICI ===
    const enemyPositions = [{ x: 400, y: 200, speed: 0 }];
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