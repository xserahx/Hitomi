// === ghostly_forest SCENE ===
let help;

let ghostly_forest_bg;
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

function createGhostlyForest(scene, treeSprite, treePositionArray) {
  for (let position of treePositionArray) {
    PP.assets.image.add(scene, treeSprite, position.x, position.y, position.pivot_x, position.pivot_y);
  }
}

const ghostly_forestTrees = [

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
  { x: 2200, y: 790, pivot_x: 0.5, pivot_y: 0.5 },
  { x: 2500, y: 830, pivot_x: 0.5, pivot_y: 0.5 }
];

function preload_ghostly_forest(scene) {
  ghostly_forest_bg = PP.assets.image.load(scene, "assets/images/forest/ghostly_forest_background.png", 1280, 920);
  ghostly_mountains_2_bg = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/montagna1_spettrale.png", 1280, 720);
  ghostly_mountains_bg = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/montagna2_spettrale.png", 1280, 720);
  ghostly_small_tree = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/alberello_spettrale.png", 550, 684);
  ghostly_bamboo_bg = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/recinzione_spettrale.png", 1096, 250);
  ghostly_bush = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/arbusto_spettrale.png", 150, 114);

  PP.game_state.lives = PP.assets.sprite.load_spritesheet(scene, "assets/images/heart.png", 120, 50);
  help = PP.assets.image.load(scene, "assets/images/help_comandi.png", 50, 50);

  PP.scene_objects.platform.preload(scene);
  PP.entities.player.preload(scene);
  PP.entities.enemy.preload(scene);
}

function create_ghostly_forest(scene, data) {

  // === STATO SCENA ===
  PP.game_state.currentScene = "ghostly_forest_scene";
  PP.game_state.otherWorld = "forest_scene";

  // === PARALLASSE ===

  // sfondo lontano
  ghostly_bg_far = PP.assets.tilesprite.add(scene, ghostly_forest_bg, 0, 0, 6402, 920, 0, 0);
  ghostly_bg_far.tile_geometry.scroll_factor_x = 0.15;

  // montagne lontane
  ghostly_bg_mid = PP.assets.tilesprite.add(scene, ghostly_mountains_bg, 0, 200, 6402, 920, 0, 0);
  ghostly_bg_mid.tile_geometry.scroll_factor_x = 0.3;

  // montagne vicine
  ghostly_bg_main = PP.assets.tilesprite.add(scene, ghostly_mountains_2_bg, 0, 200, 6402, 920, 0, 0);
  ghostly_bg_main.tile_geometry.scroll_factor_x = 0.45;

  createGhostlyForest(scene, ghostly_small_tree, ghostly_forestTrees);

  // recinzione in bamboo
  ghostly_bg_front = PP.assets.tilesprite.add(scene, ghostly_bamboo_bg, -20, 750, 6400, 250, 0, 0);

  let ghostly_img_bush = PP.assets.image.add(scene, ghostly_bush, 750, 940, 0.5, 0.5);

  // === PULSANTE HELP ===
  const helpButton = PP.assets.image.add(scene, help, 1220, 45, 0.5, 0.5);
  helpButton.tile_geometry.scroll_factor_x = 0;
  helpButton.tile_geometry.scroll_factor_y = 0;

  // lo rendo cliccabile
  PP.interactive.mouse.add(helpButton, "pointerdown", () => {
    showControlsPopup(scene);
  });

  // === BORDI ===
  const leftWall = PP.shapes.rectangle_add(scene, 0, 460, 5, 1060, "0x000000", 0);
  PP.physics.add(scene, leftWall, PP.physics.type.STATIC);

  const rightWall = PP.shapes.rectangle_add(scene, 5050, 460, 40, 920, "0x000000", 0); // 4690, 420
  PP.physics.add(scene, rightWall, PP.physics.type.STATIC);

  // === GROUND ===
  const ground = PP.shapes.rectangle_add(scene, 3200, 1010, 6400, 40, "0x4a3b2a", 0);
  PP.physics.add(scene, ground, PP.physics.type.STATIC);

  // === PIATTAFORME ===
  const platformPositions = [

    // === PRIME PIATTAFORME ===
    { x: 410, y: 875, w: 150, h: 20, sprite_name: "piattaforma_foresta" },
    { x: 650, y: 865, w: 150, h: 20, sprite_name: "piattaforma_foresta" },
    { x: 820, y: 782, w: 150, h: 20, sprite_name: "piattaforma_foresta" },

    // === TRONCO DA SCAVALCARE ===
    { x: 1050, y: 770, w: 200, h: 480, sprite_name: "tronco" },
    { x: 1600, y: 640, w: 290, h: 390, sprite_name: "roccia_1" },
//    { x: 1900, y: 825, w: 150, h: 20, sprite_name: "piattaforma_foresta" }, //SOLO MONDO FRNTASMA

    // === PIATTAFORME PRIMA DELLA SCALA ===
    //{ x: 1780, y: 665, w: 150, h: 20, sprite_name: "roccia_2" },
    { x: 2200, y: 640, w: 320, h: 390, sprite_name: "roccia_2" }, //SOLO MONDO REALE
    { x: 2510, y: 825, w: 150, h: 20, sprite_name: "piattaforma_foresta" }, //SOLO MONDO REALE

    // === ALBERO DA SCALARE ===
//    { x: 2880, y: 765, w: 150, h: 20, sprite_name: "piattaforma_foresta" },

//    { x: 3000, y: 515, w: 150, h: 20, sprite_name: "particelle" }, 
//    { x: 3000, y: 215, w: 150, h: 20, sprite_name: "particelle" },DIVENTANO VERE. 655
    { x: 3050, y: 655, w: 150, h: 20, sprite_name: "piattaforma_foresta" },
    { x: 3050, y: 515, w: 150, h: 20, sprite_name: "piattaforma_foresta" },
    { x: 3050, y: 215, w: 150, h: 20, sprite_name: "piattaforma_foresta" },
    { x: 3250, y: 165, w: 150, h: 20, sprite_name: "piattaforma_foresta" },
    { x: 3900, y: 500, w: 150, h: 20, sprite_name: "piattaforma_foresta" }, 
    //{ x: 3700, y: 400, w: 100, h: 20, sprite_name: "piattaforma_foresta" },
    //{ x: 3900, y: 500, w: 100, h: 20, sprite_name: "piattaforma" },

    // PIATTAFORME FINALI
    //{ x: 3990, y: 665, w: 100, h: 20, sprite_name: "piattaforma" },
    { x: 4490, y: 850, w: 150, h: 20, sprite_name: "piattaforma_foresta" }, 
    // { x: 4550, y: 850, w: 200, h: 20, sprite_name: "piattaforma" }

  ];

  PP.game_state.platforms = PP.scene_objects.platform.create(scene, platformPositions);

  // === PIATTAFORME NEL MONDO SPETTRALE ===     ** -80 **
  const ghostlyPlatformPositions = [

    { x: 1820, y: 825, w: 150, h: 20, sprite_name: "particelle" }, // in mezzo alle rocce 
    { x: 2420, y: 590, w: 150, h: 20, sprite_name: "particelle" }, // secondo fantasma
    { x: 2800, y: 765, w: 150, h: 20, sprite_name: "particelle" },
    { x: 2970, y: 375, w: 150, h: 20, sprite_name: "particelle" }, //HELL NO
    { x: 4190 - 80, y: 665, w: 150, h: 20, sprite_name: "particelle" }, //penultimo //vero
    { x: 3550 - 80, y: 325, w: 150, h: 20, sprite_name: "particelle" } //ultimo //vero

    

  ];

  PP.game_state.ghostlyPlatforms = PP.scene_objects.platform.create(scene, ghostlyPlatformPositions);

  // === PLAYER ===
  let startX = scene.scene.settings.data?.x ?? PP.game_state.playerPosition?.x ?? 40;
  let startY = scene.scene.settings.data?.y ?? PP.game_state.playerPosition?.y ?? 800;

  PP.game_state.player = PP.entities.player.create(scene, startX, startY)

  // Collider player
  PP.physics.add_collider(scene, PP.game_state.player, ground);
  PP.physics.add_collider(scene, PP.game_state.player, leftWall);
  PP.physics.add_collider(scene, PP.game_state.player, rightWall);

  for (let plat of PP.game_state.platforms) {
    PP.physics.add_collider(scene, PP.game_state.player, plat);
  }

  // Check se sta cambiando mondo
  if (PP.game_state.changingWorld) {
    PP.game_state.player.geometry.x = config.player_x;
    PP.game_state.player.geometry.y = config.player_y;
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

  // === NEMICI ===
  const enemyPositions = [
    { x: 400, y: 855, sprite_name: "lanterna" },
    { x: 1200, y: 970, sprite_name: "lanterna" }, //slug
    { x: 1890, y: 970, sprite_name: "lanterna" }, //pterodattilo
    { x: 3150, y: 970, sprite_name: "lanterna" },
    { x: 3350, y: 970, sprite_name: "lanterna" }, //pterodattilo
    { x: 3550, y: 970, sprite_name: "lanterna" } //slug

  ];

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

  // === CAMERA ===
  const worldWidth = rightWall.geometry.body_x - leftWall.geometry.body_x + 40;
  const worldHeight = ground.geometry.body_y + 10;
  scene.cameras.main.setBounds(leftWall.geometry.body_x, 0, worldWidth, worldHeight);
  PP.camera.start_follow(scene, PP.game_state.player, 0, 0);


  // === CLICK DEL MOUSE PER ATTACCARE ===
  scene.input.on("pointerdown", () => {
  // click su UI → niente attacco
  if (PP.game_state.uiBlockingInput) return;

  // gioco in pausa 
  if (PP.game_state.pause) return;

  PP.entities.player.attack(scene, PP.game_state.player, PP.game_state.enemies
  );
});

  PP.game_state.changingWorld = false;
}

function update_ghostly_forest(scene) {
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
  // === FINE LIVELLO ===
  if (PP.game_state.player.geometry.x >= 5005) {
    PP.scenes.start("bossfight_scene");
  }
}

function destroy_ghostly_forest(scene) {
  // Pulizia risorse se necessaria
}

// === AGGIUNGI LA SCENA ===
PP.scenes.add('ghostly_forest_scene', preload_ghostly_forest, create_ghostly_forest, update_ghostly_forest, destroy_ghostly_forest);

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
