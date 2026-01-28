// === ghostly_tutorial SCENE ===
let ghostly_tutorial_bg;

function preload_ghostly_tutorial_scene(scene) {
    ghostly_tutorial_bg = PP.assets.image.load(scene, "assets/images/tutorial/ghostly_tutorial_background_long.png", 1800, 920);
    PP.scene_objects.platform.preload(scene);
    PP.entities.player.preload(scene);
    PP.game_state.lives = PP.assets.sprite.load_spritesheet(scene, "assets/images/heart.png", 120, 50);
}

// === CREAZIONE SCENA ===
function create_ghostly_tutorial_scene(scene) {
    PP.assets.tilesprite.add(scene, ghostly_tutorial_bg, 0, -30, 1800, 920, 0, 0);
    PP.game_state.otherWorld = "tutorial_scene";

    // === MURI ===
    const leftWall = PP.shapes.rectangle_add(scene, 500, 365, 20, 720, "0x000000", 0);
    PP.physics.add(scene, leftWall, PP.physics.type.STATIC);

    const behindWall = PP.shapes.rectangle_add(scene, 0, 505, 20, 720, "0x000000", 0);
    PP.physics.add(scene, behindWall, PP.physics.type.STATIC);

    const rightWall = PP.shapes.rectangle_add(scene, 1760, 365, 20, 720, "0x000000", 0);
    PP.physics.add(scene, rightWall, PP.physics.type.STATIC);

    // === GROUND (espanso) ===
    const ground = PP.shapes.rectangle_add(scene, 4080, 870, 8700, 10, "0x000000", 0);
    PP.physics.add(scene, ground, PP.physics.type.STATIC);

    // === PIATTAFORME ===
    const platformPositions = [
        { x: 1270, y: 675, w: 150, h: 40, sprite_name: "piattaforma" },  // piattaforma iniziale
        { x: 1030, y: 600, w: 150, h: 40, sprite_name: "piattaforma" },  // piattaforma 
        { x: 1480, y: 773, w: 110, h: 90, sprite_name: "rialzino" }, // muretto
        { x: 828, y: 470, w: 40, h: 395, sprite_name: "palo" },  // palo
        { x: 850, y: 550, w: 150, h: 20, sprite_name: "basetta_1" }, // base del nemico
        { x: 655, y: 640, w: 150, h: 20, sprite_name: "basetta_2" }, // base sopra culla
        { x: 150, y: 805, w: 100, h: 60, sprite_name: "culla" }   // culla del bimbo
    ];

    PP.game_state.platforms = PP.scene_objects.platform.create(scene, platformPositions);

    // === BAMBINO ===
    const baby = PP.shapes.rectangle_add(scene, 185, 785, 40, 40, "0xffffff", 1);
    PP.physics.add(scene, baby, PP.physics.type.STATIC);

    // === PLAYER ===
    let startX = scene.scene.settings.data?.x ?? PP.game_state.playerPosition?.x ?? 1700;
    let startY = scene.scene.settings.data?.y ?? PP.game_state.playerPosition?.y ?? 400;

    PP.game_state.player = PP.entities.player.create(scene, startX, startY);

    // === COLLIDER PLAYER ===
    PP.physics.add_collider(scene, PP.game_state.player, ground);
    PP.physics.add_collider(scene, PP.game_state.player, leftWall);
    PP.physics.add_collider(scene, PP.game_state.player, behindWall);
    PP.physics.add_collider(scene, PP.game_state.player, rightWall);

    for (let plat of PP.game_state.platforms) {
        PP.physics.add_collider(scene, PP.game_state.player, plat);
    }

    //Check se sta cambiando mondo
    if (PP.game_state.changingWorld) {
        PP.game_state.player.geometry.x = config.player_x;
        PP.game_state.player.geometry.y = config.player_y;
    }

    // === FINE LIVELLO ===
    const end_level_trigger = PP.shapes.rectangle_add(scene, 500, 800, 40, 40, "0x000000", 0);
    PP.physics.add(scene, end_level_trigger, PP.physics.type.STATIC);
    if (PP.game_state.endingReady == true) {
        PP.physics.add_collider_f(scene, PP.game_state.player, end_level_trigger, ending_level);
    }


    // === COLLIDER BAMBINO ===
    PP.physics.add_overlap_f(scene, PP.game_state.player, baby, () => {

        if (!PP.game_state.woaed && !PP.game_state.inRoom) {
            let woa = PP.shapes.text_add(scene, 80, 550, "Cosa sta succedendo? Anche il bambino sembra un mostro!");
            PP.game_state.woaed = true;

            PP.timers.add_timer(scene, 2000, () => {
                PP.assets.destroy(woa);

                baby_question(scene, 1);

            }, false);

        } else if (PP.game_state.woaed == false) {
            PP.game_state.woaed = true;
            console.log("Baby check " + PP.game_state.has_baby);

            if (PP.game_state.has_baby == true) {
                baby_question(scene, -1);
            } else if (PP.game_state.has_baby == false) {
                baby_question(scene, 1);
            }
        }

        PP.physics.add_collider_f(scene, PP.game_state.player, end_level_trigger, ending_level);
        PP.game_state.endingReady = true;
    });

    // === HUD VITE ===
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
        { x: 900, y: 200, w: 75, h: 75, speed: 100, sprite_name: "lanterna" }
    ];

    PP.game_state.enemies = PP.entities.enemy.create(scene, enemyPositions);

    for (let enemy of PP.game_state.enemies) {
        PP.physics.add_collider(scene, enemy, ground);
        for (let plat of PP.game_state.platforms) {
            PP.physics.add_collider(scene, enemy, plat);
        }

        // Overlap player-nemico
        PP.physics.add_overlap_f(scene, PP.game_state.player, enemy, () => {

            if (PP.game_state.player.isInvincible) return;

            let currentIndex = PP.game_state.player.lives - 1;
            if (currentIndex >= 0) {
                PP.assets.sprite.animation_play(PP.game_state.hearts[currentIndex], "Cuore");
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
        const comeback = PP.shapes.text_add(scene, 900, 400, "Non posso scappare, devo salvare Nanashi...");
        PP.timers.add_timer(scene, 1000, () => {
            PP.assets.destroy(comeback);
            PP.game_state.player.geometry.x -= 50;
        }, false);
        PP.timers.add_timer(scene, 1500, () => {
            PP.game_state.tutorialCutscene = false;
        }, false);
    });

    // === CARTELLI ===
    const sign1 = PP.shapes.rectangle_add(scene, 1625, 800, 40, 40, "0x00ff00", 1);
    const sign2 = PP.shapes.rectangle_add(scene, 1480, 730, 40, 40, "0x00ff00", 1);
    const sign3 = PP.shapes.rectangle_add(scene, 1270, 640, 40, 40, "0x00ff00", 1);
    const sign4 = PP.shapes.rectangle_add(scene, 1035, 565, 40, 40, "0x00ff00", 1);

    PP.physics.add(scene, sign1, PP.physics.type.STATIC);
    PP.physics.add(scene, sign2, PP.physics.type.STATIC);
    PP.physics.add(scene, sign3, PP.physics.type.STATIC);
    PP.physics.add(scene, sign4, PP.physics.type.STATIC);

    PP.physics.add_overlap_f(scene, PP.game_state.player, sign1, () => {
        let tutorial = PP.shapes.text_add(scene, 900, 400, "Premi A, per muoverti in giro. Premi SPAZIO per saltare.");
        PP.timers.add_timer(scene, 250, () => PP.assets.destroy(tutorial), false);
    });

    PP.physics.add_overlap_f(scene, PP.game_state.player, sign2, () => {
        let tutorial = PP.shapes.text_add(scene, 900, 400, "Premi SHIFT per fare uno scatto.");
        PP.timers.add_timer(scene, 250, () => PP.assets.destroy(tutorial), false);
    });

    PP.physics.add_overlap_f(scene, PP.game_state.player, sign3, () => {
        let tutorial = PP.shapes.text_add(scene, 900, 400, "Premi U per cambiare mondo.");
        PP.timers.add_timer(scene, 250, () => PP.assets.destroy(tutorial), false);
    });

    PP.physics.add_overlap_f(scene, PP.game_state.player, sign4, () => {
        let tutorial = PP.shapes.text_add(scene, 900, 400, "Clicca il tasto sinistro del mouse per attaccare.");

        PP.timers.add_timer(scene, 250, (s) => {
            PP.assets.destroy(tutorial);
        }, false);
    });

    PP.game_state.changingWorld = false;
}

function update_ghostly_tutorial_scene(scene) {
    if (PP.game_state.tutorialCutscene) return;
    PP.entities.player.update(scene, PP.game_state.player);
    PP.entities.enemy.update(scene, PP.game_state.enemies, PP.game_state.player);

    // === CAMBIO MONDO ===
    if (PP.interactive.kb.is_key_down(scene, PP.key_codes.U)) {
        PP.entities.player.changeWorld(scene);
    }

    if (PP.game_state.player) {
        PP.game_state.playerPosition = {
            x: PP.game_state.player.x,
            y: PP.game_state.player.y
        };
    }
}

function destroy_ghostly_tutorial_scene(scene) {
}

PP.scenes.add("ghostly_tutorial_scene", preload_ghostly_tutorial_scene, create_ghostly_tutorial_scene, update_ghostly_tutorial_scene, destroy_ghostly_tutorial_scene);

function cutscene(scene, player, trigger) {
    PP.assets.destroy(trigger);
    let talk = PP.shapes.text_add(scene, 900, 400, "Cosa sta succedendo? Perché tutto è così... spettrale?");

    PP.timers.add_timer(scene, 2000, () => {
        PP.assets.destroy(talk);
        PP.game_state.tutorialCutscene = false;
    }, false);
}

function baby_response(scene, type) {
    let interaction;
    if (type == -1) { interaction = PP.shapes.text_add(scene, 150, 550, "Non posso portarlo con me, è solo un mostro come tutti gli altri..."); }
    else if (type == 1) { interaction = PP.shapes.text_add(scene, 150, 550, "Lo porterò con me lo stesso, deve esserci un modo di salvarlo!"); }

    PP.timers.add_timer(scene, 3000, () => {
        PP.assets.destroy(interaction);
        PP.game_state.woaed = false;
    }, false);
}

function baby_question(scene, type) {
    let layer_domanda = PP.layers.create(scene);
    PP.layers.set_z_index(layer_domanda, 10);

    if (type == -1) { PP.game_state.askChild = PP.shapes.text_add(scene, 150, 550, "Vuoi lasciare Nanashi?"); }
    else if (type == 1) { PP.game_state.askChild = PP.shapes.text_add(scene, 150, 550, "Vuoi prendere Nanashi?"); }

    let button_si = PP.shapes.text_add(scene, 180, 580, "Si");
    let button_no = PP.shapes.text_add(scene, 330, 580, "No");

    PP.layers.add_to_layer(layer_domanda, PP.game_state.askChild);
    PP.layers.add_to_layer(layer_domanda, button_no);
    PP.layers.add_to_layer(layer_domanda, button_si);

    PP.interactive.mouse.add(button_si, "pointerdown", () => {
        if (type == -1) {
            PP.game_state.has_baby = false;
            PP.entities.player.set_sprite_by_state(scene, PP.game_state.player);
        } else if (type == 1) {
            PP.entities.player.get_baby(scene, PP.game_state.player);
            PP.entities.player.set_sprite_by_state(scene, PP.game_state.player);
        }

        PP.assets.destroy(layer_domanda);

        //La risposta condivide il tipo della domanda, perchè affermativa, pertanto se chiede di prenderlo, la risposta positiva è quella che lo prende e viceversa.
        baby_response(scene, type);

        //Nel momento in cui il giocatore sceglie per la prima volta, si considera che sia entrato nella stanza.
        if (PP.game_state.inRoom == false) { PP.game_state.inRoom = true; }
    });

    PP.interactive.mouse.add(button_no, "pointerdown", () => {
        PP.assets.destroy(layer_domanda);

        //La risposta contraria al tipo della domanda, perchè negativa, pertanto se chiede di prenderlo, la risposta negativa è quella che non lo prende e viceversa.
        baby_response(scene, -type);

        if (PP.game_state.inRoom == false) { PP.game_state.inRoom = true; }
    });
}

function ending_level(scene) {
    if (PP.game_state.inRoom == true && PP.game_state.woaed == false) {
        PP.game_state.woaed = true;
        const exitText = PP.shapes.text_add(scene, 250, 250, "Sono pronta a prendere Nananshi e andarmene da qui?");
        if (PP.game_state.has_baby == false) {
            PP.shapes.text_change(exitText, "Sono pronta a lasciare Nananshi e scappare?");
        }

        const yesButton = PP.shapes.text_add(scene, 250, 300, "Si");
        const noButton = PP.shapes.text_add(scene, 350, 300, "No");

        PP.interactive.mouse.add(yesButton, "pointerdown", () => {
            PP.scenes.start("house_scene");
        });

        PP.interactive.mouse.add(noButton, "pointerdown", () => {
            PP.assets.destroy(exitText);
            PP.assets.destroy(yesButton);
            PP.assets.destroy(noButton);
            PP.timers.add_timer(scene, 1000, () => {
                PP.game_state.woaed = false;
            }, false);
        });
    }
}