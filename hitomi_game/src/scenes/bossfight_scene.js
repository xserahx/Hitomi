// === bossfight SCENE ===
let count=0;
let help;

let bossfight_bg;
let ghostly_mountains_bg;
let ghostly_mountains_2_bg;
let ghostly_small_tree;
let ghostly_bamboo_bg;

let ghostly_tori;
let ghostly_bamboo_rev;
let ghostly_bamboo_rev_2; 
let ghostly_bamboo;

let ghostly_bg_far;
let ghostly_bg_mid;
let ghostly_bg_main;
let ghostly_bg_trees;
let ghostly_bg_front;

function createbossfight(scene, treeSprite, treePositionArray) {
  for (let position of treePositionArray) {
    PP.assets.image.add(scene, treeSprite, position.x, position.y, position.pivot_x, position.pivot_y);
  }
}

const bossfightTrees = [

  { x: 200, y: 780, pivot_x: 0.5, pivot_y: 0.5 },
  { x: 100, y: 830, pivot_x: 0.5, pivot_y: 0.5 },
  { x: 300, y: 780, pivot_x: 0.5, pivot_y: 0.5 },/*
  { x: 450, y: 810, pivot_x: 0.5, pivot_y: 0.5 },


  { x: 700, y: 830, pivot_x: 0.5, pivot_y: 0.5 },
  { x: 900, y: 800, pivot_x: 0.5, pivot_y: 0.5 },
  { x: 1100, y: 780, pivot_x: 0.5, pivot_y: 0.5 },
  { x: 1300, y: 810, pivot_x: 0.5, pivot_y: 0.5 },

  { x: 1600, y: 750, pivot_x: 0.5, pivot_y: 0.5 },
  { x: 2000, y: 830, pivot_x: 0.5, pivot_y: 0.5 },
  { x: 1400, y: 780, pivot_x: 0.5, pivot_y: 0.5 },
  { x: 1800, y: 800, pivot_x: 0.5, pivot_y: 0.5 },*/
];

function preload_bossfight_scene(scene) {
  bossfight_bg = PP.assets.image.load(scene, "assets/images/forest/ghostly_forest_background.png", 1280, 920);
  ghostly_mountains_2_bg = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/montagna1_spettrale.png", 1280, 720);
  ghostly_mountains_bg = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/montagna2_spettrale.png", 1280, 720);
  ghostly_small_tree = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/alberello_spettrale.png", 550, 684);
  ghostly_bamboo_bg = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/recinzione_spettrale.png", 1096, 250);

  PP.game_state.lives = PP.assets.sprite.load_spritesheet(scene, "assets/images/heart.png", 120, 50);
  help = PP.assets.image.load(scene, "assets/images/help_comandi.png", 50, 50);

  PP.scene_objects.platform.preload(scene);
  PP.entities.player.preload(scene);
  PP.entities.enemy.preload(scene);
  PP.entities.boss.preload(scene);
    ghostly_tori = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/tori_spettrale.png", 400, 600);


 ghostly_bamboo_rev = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/bamboo_reverse_spettrale.png", 1096, 250);
  ghostly_bamboo_rev_2 = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/bamboo_reverse_spettrale.png", 1096, 250);
  ghostly_bamboo = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/bamboo_spettrale.png", 1096, 250);
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



  ghostly_bamboo_rev = PP.assets.image.add(scene, ghostly_bamboo_rev, 200, 0, 0, 0);
  ghostly_bamboo_rev_2 = PP.assets.image.add(scene, ghostly_bamboo_rev_2, 800, 0, 0, 0);

  ghostly_bamboo = PP.assets.image.add(scene, ghostly_bamboo, 300, 0, 0, 0);


 ghostly_tori = PP.assets.tilesprite.add(scene, ghostly_tori, 370, 400, 900, 1000, 0, 0);
  ghostly_tori.tile_geometry.scroll_factor_x = 0.55;


  createbossfight(scene, ghostly_small_tree, bossfightTrees);

  // recinzione in bamboo
  ghostly_bg_front = PP.assets.tilesprite.add(scene, ghostly_bamboo_bg, -20, 750, 6400, 250, 0, 0);

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
  const startY = scene.scene.settings.data?.y ?? PP.game_state.playerPosition?.y ?? 930;

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

  // === HUD VITE ===
  PP.game_state.hearts = [];

  for (let i = 0; i < PP.game_state.player.maxLives; i++) {
    let x = 60 + (i * 80);
    let heart = PP.assets.sprite.add(scene, PP.game_state.lives, x, 50, 0.5, 0.5);

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

  // === BOSS ===
  PP.game_state.boss = PP.entities.boss.create(scene);

  // === COLLIDER BOSS ===
  PP.physics.add_collider(scene, PP.game_state.boss, ground);
  for (let plat of PP.game_state.platforms) {
    PP.physics.add_collider(scene, PP.game_state.boss, plat);
  }

  // Overlap player-nemico
  PP.physics.add_overlap_f(scene, PP.game_state.player, PP.game_state.boss, () => {
    if (PP.game_state.bossIsFriendly == true && count==0) {
      
      count++;

      PP.game_state.askSamurai = PP.shapes.text_add(scene, 200, 830, "Haruki è sconfitto, dovrei chiedergli cosa sta succedendo?");

      let button_si = PP.shapes.text_add(scene, 230, 860, "Resta");
      let button_no = PP.shapes.text_add(scene, 580, 860, "Vai via");

      PP.interactive.mouse.add(button_si, "pointerdown", () => {
        PP.assets.destroy(PP.game_state.askSamurai);
        PP.assets.destroy(button_si);
        PP.assets.destroy(button_no);
        if (PP.game_state.nanashiState == "taken") { PP.scenes.start("musubi_scene"); }
        else { PP.scenes.start("kakurebi_scene"); }
      });
      PP.interactive.mouse.add(button_no, "pointerdown", () => {
        
        PP.assets.destroy(PP.game_state.askSamurai);
        PP.assets.destroy(button_si);
        PP.assets.destroy(button_no);
        count = 0;
      });
    }
  });

  // === CAMERA ===
  const worldWidth = rightWall.geometry.body_x - leftWall.geometry.body_x;
  const worldHeight = ground.geometry.body_y + 10;
  scene.cameras.main.setBounds(leftWall.geometry.body_x + 20, 0, worldWidth, worldHeight);
  PP.camera.start_follow(scene, PP.game_state.player, 0, 0);


  // === CLICK DEL MOUSE PER ATTACCARE ===
  scene.input.on("pointerdown", () => {
    PP.entities.player.attack(scene, PP.game_state.player, PP.game_state.boss);
  });

  // === TRIGGER CUTSCENE ===
  const trigger = PP.shapes.rectangle_add(scene, 70, 850, 50, 50, "0x123456", 0);
  PP.physics.add(scene, trigger, PP.physics.type.STATIC);

  PP.physics.add_overlap_f(scene, PP.game_state.player, trigger, () => {
    let talk = PP.shapes.text_add(scene, 800, 725, "Goody fermati! Possiamo ancora parlarne!");
    let answer;
    let retalk

    PP.assets.destroy(trigger);

    PP.timers.add_timer(scene, 2000, (scene) => {
      answer = PP.shapes.text_add(scene, 200, 725, "Lasciami stare, Yokai!");
      PP.assets.destroy(talk);
    }, false);

    PP.timers.add_timer(scene, 4000, (scene) => {
      PP.assets.destroy(answer);
      retalk = PP.shapes.text_add(scene, 800, 725, "Non posso lasciarti andare via così...");
    }, false);

    PP.timers.add_timer(scene, 6000, (scene) => {
      PP.assets.destroy(retalk);

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

function showControlsPopup(scene) {

  // SE POP UP GIÀ APERTO, NON FARE NULLA
  if (PP.game_state.controlsPopupOpen) return;
  PP.game_state.controlsPopupOpen = true;

  // PAUSA MOVIMENTO PLAYER  SE POP UP APERTO
  PP.game_state.pause = true;
  PP.game_state.uiBlockingInput = true;

  const popupLayer = PP.layers.create(scene);
  PP.layers.set_z_index(popupLayer, 100);

  const cam = scene.cameras.main;
  const centerX = cam.centerX;
  const centerY = cam.centerY;

  // === OVERLAY SCURO ===
  const overlay = PP.shapes.rectangle_add(scene, centerX, centerY, cam.width, cam.height, "0x000000", 0.45);
  overlay.tile_geometry.scroll_factor_x = 0;
  overlay.tile_geometry.scroll_factor_y = 0;

  // === PANNELLO TESTI ===
  const panel = PP.shapes.rectangle_add(scene, centerX, centerY, 760, 420, "0x5c0a0a", 0.95);
  panel.tile_geometry.scroll_factor_x = 0;
  panel.tile_geometry.scroll_factor_y = 0;

  // === TESTO COMANDI ===
  const text = PP.shapes.text_add(scene, centerX - 120, centerY - 60,
    "TUTORIAL COMANDI\n\n" +
    "A / D  oppure  ← / → : Muovi\n" +
    "SPAZIO : Salta\n" +
    "SHIFT : Scatto\n" +
    "CLICK SINISTRO : Attacca\n" +
    "U : Cambia mondo"
  );

  text.tile_geometry.scroll_factor_x = 0;
  text.tile_geometry.scroll_factor_y = 0;

  // === BOTTONE CHIUDI ===
  const closeBtn = PP.shapes.text_add(scene, centerX - 120, centerY + 100, "Chiudi 閉じる");
  closeBtn.tile_geometry.scroll_factor_x = 0;
  closeBtn.tile_geometry.scroll_factor_y = 0;

  // hover
  PP.interactive.mouse.add(closeBtn, "pointerover", () => {
    closeBtn.setScale(1.1);
  });

  PP.interactive.mouse.add(closeBtn, "pointerout", () => {
    closeBtn.setScale(1);
  });

  // === LAYER ===
  PP.layers.add_to_layer(popupLayer, overlay);
  PP.layers.add_to_layer(popupLayer, panel);
  PP.layers.add_to_layer(popupLayer, text);
  PP.layers.add_to_layer(popupLayer, closeBtn);

  // === CHIUSURA ===
  PP.interactive.mouse.add(closeBtn, "pointerdown", () => {

    PP.assets.destroy(overlay);
    PP.assets.destroy(panel);
    PP.assets.destroy(text);
    PP.assets.destroy(closeBtn);

    PP.game_state.pause = false;
    PP.game_state.controlsPopupOpen = false;
    PP.game_state.uiBlockingInput = false;
  });
}
