// === TUTORIAL SCENE ===
// DICHIARAZIONE VARIABILI
let tutorial_bg;
let baby;
let culla;
let playerLayer;
let propsLayer;
let sign_1;
let sign_2;
let sign_3;
let count = false;


//PRELOAD
function preload_tutorial_scene(scene) {
    tutorial_bg = PP.assets.image.load(scene, "assets/images/tutorial/tutorial_background_long.png", 1800, 920);
    baby = PP.assets.image.load(scene, "assets/images/tutorial/culla_nanashi.png", 100, 100);
    culla = PP.assets.image.load(scene, "assets/images/tutorial/culla.png", 100, 100);
    sign_1 = PP.assets.image.load(scene, "assets/images/tutorial/cartello_1.png", 48, 97);
    sign_2 = PP.assets.image.load(scene, "assets/images/tutorial/cartello_2.png", 48, 97);
    sign_3 = PP.assets.image.load(scene, "assets/images/tutorial/cartello_3.png", 48, 97);

    PP.entities.player.preload(scene);
    PP.entities.enemy.preload(scene);
    PP.scene_objects.platform.preload(scene);
    PP.game_state.lives = PP.assets.sprite.load_spritesheet(scene, "assets/images/heart.png", 120, 50);
}

// === CREAZIONE SCENA ===
function create_tutorial_scene(scene) {

    PP.assets.tilesprite.add(scene, tutorial_bg, 0, -30, 1800, 920, 0, 0);
    PP.game_state.woaed = false;
    playerLayer = PP.layers.create(scene);
    PP.layers.set_z_index(playerLayer, 20);

    PP.game_state.otherWorld = "ghostly_tutorial_scene";
    PP.game_state.currentScene = "tutorial_scene";

    if (!PP.game_state.changingWorld) {
        PP.game_state.isPLayerFlipped = true;
        PP.game_state.tutorialCutscene = true;
        PP.game_state.inRoom = false;
    }

    // === MURI  ===
    const leftWall = PP.shapes.rectangle_add(scene, 500, 365, 20, 720, "0x000000", 0);
    PP.physics.add(scene, leftWall, PP.physics.type.STATIC);

    const behindWall = PP.shapes.rectangle_add(scene, 0, 505, 20, 720, "0x000000", 0);
    PP.physics.add(scene, behindWall, PP.physics.type.STATIC);

    const rightWall = PP.shapes.rectangle_add(scene, 1760, 365, 20, 720, "0x000000", 0);
    PP.physics.add(scene, rightWall, PP.physics.type.STATIC);

    // === GROUND (espanso) ===
    const ground = PP.shapes.rectangle_add(scene, 4080, 870, 8700, 10, "0x000000", 0);
    PP.physics.add(scene, ground, PP.physics.type.STATIC);

    // === PIATTAFORME  ===
    const platformPositions = [
        { x: 1270, y: 675, w: 150, h: 40, sprite_name: "piattaforma" },
        { x: 1480, y: 773, w: 100, h: 90, sprite_name: "rialzino" },
        { x: 828, y: 470, w: 40, h: 395, sprite_name: "palo" },
        { x: 850, y: 550, w: 150, h: 20, sprite_name: "basetta_1" },
        { x: 655, y: 640, w: 150, h: 20, sprite_name: "basetta_2" },
        { x: 615, y: 773, w: 100, h: 90, sprite_name: "rialzino" },
    ];

    PP.game_state.platforms = PP.scene_objects.platform.create(scene, platformPositions);

    // PIATTAFORME MONDO SPETTRALE
    const ghostlyPlatformPositions = [
        { x: 970, y: 600, w: 150, h: 40, sprite_name: "particelle" } 
    ];

    PP.game_state.ghostlyPlatforms = PP.scene_objects.platform.create(scene, ghostlyPlatformPositions);

    // === BAMBINO  ===
    let cullaImage = PP.game_state.nanashiState === "taken" ? culla : baby;          
    baby = PP.assets.image.add(scene, cullaImage, 200, 765, 0, 0);
    PP.physics.add(scene, baby, PP.physics.type.STATIC);

    // === PLAYER ===
    let startX, startY;

    if (PP.game_state.respawn) {
      startX = 1700;
      startY = 400;
      PP.game_state.respawn = false;
  } else {
      startX = scene.scene.settings.data?.x ?? PP.game_state.playerPosition?.x ?? 1700;
      startY = scene.scene.settings.data?.y ?? PP.game_state.playerPosition?.y ?? 400;
    }

    PP.game_state.player = PP.entities.player.create(scene, startX, startY);
    PP.layers.add_to_layer(playerLayer, PP.game_state.player);
    // creo un layer per permettere al player di trovarsi davanti ai cartelli

    // === COLLIDER PLAYER ===
    PP.physics.add_collider(scene, PP.game_state.player, ground);
    PP.physics.add_collider(scene, PP.game_state.player, leftWall);
    PP.physics.add_collider(scene, PP.game_state.player, behindWall);
    PP.physics.add_collider(scene, PP.game_state.player, rightWall);

    for (let plat of PP.game_state.platforms) {
        PP.physics.add_collider(scene, PP.game_state.player, plat);
    }

    if (PP.game_state.changingWorld) {
        PP.game_state.player.geometry.x = config.player_x;
        PP.game_state.player.geometry.y = config.player_y;
    }

    // === FINE LIVELLO ===
    const end_level_trigger = PP.shapes.rectangle_add(scene, 550, 800, 40, 40, "0x000000", 0);
    PP.physics.add(scene, end_level_trigger, PP.physics.type.STATIC);
    if (PP.game_state.inRoom == true) {
        PP.physics.add_collider_f(scene, PP.game_state.player, end_level_trigger, () => {PP.scenes.start("house_scene")});
    }

    // === COLLIDER BAMBINO ===
    PP.physics.add_overlap_f(scene, PP.game_state.player, baby, () => {

        if (!PP.game_state.woaed && !PP.game_state.inRoom) {
            let woa = PP.shapes.text_styled_add(scene, 80, 550, "Cosa sta succedendo? Anche il bambino sembra un mostro!", 17, "serif", "normal", "0xffffff", "0x000000", 0, 0);
            PP.game_state.woaed = true;

            PP.timers.add_timer(scene, 2000, () => {
                PP.assets.destroy(woa);

                baby_question(scene, 1);

            }, false);


        } else if (PP.game_state.woaed == false) {
            PP.game_state.woaed = true;

            if (PP.game_state.nanashiState == "taken") {
                baby_question(scene, -1);
            } else if (PP.game_state.nanashiState != "taken") {
                baby_question(scene, 1);
            }
        }
    });

    // === HUD VITE ===
    PP.game_state.hearts = [];

    // PERDITA VITE
    for (let i = 0; i < PP.game_state.player.maxLives; i++) {
    let x = 60 + (i * 80);
    let heart = PP.assets.sprite.add(scene, PP.game_state.lives, x, 50, 0.5, 0.5);

    // ASSET DEI CUORI
    PP.assets.sprite.animation_add(heart, "full", 0, 0, 1, 0);
    PP.assets.sprite.animation_add(heart, "empty", 1, 8, 8, 0);
    PP.assets.sprite.animation_add(heart, "staticempty", 8, 0, 0.01, 0);

    heart.tile_geometry.scroll_factor_x = 0;
    heart.tile_geometry.scroll_factor_y = 0;

    if (i < PP.game_state.player.lives) {
        PP.assets.sprite.animation_play(heart, "full");
    } else {
        PP.assets.sprite.animation_play(heart, "staticempty");
    }

    PP.game_state.hearts.push(heart);
}

    // === NEMICI  ===
    const enemyPositions = [
        { id: "tutorial_lanterna_1", x: 868, y: 530, w: 75, h: 75, speed: 100, sprite_name: "lanterna" }
    ];

    PP.game_state.enemies = [];

    for (let pos of enemyPositions) {
        const state = PP.game_state.enemiesState[pos.id];

        if (state && state.alive === false) continue;

        if (state && typeof state.x === "number" && typeof state.y === "number") {
            pos.x = state.x;
            pos.y = state.y;
        }    

        const created = PP.entities.enemy.create(scene, [pos]);
        PP.game_state.enemies.push(...created);
    }

    for (let enemy of PP.game_state.enemies) {
        PP.layers.add_to_layer(playerLayer, enemy);
        // aggiunto enemy allo stesso layer del player per essere in primo piano rispetto ai cartelli

        // collisioni con terreno e piattaforme
        PP.physics.add_collider(scene, enemy, ground);

        for (let plat of PP.game_state.platforms) {
            PP.physics.add_collider(scene, enemy, plat);
        }

        // Overlap player-nemico
        PP.physics.add_overlap_f(scene, PP.game_state.player, enemy, () => {

            if (PP.game_state.player.isInvincible) return;

         // HUD DANNO
            let i = PP.game_state.player.lives - 1;
            if (i >= 0 && PP.game_state.hearts[i]) {
              PP.assets.sprite.animation_play(PP.game_state.hearts[i], "empty");
            }

            PP.entities.player.damage(scene, PP.game_state.player, enemy);
        });
    }

    // === ATTACCO ===
    scene.input.on("pointerdown", () => {
        PP.entities.player.attack(scene, PP.game_state.player, PP.game_state.enemies);
    });

    // === CAMERA ===
    const worldWidth = rightWall.geometry.body_x - leftWall.geometry.body_x + 20;
    const worldHeight = ground.geometry.body_y + 15;
    scene.cameras.main.setBounds(leftWall.geometry.body_x, 0, worldWidth, worldHeight);
    PP.camera.start_follow(scene, PP.game_state.player, 0, 0);

    if (PP.game_state.changingWorld == true && PP.game_state.player.geometry.x < 500) {
        scene.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
    }

    // === CUTSCENE ===
    if (PP.game_state.tutorialCutscene) {
        const cutscene_trigger = PP.shapes.rectangle_add(scene, 1700, 800, 40, 40, "0x000000", 0);
        PP.physics.add(scene, cutscene_trigger, PP.physics.type.STATIC);
        PP.physics.add_overlap_f(scene, PP.game_state.player, cutscene_trigger, cutscene);
    }

    // === ALTRA STANZA ===
    const cutscene_trigger = PP.shapes.rectangle_add(scene, 500, 800, 40, 40, "0x000000", 0);
    PP.physics.add(scene, cutscene_trigger, PP.physics.type.STATIC);
    PP.physics.add_overlap_f(scene, PP.game_state.player, cutscene_trigger, () => {
        scene.cameras.main.setBounds(0, 0, worldWidth, worldHeight);
        PP.assets.destroy(cutscene_trigger);
    });

    // === ANTI SKIP ===
    const stop = PP.shapes.rectangle_add(scene, 1760, 800, 20, 50, "0x000000", 0);
    PP.physics.add(scene, stop, PP.physics.type.STATIC);
    PP.physics.add_collider_f(scene, PP.game_state.player, stop, () => {
        PP.game_state.tutorialCutscene = true;
        const comeback = PP.shapes.text_styled_add(scene, 900, 400, "Non posso scappare, devo salvare Nanashi...", 17, "serif", "normal", "0xffffff", "0x000000", 0, 0);
        PP.timers.add_timer(scene, 1000, () => {
            PP.assets.destroy(comeback);
            PP.game_state.player.geometry.x -= 50;
        }, false);
        PP.timers.add_timer(scene, 1500, () => {
            PP.game_state.tutorialCutscene = false;
        }, false);
    });

    // === CARTELLI  ===
    propsLayer = PP.layers.create(scene);
    PP.layers.set_z_index(propsLayer, 10);
    // creo il layer dei cartelli posizionandolo dietro a quello del player così da avere il pg in primo piano
   
    // DICHIARO FUNZIONI
    let sign1 = PP.assets.image.add(scene, sign_1, 1600, 740, 0, 0);
    let sign2 = PP.assets.image.add(scene, sign_2, 1455, 650, 0, 0);
    let sign3 = PP.assets.image.add(scene, sign_3, 1250, 550, 0, 0);

    PP.layers.add_to_layer(propsLayer, sign1);
    PP.layers.add_to_layer(propsLayer, sign2);
    PP.layers.add_to_layer(propsLayer, sign3);

    // FISICA
    PP.physics.add(scene, sign1, PP.physics.type.STATIC);
    PP.physics.add(scene, sign2, PP.physics.type.STATIC);
    PP.physics.add(scene, sign3, PP.physics.type.STATIC);

    PP.physics.add_overlap_f(scene, PP.game_state.player, sign1, () => {
        let tutorial = PP.shapes.text_styled_add(scene, 900, 400, "Premi A e D per muoverti in giro. Premi SPAZIO per saltare.", 17, "serif", "normal", "0xffffff", "0x000000", 0, 0);
        PP.timers.add_timer(scene, 250, () => PP.assets.destroy(tutorial), false);
    });

    PP.physics.add_overlap_f(scene, PP.game_state.player, sign2, () => {
        let tutorial = PP.shapes.text_styled_add(scene, 900, 400, "Premi SHIFT per fare uno scatto.", 17, "serif", "normal", "0xffffff", "0x000000", 0, 0);
        PP.timers.add_timer(scene, 250, () => PP.assets.destroy(tutorial), false);
    });

    PP.physics.add_overlap_f(scene, PP.game_state.player, sign3, () => {
        let tutorial = PP.shapes.text_styled_add(scene, 900, 400, "Premi W per cambiare mondo.", 17, "serif", "normal", "0xffffff", "0x000000", 0, 0);
        PP.timers.add_timer(scene, 250, () => PP.assets.destroy(tutorial), false);
    });

    PP.game_state.changingWorld = false;
}

// CUTSCENE
function update_tutorial_scene(scene) {
    if (PP.game_state.tutorialCutscene) return;
    PP.entities.player.update(scene, PP.game_state.player);
    PP.entities.enemy.update(scene, PP.game_state.enemies, PP.game_state.player);

    if (PP.interactive.kb.is_key_down(scene, PP.key_codes.W)) {
        PP.entities.player.changeWorld(scene);
    }

    if (PP.game_state.player) {
        PP.game_state.playerPosition = {
            x: PP.game_state.player.x,
            y: PP.game_state.player.y
        };
    }
    if (PP.game_state.enemies) {
        for (let enemy of PP.game_state.enemies) {
            const state = PP.game_state.enemiesState[enemy.id] || { alive: true };
            state.x = enemy.geometry.x;
            state.y = enemy.geometry.y;
            PP.game_state.enemiesState[enemy.id] = state;
        }
    }
}

// DESTROY
function destroy_tutorial_scene(scene) { }

PP.scenes.add("tutorial_scene", preload_tutorial_scene, create_tutorial_scene, update_tutorial_scene, destroy_tutorial_scene);

// INTERAZIONE COL BAMBINO
function cutscene(scene, player, trigger) {
    PP.assets.destroy(trigger);
    let talk = PP.shapes.text_styled_add(scene, 900, 400, "Devo salvare Nanashi, non posso lasciarlo qui da solo...", 17, "serif", "normal", "0xffffff", "0x000000", 0, 0);

    PP.timers.add_timer(scene, 2000, () => {
        PP.assets.destroy(talk);
        PP.game_state.tutorialCutscene = false;
    }, false);
}

// POSSIBILI RISPOTE ALL'INTEREZIONE COL BAMBINO
function baby_response(scene, type) {
    let interaction;
    if (type === -1) {
        interaction = PP.shapes.text_styled_add(scene, 150, 550, "Non posso portarlo con me, è solo un mostro come tutti gli altri...", 17, "serif", "normal", "0xffffff", "0x000000", 0, 0);
    } else if (type === 1) {
        interaction = PP.shapes.text_styled_add(scene, 150, 550, "Lo porterò con me lo stesso, deve esserci un modo di salvarlo!", 17, "serif", "normal", "0xffffff", "0x000000", 0, 0);
    }

    PP.timers.add_timer(scene, 3000, () => {
        PP.assets.destroy(interaction);
        PP.game_state.woaed = false; // reset per poter interagire di nuovo
    }, false);
}

function baby_question(scene, type) {
    let layer_domanda = PP.layers.create(scene);
    PP.layers.set_z_index(layer_domanda, 10);

    // Testo domanda
    const questionText = (type === 1) ? "Vuoi prendere Nanashi?" : "Vuoi lasciare Nanashi?";
    let askChild = PP.shapes.text_add(scene, 150, 550, questionText);

    // Pulsanti
    let button_si = PP.shapes.text_styled_add(scene, 180, 580, "Si", 17, "serif", "normal", "0xffffff", "0x000000", 0, 0);
    let button_no = PP.shapes.text_styled_add(scene, 330, 580, "No", 17, "serif", "normal", "0xffffff", "0x000000", 0, 0);

    // Aggiungi al layer
    PP.layers.add_to_layer(layer_domanda, askChild);
    PP.layers.add_to_layer(layer_domanda, button_si);
    PP.layers.add_to_layer(layer_domanda, button_no);

    // Logica scelta SÌ
    PP.interactive.mouse.add(button_si, "pointerdown", () => {
        if (type === -1) {
            PP.game_state.nanashiState = "not_taken";   // Aggiorna flag
        } else if (type === 1) {
            PP.game_state.nanashiState = "taken";
            // cambia sprite culla → vuota
            PP.assets.destroy(baby);
            baby = PP.assets.image.add(scene, culla, 200, 765, 0, 0);
            PP.physics.add(scene, baby, PP.physics.type.STATIC);      
        }

        PP.entities.player.setSpriteByNanashiState(scene, PP.game_state.player); // forza aggiornamento sprite
        PP.assets.destroy(layer_domanda);

        // risposta testuale
        baby_response(scene, type);

        if (!PP.game_state.inRoom) PP.game_state.inRoom = true;
        PP.entities.player.refreshWorld(scene, PP.game_state.player);
    });

    // Logica scelta NO
    PP.interactive.mouse.add(button_no, "pointerdown", () => {
        if (type === -1) {
            PP.game_state.nanashiState = "taken";     // risposta contraria
        } else if (type === 1) {
            PP.game_state.nanashiState = "not_taken";
        }

        PP.entities.player.setSpriteByNanashiState(scene, PP.game_state.player);
        PP.assets.destroy(layer_domanda);
        baby_response(scene, -type);

        if (!PP.game_state.inRoom) PP.game_state.inRoom = true;
        
        PP.entities.player.refreshWorld(scene, PP.game_state.player);
    });
}