// === FOREST SCENE ===
let help;

let forest_bg;
let mountains_bg;

let bamboofondo3;
let bamboofondo2;
let bamboofondo1;

let tori;
let tempio;

let big_tree;
let small_tree;
let bush;
let cespuglio;
let cespuglio_2;

let rocks;
let radice;

let separatore;
let fox_statue;
let statue;

let bamboo_rev;
let bamboo_rev_2;

let bamboo_bg;
let bamboo;
let bamboo_2;

let pontile;
let pontile_2;
let tronco;
let roccia_1;
let roccia_2;

let bg_far;
let bg_mid;
let bg_trees;
let bg_front;

function createForest(scene, treeSprite, treePositionArray) {
  for (let position of treePositionArray) {
    PP.assets.image.add(scene, treeSprite, position.x, position.y, position.pivot_x, position.pivot_y);
  }
}

const forestTrees = [

  { x: 3980, y: 830, pivot_x: 0.5, pivot_y: 0.5 },
  { x: 4100, y: 750, pivot_x: 0.5, pivot_y: 0.5 },
  { x: 4300, y: 850, pivot_x: 0.5, pivot_y: 0.5 },
  { x: 4450, y: 730, pivot_x: 0.5, pivot_y: 0.5 },
  { x: 4590, y: 770, pivot_x: 0.5, pivot_y: 0.5 },
  { x: 4670, y: 860, pivot_x: 0.5, pivot_y: 0.5 },
  { x: 4750, y: 840, pivot_x: 0.5, pivot_y: 0.5 },
  { x: 4800, y: 730, pivot_x: 0.5, pivot_y: 0.5 },

  // { x: 1600, y: 750, pivot_x: 0.5, pivot_y: 0.5 },
  // { x: 2000, y: 830, pivot_x: 0.5, pivot_y: 0.5 },
  // { x: 1400, y: 780, pivot_x: 0.5, pivot_y: 0.5 },
  // { x: 1800, y: 800, pivot_x: 0.5, pivot_y: 0.5 },
];

function preload_forest(scene) {
  forest_bg = PP.assets.image.load(scene, "assets/images/forest/forest_background.png", 1280, 920);
  mountains_bg = PP.assets.image.load(scene, "assets/images/forest/parallasse/montagna.png", 1280, 720);

  bamboofondo3 = PP.assets.image.load(scene, "assets/images/forest/parallasse/lvl3parallax.png", 6402, 1080);
  bamboofondo2 = PP.assets.image.load(scene, "assets/images/forest/parallasse/lvl2parallax.png", 6402, 1080);
  bamboofondo1 = PP.assets.image.load(scene, "assets/images/forest/parallasse/lvl1parallax.png", 6402, 1080);

  big_tree = PP.assets.image.load(scene, "assets/images/forest/parallasse/albero_bamboo.png", 800, 1000);
  small_tree = PP.assets.image.load(scene, "assets/images/forest/parallasse/alberello.png", 550, 684);
  cespuglio = PP.assets.image.load(scene, "assets/images/forest/parallasse/cespuglio.png", 200, 150);
  cespuglio_2 = PP.assets.image.load(scene, "assets/images/forest/parallasse/cespuglio.png", 200, 150);

  bamboo_bg = PP.assets.image.load(scene, "assets/images/forest/parallasse/recinzione.png", 1096, 250);
  bamboo_rev = PP.assets.image.load(scene, "assets/images/forest/parallasse/bamboo_reverse.png", 1096, 250);
  bamboo_rev_2 = PP.assets.image.load(scene, "assets/images/forest/parallasse/bamboo_reverse.png", 1096, 250);

  bamboo = PP.assets.image.load(scene, "assets/images/forest/parallasse/bamboo.png", 1096, 250);
  bamboo_2 = PP.assets.image.load(scene, "assets/images/forest/parallasse/bamboo.png", 1096, 250);

  bush = PP.assets.image.load(scene, "assets/images/forest/parallasse/arbusto.png", 150, 114);
  rocks = PP.assets.image.load(scene, "assets/images/forest/parallasse/roccia.png", 1280, 400);
  radice = PP.assets.image.load(scene, "assets/images/forest/parallasse/radice.png", 400, 200);

  separatore = PP.assets.image.load(scene, "assets/images/forest/parallasse/solidoopaco.png", 6402, 1080);
  tori = PP.assets.image.load(scene, "assets/images/forest/parallasse/tori.png", 400, 600);
  tempio = PP.assets.image.load(scene, "assets/images/forest/parallasse/tempio.png", 600, 800);

  pontile = PP.assets.image.load(scene, "assets/images/forest/parallasse/pontile.png", 400, 200, 0, 0);
  pontile_2 = PP.assets.image.load(scene, "assets/images/forest/parallasse/pontile_2.png", 400, 200, 0, 0);




  tronco = PP.assets.image.load(scene, "assets/images/forest/parallasse/tronco.png", 300, 350), 0, 0;

  roccia_1 = PP.assets.image.load(scene, "assets/images/forest/parallasse/roccia_1.png", 500, 150, 0, 0);

  roccia_2 = PP.assets.image.load(scene, "assets/images/forest/parallasse/roccia_2.png", 500, 150, 0, 0);




  fox_statue = PP.assets.image.load(scene, "assets/images/forest/parallasse/statua_2.png", 300, 400);
  statue = PP.assets.image.load(scene, "assets/images/forest/parallasse/statua.png", 400, 600);
  help = PP.assets.image.load(scene, "assets/images/help_comandi.png", 50, 50);
  scene.load.image("snowflake", "assets/images/forest/neve.png");

  PP.game_state.lives = PP.assets.sprite.load_spritesheet(scene, "assets/images/heart.png", 120, 50);
  

  PP.scene_objects.platform.preload(scene);
  PP.entities.player.preload(scene);
  PP.entities.enemy.preload(scene);
}

function create_forest(scene) {

  // === STATO SCENA ===
  PP.game_state.currentScene = "forest_scene";
  PP.game_state.otherWorld = "ghostly_forest_scene";

  // === PARALLASSE ===
  // sfondo lontano
  bg_far = PP.assets.tilesprite.add(scene, forest_bg, 0, 0, 6402, 920, 0, 0);
  bg_far.tile_geometry.scroll_factor_x = 0.1;

  // montagne di sfondo 
  bg_mid = PP.assets.tilesprite.add(scene, mountains_bg, 0, 210, 6400, 920, 0, 0);
  bg_mid.tile_geometry.scroll_factor_x = 0.2;

  // parallasse a
  bamboofondo3 = PP.assets.tilesprite.add(scene, bamboofondo3, 0, 0, 6400, 920, 0, 0);
  bamboofondo3.tile_geometry.scroll_factor_x = 0.3;

  bamboofondo2 = PP.assets.tilesprite.add(scene, bamboofondo2, 0, 0, 6400, 920, 0, 0);
  bamboofondo2.tile_geometry.scroll_factor_x = 0.4;

  bamboofondo1 = PP.assets.tilesprite.add(scene, bamboofondo1, 0, 0, 6400, 920, 0, 0);
  bamboofondo1.tile_geometry.scroll_factor_x = 0.5;

  tori = PP.assets.tilesprite.add(scene, tori, 200, 400, 900, 1000, 0, 0);
  tori.tile_geometry.scroll_factor_x = 0.55;


  cespuglio = PP.assets.image.add(scene, cespuglio, 2400, 450, 0, 0);
  cespuglio_2 = PP.assets.image.add(scene, cespuglio_2, 1700, 430, 0, 0);

  bamboo_rev = PP.assets.image.add(scene, bamboo_rev, 520, 0, 0, 0);
  bamboo_rev_2 = PP.assets.image.add(scene, bamboo_rev_2, 1550, 0, 0, 0);

  bamboo = PP.assets.image.add(scene, bamboo, 1130, 0, 0, 0);
  bamboo_2 = PP.assets.image.add(scene, bamboo_2, 2100, 0, 0, 0);

  tempio = PP.assets.image.add(scene, tempio, 3095 + 60, -20, 0, 0);

  rocks = PP.assets.image.add(scene, rocks, 2440 + 60, 100, 0, 0);

  createForest(scene, small_tree, forestTrees);

  radice = PP.assets.image.add(scene, radice, 2680 + 60, 140, 0, 0);

  big_tree = PP.assets.image.add(scene, big_tree, 190, 1000, 0.5, 1);

  // recinzione in bamboo
  bg_front = PP.assets.tilesprite.add(scene, bamboo_bg, -20, 750, 6400, 250, 0, 0);

  separatore = PP.assets.image.add(scene, separatore, 0, 0, 0, 0);

  // pontili
  pontile = PP.assets.image.add(scene, pontile, 3395, 310, 0, 0);
  pontile_2 = PP.assets.image.add(scene, pontile_2, 3820, 480, 0, 0);

  statue = PP.assets.image.add(scene, statue, 600, 740, 0, 0);

  tronco = PP.assets.image.add(scene, tronco, 900, 700, 0, 0);

  roccia_1 = PP.assets.image.add(scene, roccia_1, 1300, 650, 0, 0)

  roccia_2 = PP.assets.image.add(scene, roccia_2, 1900, 650, 0, 0);

  fox_statue = PP.assets.image.add(scene, fox_statue, 325, 860, 0, 0);

  bush = PP.assets.image.add(scene, bush, 190, 930, 0.5, 0.5);

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

  const rightWall = PP.shapes.rectangle_add(scene, 5050, 460, 40, 920, "0x000000", 0);
  PP.physics.add(scene, rightWall, PP.physics.type.STATIC);

  // === GROUND ===
  const ground = PP.shapes.rectangle_add(scene, 3200, 1010, 6400, 40, "0x4a3b2a", 0);
  PP.physics.add(scene, ground, PP.physics.type.STATIC);

  // === PIATTAFORME === 

  const hitboxInvisibile = PP.shapes.rectangle_add(scene, 1040, 890, 135, 225, "0x4a3b2a", 0);
  PP.physics.add(scene, hitboxInvisibile, PP.physics.type.STATIC);

  const ramo = PP.shapes.rectangle_add(scene, 1120, 1000, 135, 225, "0x4a3b2a", 0);
  PP.physics.add(scene, ramo, PP.physics.type.STATIC);

  const massi = PP.shapes.rectangle_add(scene, 1620, 900, 210, 500, "0x4a3b2a", 0);
  PP.physics.add(scene, massi, PP.physics.type.STATIC);

  const massi2 = PP.shapes.rectangle_add(scene, 2220, 900, 210, 500, "0x4a3b2a", 0);
  PP.physics.add(scene, massi2, PP.physics.type.STATIC);


  const platformPositions = [

    // === PRIME PIATTAFORME ===
    { x: 410, y: 875, w: 150, h: 20, sprite_name: "piattaforma_foresta_roccia" },
    { x: 650, y: 865, w: 150, h: 20, sprite_name: "piattaforma_foresta_roccia" },
    { x: 860, y: 782, w: 150, h: 20, sprite_name: "piattaforma_foresta_roccia" },

    // === TRONCO DA SCAVALCARE ===

    { x: 1050, y: 700, w: 1, h: 1, sprite_name: "tronco" }, // QUESTO
    { x: 1260, y: 650, w: 150, h: 20, sprite_name: "piattaforma_foresta_roccia" }, //SOLO MONDO FRNTASMA
    { x: 1600, y: 650, w: 1, h: 1, sprite_name: "roccia_1" },
    { x: 1900, y: 825, w: 150, h: 20, sprite_name: "piattaforma_foresta_roccia" }, //SOLO MONDO FRNTASMA
    { x: 2000, y: 700, w: 150, h: 20, sprite_name: "piattaforma_foresta_roccia" },

    // === PIATTAFORME PRIMA DELLA SCALA ===
    //{ x: 1780, y: 665, w: 150, h: 20, sprite_name: "roccia_2" },
    { x: 2200, y: 650, w: 1, h: 1, sprite_name: "roccia_2" }, //SOLO MONDO REALE
    { x: 2510, y: 690, w: 150, h: 20, sprite_name: "piattaforma_foresta_roccia" }, //SOLO MONDO REALE

    // === ALBERO DA SCALARE ===
    { x: 2880, y: 765, w: 150, h: 20, sprite_name: "piattaforma_foresta_roccia" },
    { x: 3050, y: 655, w: 150, h: 20, sprite_name: "piattaforma_foresta_roccia" },
    { x: 3050, y: 375, w: 150, h: 20, sprite_name: "piattaforma_foresta_roccia" },
    { x: 3250, y: 165, w: 150, h: 20, sprite_name: "piattaforma_foresta" },
    { x: 3550, y: 325, w: 150, h: 20, sprite_name: "piattaforma_foresta" },
    //{ x: 3700, y: 400, w: 100, h: 20, sprite_name: "piattaforma_foresta" },
    //{ x: 3900, y: 500, w: 100, h: 20, sprite_name: "piattaforma" },

    // PIATTAFORME FINALI
    //{ x: 3990, y: 665, w: 100, h: 20, sprite_name: "piattaforma" },
    { x: 4190, y: 665, w: 150, h: 20, sprite_name: "piattaforma_foresta" },
    // { x: 4550, y: 850, w: 200, h: 20, sprite_name: "piattaforma" }

  ];

  PP.game_state.platforms = PP.scene_objects.platform.create(scene, platformPositions);

  // === PIATTAFORME NEL MONDO SPETTRALE ===
  const ghostlyPlatformPositions = [
    { x: 2430, y: 825, w: 150, h: 20, sprite_name: "particelle" },
    { x: 2980, y: 515, w: 150, h: 20, sprite_name: "particelle" },
    { x: 2980, y: 215, w: 150, h: 20, sprite_name: "particelle" },
    { x: 4390, y: 850, w: 150, h: 20, sprite_name: "particelle" } //ultimo

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
  PP.physics.add_collider(scene, PP.game_state.player, hitboxInvisibile);
  PP.physics.add_collider(scene, PP.game_state.player, ramo);
  PP.physics.add_collider(scene, PP.game_state.player, massi);
  PP.physics.add_collider(scene, PP.game_state.player, massi2);



  for (let plat of PP.game_state.platforms) {
    PP.physics.add_collider(scene, PP.game_state.player, plat);
  }

  // Check se sta cambiando mondo
  if (PP.game_state.changingWorld) {
    PP.game_state.player.geometry.x = config.player_x;
    PP.game_state.player.geometry.y = config.player_y;
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

  // === NEMICI ===
  const enemyPositions = [
    { x: 450, y: 855, sprite_name: "lanterna" },
    { x: 1300, y: 970, sprite_name: "lanterna" }, //slug
    { x: 1890, y: 940, sprite_name: "pterodattilo" }, //pterodattilo
    { x: 3150, y: 970, sprite_name: "lanterna" },
    { x: 3350, y: 940, sprite_name: "pterodattilo" }, //pterodattilo
    { x: 3550, y: 970, sprite_name: "lanterna" } //slug
  ];

  PP.game_state.enemies = PP.entities.enemy.create(scene, enemyPositions);

  for (let enemy of PP.game_state.enemies) {

    // collisioni con terreno e piattaforme
    PP.physics.add_collider(scene, enemy, ground);
  PP.physics.add_collider(scene, enemy, leftWall);
  PP.physics.add_collider(scene, enemy, rightWall);
  PP.physics.add_collider(scene, enemy, hitboxInvisibile);
  PP.physics.add_collider(scene, enemy, ramo);
  PP.physics.add_collider(scene, enemy, massi);
  PP.physics.add_collider(scene, enemy, massi2);

    for (let plat of PP.game_state.platforms) {
      PP.physics.add_collider(scene, enemy, plat);
    }

    // Overlap player-nemico
    PP.physics.add_overlap_f(scene, PP.game_state.player, enemy, () => {
      if (!(PP.game_state.player.lives <= 0) && !PP.game_state.player.isInvincible) {

        // HUD DANNO
         let i = PP.game_state.player.lives - 1;
            if (i >= 0 && PP.game_state.hearts[i]) {
              PP.assets.sprite.animation_play(PP.game_state.hearts[i], "empty");
            }

      }
      PP.entities.player.damage(scene, PP.game_state.player, enemy);
    });
  }

  // === CAMERA ===
  const worldWidth = rightWall.geometry.body_x - leftWall.geometry.body_x + 40;
  const worldHeight = ground.geometry.body_y + 10;
  scene.cameras.main.setBounds(leftWall.geometry.body_x, 0, worldWidth, worldHeight);
  PP.camera.start_follow(scene, PP.game_state.player, 0, 0);

  scene.input.on("pointerdown", () => {
    // click su UI → niente attacco
    if (PP.game_state.uiBlockingInput) return;

    // gioco in pausa 
    if (PP.game_state.pause) return;

    PP.entities.player.attack(scene, PP.game_state.player, PP.game_state.enemies
    );
  });

  // === NEVE ===
  scene.snowflakes = [];
  scene.time.addEvent({
    delay: 200,
    loop: true,
    callback: () => {
      const flake = scene.add.image(
        Phaser.Math.Between(0, scene.scale.width),
        0,
        "snowflake"
      ).setScale(0.2);

      flake.setScrollFactor(0.6);
      scene.snowflakes.push(flake);
    }
  });

  PP.game_state.changingWorld = false;

  // === NOTTE ===
  const cam = scene.cameras.main;
  const nightOverlay = PP.shapes.rectangle_add(scene, cam.centerX, cam.centerY, cam.width, cam.height, "0x000022", 0.30);

  nightOverlay.tile_geometry.scroll_factor_x = 0;
  nightOverlay.tile_geometry.scroll_factor_y = 0;

  PP.layers.set_z_index(nightOverlay, 20);

}

function update_forest(scene) {
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

  const snowTopY = 900 - (40 / 2);
  const snowTopX = 7680;

  // muovi i fiocchi verso il basso
  for (let flake of scene.snowflakes) {

    // caduta fiocchi verso y
    flake.y += flake.speedY ?? 2;

    // quando arriva al terreno → respawn in alto
    if (flake.y >= snowTopY - 5) {

      flake.y = -10;
      flake.x = Math.random() * snowTopX;
    }
  }
  if (PP.game_state.player.geometry.x > 5005) {
    PP.scenes.start("bossfight_scene");
  }
}

function destroy_forest(scene) { }

PP.scenes.add("forest_scene", preload_forest, create_forest, update_forest, destroy_forest);

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
