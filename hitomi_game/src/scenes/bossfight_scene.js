// === bossfight SCENE ===
let help;

let bossfight_bg;
let ghostly_mountains_bg;
let ghostly_mountains_2_bg;
let ghostly_small_tree;
let ghostly_bamboo_bg;
let ghostly_bush;

let ghostly_bg_far;
let ghostly_bg_mid;
let ghostly_bg_main;
let ghostly_bg_trees;
let ghostly_bg_front;

function createbossfight(scene, treeSprite, treePositionArray) {
  for (let position of treePositionArray) {
    PP.assets.image.add(scene,treeSprite,position.x,position.y,position.pivot_x,position.pivot_y);
  }
}

const bossfightTrees = [

  { x: 200, y: 780, pivot_x: 0.5, pivot_y: 0.5 },
  { x: 100, y: 830, pivot_x: 0.5, pivot_y: 0.5 },
  { x: 300, y: 780, pivot_x: 0.5, pivot_y: 0.5 },
  { x: 450, y: 810, pivot_x: 0.5, pivot_y: 0.5 },
 
 
  { x: 700, y: 830, pivot_x: 0.5, pivot_y: 0.5 },
  { x: 900, y: 800, pivot_x: 0.5, pivot_y: 0.5 },
  { x: 1100, y: 780, pivot_x: 0.5, pivot_y: 0.5 },
  { x: 1300, y: 810, pivot_x: 0.5, pivot_y: 0.5 },

  { x: 1600, y: 750, pivot_x: 0.5, pivot_y: 0.5 },
  { x: 2000, y: 830, pivot_x: 0.5, pivot_y: 0.5 },
  { x: 1400, y: 780, pivot_x: 0.5, pivot_y: 0.5 },
  { x: 1800, y: 800, pivot_x: 0.5, pivot_y: 0.5 },
];

function preload_bossfight_scene(scene) {
  bossfight_bg = PP.assets.image.load(scene,"assets/images/forest/ghostly_forest_background.png",1280,920);
  ghostly_mountains_2_bg = PP.assets.image.load(scene,"assets/images/forest/parallasse_spettrale/montagna1_spettrale.png",1280,720);
  ghostly_mountains_bg = PP.assets.image.load(scene,"assets/images/forest/parallasse_spettrale/montagna2_spettrale.png",1280,720);
  ghostly_small_tree = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/alberello_spettrale.png",550, 684);
  ghostly_bamboo_bg = PP.assets.image.load(scene,"assets/images/forest/parallasse_spettrale/recinzione_spettrale.png",1096,250);
  ghostly_bush = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/arbusto_spettrale.png",150,114);

  PP.game_state.lives = PP.assets.sprite.load_spritesheet(scene,"assets/images/heart.png",120,50);
  help = PP.assets.image.load(scene, "assets/images/help_comandi.png", 50, 50);

  PP.scene_objects.platform.preload(scene);
  PP.entities.player.preload(scene);
  PP.entities.enemy.preload(scene);
}

// === CREAZIONE SCENA ===
function create_bossfight_scene(scene) {
    PP.game_state.currentScene = "bossfight_scene";
    PP.game_state.bossCutsceneDone = false;
    PP.game_state.duringBossCutscene = true;

 // === PARALLASSE ===
  // sfondo lontano
  ghostly_bg_far = PP.assets.tilesprite.add(scene, bossfight_bg, -20, -30, 6400, 920, 0, 0);
  ghostly_bg_far.tile_geometry.scroll_factor_x = 0.15;

  // montagne lontane
  ghostly_bg_mid = PP.assets.tilesprite.add(scene, ghostly_mountains_bg, 0, 200, 6400, 920, 0, 0);
  ghostly_bg_mid.tile_geometry.scroll_factor_x = 0.3;

  // montagne vicine
  ghostly_bg_main = PP.assets.tilesprite.add(scene, ghostly_mountains_2_bg, 0, 200, 6400, 920, 0, 0);
  ghostly_bg_main.tile_geometry.scroll_factor_x = 0.45;

  createbossfight(scene, ghostly_small_tree, bossfightTrees);

  // recinzione in bamboo
  ghostly_bg_front = PP.assets.tilesprite.add(scene, ghostly_bamboo_bg, -20, 750, 6400, 250, 0, 0);

  let img_bush = PP.assets.image.add(scene, ghostly_bush, 750, 940, 0.5, 0.5);

    // === PULSANTE HELP ===
    const helpButton = PP.assets.image.add(scene, help, 1220, 45, 0.5, 0.5);
    helpButton.tile_geometry.scroll_factor_x = 0;
    helpButton.tile_geometry.scroll_factor_y = 0;

    // lo rendo cliccabile
    PP.interactive.mouse.add(helpButton, "pointerdown", () => {
        showControlsPopup(scene);
    });

    // === BORDI ===
  	const leftWall = PP.shapes.rectangle_add(scene, 0, 630, 40, 950, "0x000000", 0);
    const rightWall = PP.shapes.rectangle_add(scene, 1280, 630, 40, 950, "0x000000", 0);
  	PP.physics.add(scene, leftWall, PP.physics.type.STATIC);
    PP.physics.add(scene, rightWall, PP.physics.type.STATIC);

    // === GROUND ===
    const ground = PP.shapes.rectangle_add(scene, 640, 1010, 1280, 40, "0x000000", 0);
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
    PP.physics.add_collider(scene, PP.game_state.player, leftWall);
    PP.physics.add_collider_f(scene, PP.game_state.player, rightWall, () => {
        if (PP.game_state.bossIsFriendly == true) {
            PP.scenes.start("teitai_scene", { x: 50, y: 500 });
        }
    });

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
        if (!(PP.game_state.player.lives <= 0 && (!PP.game_state.bossIsDead && !PP.game_state.bossIsFriendly))) {

            // HUD DANNO
            let currentIndex = PP.game_state.player.lives - 1;
            PP.assets.sprite.animation_play(PP.game_state.hearts[currentIndex], "Cuore");
        }

        if (!PP.game_state.bossIsDead && !PP.game_state.bossIsFriendly) { PP.entities.player.damage(scene, PP.game_state.player, PP.game_state.boss); }
        else if (PP.game_state.bossIsFriendly == true) {

            PP.game_state.askSamurai = PP.shapes.text_add(scene, 200, 830, "Haruki è sconfitto, dovrei chiedergli cosa sta succedendo?");

            let button_si = PP.shapes.text_add(scene, 230, 860, "Resta");
            let button_no = PP.shapes.text_add(scene, 580, 860, "Vai via");

            PP.interactive.mouse.add(button_si, "pointerdown", () => {
                PP.assets.destroy(PP.game_state.askSamurai);
                PP.assets.destroy(button_si);
                PP.assets.destroy(button_no);
                if (PP.game_state.has_baby == true) { PP.scenes.start("musubi_scene"); }
                else { PP.scenes.start("kakurebi_scene"); }
            });
            PP.interactive.mouse.add(button_no, "pointerdown", () => {
                PP.assets.destroy(PP.game_state.askSamurai);
                PP.assets.destroy(button_si);
                PP.assets.destroy(button_no);
            });
        }
    });

     // === CAMERA ===
    const worldWidth = rightWall.geometry.body_x - leftWall.geometry.body_x +40;
    const worldHeight = ground.geometry.body_y + 10;
    scene.cameras.main.setBounds(leftWall.geometry.body_x + 20, 0, worldWidth, worldHeight);
    PP.camera.start_follow(scene, PP.game_state.player, 0, 0);


    // === CLICK DEL MOUSE PER ATTACCARE ===
    scene.input.on("pointerdown", () => {
        PP.entities.player.attack(scene, PP.game_state.player, PP.game_state.boss);
    });

    // === TRIGGER CUTSCENE ===
    const trigger = PP.shapes.rectangle_add(scene, 70, 450, 50, 50, "0x123456", 0);
    PP.physics.add(scene, trigger, PP.physics.type.STATIC);

    PP.physics.add_overlap_f(scene, PP.game_state.player, trigger, () => {
        let talk = PP.shapes.text_add(scene, 150, 830, "Goody fermati! Possiamo ancora parlarne!");

        PP.assets.destroy(trigger);

        PP.timers.add_timer(scene, 2000, (scene) => {
            PP.shapes.text_change(talk, "Lasciami stare, yokai!");
        }, false);

        PP.timers.add_timer(scene, 4000, (scene) => {
            PP.shapes.text_change(talk, "Non posso farti andare via così...");
        }, false);

        PP.timers.add_timer(scene, 6000, (scene) => {
            PP.assets.destroy(talk);

            PP.game_state.duringBossCutscene = false;
            PP.game_state.bossCutsceneDone = true;
        }, false);

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

    //if (PP.game_state.bossIsFriendly == true) {
    //    let go_away = PP.shapes.text_add(scene, 580, 500, "Run from the forest! --->");
    //}

    if (PP.game_state.bossIsFriendly == true && PP.game_state.player.geometry.x >= 1250) {
        PP.scenes.start("teitai_scene");
    }
}

function destroy_bossfight_scene(scene) { }


PP.scenes.add("bossfight_scene", preload_bossfight_scene, create_bossfight_scene, update_bossfight_scene, destroy_bossfight_scene);

// === FUNZIONE POP UP CONTROLLI ===
function showControlsPopup(scene) {
  PP.game_state.pause = true;
  const popupLayer = PP.layers.create(scene);
  PP.layers.set_z_index(popupLayer, 100);

  // sfondo scuro
  const bg = PP.shapes.rectangle_add(scene, 3830, 460, 7700, 920, "0x000000", 0.8);

  // testo controlli
  const text = PP.shapes.text_add(scene, PP.game_state.player.geometry.x - 300, 600,
    "COMANDI DEL PLATFORM\n\n" +
    "A/D oppure ← / → : Muovi il personaggio\n" +
    "SPAZIO : Salta\n" +
    "SHIFT : Scatto \n" +
    "CLICK SINISTRO DEL MOUSE : Attacca\n" +
    "U : Cambia mondo\n"
  );

  // bottone per chiudere il pop up dei comandi
  const closeBtn = PP.shapes.text_add(scene, PP.game_state.player.geometry.x -220, 740, "CHIUDI");

  //modifico le posizioni per evitaare che escano dallo schermo
  if(PP.game_state.player.geometry.x < 1280){
    text.geometry.x = 400;
    closeBtn.geometry.x = 520;
  }else if(PP.game_state.player.geometry.x > 6400){
    text.geometry.x = 6860;
    closeBtn.geometry.x = 6980;
  }

  // aggiungo tutto al layer
  PP.layers.add_to_layer(popupLayer, bg);
  PP.layers.add_to_layer(popupLayer, text);
  PP.layers.add_to_layer(popupLayer, closeBtn);

  // click su chiudi
  PP.interactive.mouse.add(closeBtn, "pointerdown", () => {
    PP.assets.destroy(bg);
    PP.assets.destroy(text);
    PP.assets.destroy(closeBtn);
    PP.game_state.pause = false;
  });
}