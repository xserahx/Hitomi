// === ghostly_forest SCENE ===
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
  const helpButton = PP.shapes.text_add(scene, 1220, 35, "?");
  helpButton.tile_geometry.scroll_factor_x = 0;
  helpButton.tile_geometry.scroll_factor_y = 0;

  // lo rendo cliccabile
  PP.interactive.mouse.add(helpButton, "pointerdown", () => {
    showControlsPopup(scene);
  });

  // === BORDI ===
  const leftWall = PP.shapes.rectangle_add(scene, 0, 460, 5, 1060, "0x000000", 0);
  PP.physics.add(scene, leftWall, PP.physics.type.STATIC);

  const rightWall = PP.shapes.rectangle_add(scene, 5050, 460, 40, 920, "0x000000", 0);
  PP.physics.add(scene, rightWall, PP.physics.type.STATIC);

  // === GROUND ===
  const ground = PP.shapes.rectangle_add(scene, 3200, 1010, 6400, 40, "0x4a3b2a", 0);
  PP.physics.add(scene, ground, PP.physics.type.STATIC);

  // === PIATTAFORME "TRONCHI" ===
  const platformPositions = [

    // === PRIME PIATTAFORME ===
    { x: 400, y: 850, w: 150, h: 20, sprite_name: "piattaforma" },
    { x: 820, y: 825, w: 150, h: 20, sprite_name: "piattaforma" }, // SOLO MONDO SPETTRALE
    { x: 1060, y: 720, w: 150, h: 20, sprite_name: "piattaforma" },

    // === MASSO (?) DA SCAVALCARE ===
    { x: 1400, y: 730, w: 150, h: 350, sprite_name: "piattaforma" },
    { x: 1532, y: 870, w: 150, h: 20, sprite_name: "piattaforma" },

    // === PIATTAFORME PRIMA DELLA SCALA ===
    { x: 1780, y: 665, w: 150, h: 20, sprite_name: "piattaforma" },
    { x: 2240, y: 665, w: 150, h: 20, sprite_name: "piattaforma" }, // SOLO MONDO SPETTRALE

    // SCALA
    //{ x: 3080, y: 1890, w: 100, h: 20 },  One
    { x: 3050, y: 655, w: 150, h: 20, sprite_name: "piattaforma" }, // Two
    { x: 3050, y: 515, w: 150, h: 20, sprite_name: "piattaforma" }, // Three
    //  { x: 3250, y: 1500, w: 100, h: 20 }, //FOUR

    // BLOCCO A SINISTRA DELLA SCALA
    { x: 3050, y: 215, w: 150, h: 20, sprite_name: "piattaforma" },

    // SECONDA RAMPA DI SCALE 
    { x: 3250, y: 165, w: 150, h: 20, sprite_name: "piattaforma" },
    //  { x: 2675, y: 1110, w: 150, h: 20 },
    { x: 3990, y: -85, w: 150, h: 20, sprite_name: "piattaforma" },  // apice


    //    { x: 3550, y: 325, w: 100, h: 20, sprite_name: "piattaforma" },
    //{ x: 3700, y: 400, w: 100, h: 20, sprite_name: "piattaforma" },


    { x: 3900, y: 500, w: 150, h: 20, sprite_name: "piattaforma" },
    // PIATTAFORME FINALI
    //{ x: 3990, y: 665, w: 100, h: 20, sprite_name: "piattaforma" },
    { x: 4550, y: 850, w: 150, h: 20, sprite_name: "piattaforma" }


  ];

  PP.game_state.platforms = PP.scene_objects.platform.create(scene, platformPositions);


  // === PIATTAFORME NEL MONDO REALE ===
  const ghostlyPlatformPositions = [
    { x: 1970, y: 755, w: 150, h: 20, sprite_name: "particelle" },
    { x: 2510, y: 590, w: 150, h: 20, sprite_name: "particelle" },
    { x: 2880, y: 765, w: 150, h: 20, sprite_name: "particelle" },
    { x: 3050, y: 375, w: 150, h: 20, sprite_name: "particelle" },
    { x: 3550, y: 325, w: 150, h: 20, sprite_name: "particelle" },
    { x: 4250, y: 665, w: 150, h: 20, sprite_name: "particelle" }
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
    { x: 600, y: 840, w: 170, h: 170, speed: 80, sprite_name: "pterodattilo" },
    { x: 1200, y: 840, w: 170, h: 170, speed: 80, sprite_name: "slug" },
    { x: 2250, y: 840, w: 75, h: 75, speed: 80, sprite_name: "lanterna" },
    { x: 2050, y: 155, w: 170, h: 170, speed: 80, sprite_name: "pterodattilo" },
    { x: 3150, y: 840, w: 75, h: 75, speed: 80, sprite_name: "lanterna" },
    { x: 3460, y: 840, w: 170, h: 170, speed: 80, sprite_name: "pterodattilo" },
    { x: 3770, y: 840, w: 170, h: 170, speed: 80, sprite_name: "slug" },
    { x: 4200, y: 840, w: 170, h: 170, speed: 80, sprite_name: "lanterna" }

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
    PP.entities.player.attack(scene, PP.game_state.player, PP.game_state.enemies);
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
  const closeBtn = PP.shapes.text_add(scene, PP.game_state.player.geometry.x - 220, 740, "CHIUDI");

  //modifico le posizioni per evitaare che escano dallo schermo
  if (PP.game_state.player.geometry.x < 1280) {
    text.geometry.x = 400;
    closeBtn.geometry.x = 520;
  } else if (PP.game_state.player.geometry.x > 6400) {
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