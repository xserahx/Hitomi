// === ghostly_forest SCENE ===
// DICHIARAZIONE VARIABILI
let help;
let panel;

let ghostly_forest_bg;
let ghostly_mountains_bg;
let ghostly_mountains_2_bg;

let ghostly_bamboofondo3;
let ghostly_bamboofondo2;
let ghostly_bamboofondo1;

let ghostly_tori;
let ghostly_tempio;

let ghostly_small_tree;
let ghostly_cespuglio;
let ghostly_cespuglio_2;

let ghostly_rocks;
let ghostly_radice;
let ghostly_casa;

let ghostly_separatore;
let ghostly_fox_statue;
let ghostly_statue;

let tronco_spettrale;
let roccia_1_spettrale;
let roccia_2_spettrale;

let ghostly_bamboo_rev;
let ghostly_bamboo_rev_2; 

let ghostly_bamboo_bg;
let ghostly_bamboo;
let ghostly_bamboo_2;
let ghostly_pontile;
let ghostly_pontile_2;

let ghostly_bg_far;
let ghostly_bg_mid;
let ghostly_bg_trees;
let ghostly_bg_front;

function createGhostlyForest(scene, treeSprite, treePositionArray) {
  for (let position of treePositionArray) {
    PP.assets.image.add(scene, treeSprite, position.x, position.y, position.pivot_x, position.pivot_y);
  }
}

const ghostly_forestTrees = [

 { x: 3980, y: 830, pivot_x: 0.5, pivot_y: 0.5 },
 { x: 4100, y: 750, pivot_x: 0.5, pivot_y: 0.5 },
 { x: 4300, y: 850, pivot_x: 0.5, pivot_y: 0.5 },
 { x: 4450, y: 730, pivot_x: 0.5, pivot_y: 0.5 },
 { x: 4590, y: 770, pivot_x: 0.5, pivot_y: 0.5 },
 { x: 4670, y: 860, pivot_x: 0.5, pivot_y: 0.5 },
 { x: 4750, y: 840, pivot_x: 0.5, pivot_y: 0.5 },
 { x: 4800, y: 730, pivot_x: 0.5, pivot_y: 0.5 },

];

function preload_ghostly_forest(scene) {
  ghostly_forest_bg = PP.assets.image.load(scene, "assets/images/forest/ghostly_forest_background.png", 1280, 920);
  ghostly_mountains_bg = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/montagna_spettrale.png", 1280, 720);

  ghostly_bamboofondo3 = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/lvl3parallax_spettrale.png", 6402, 1080);
  ghostly_bamboofondo2 = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/lvl2parallax_spettrale.png", 6402, 1080);
  ghostly_bamboofondo1 = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/lvl1parallax_spettrale.png", 6402, 1080);

  tronco_spettrale = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/tronco_spettrale.png", 300, 350);
  roccia_1_spettrale = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/roccia_1_spettrale.png", 500, 150);
  roccia_2_spettrale = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/roccia_2_spettrale.png", 500, 150);
  ghostly_casa = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/casa_spettrale.png", 726, 920);

  ghostly_small_tree = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/alberello_spettrale.png", 550, 684);
  ghostly_cespuglio = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/cespuglio_spettrale.png", 200, 150);
  ghostly_cespuglio_2 = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/cespuglio_spettrale.png", 200, 150);

  ghostly_bamboo_bg = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/recinzione_spettrale.png", 1096, 250);
  ghostly_bamboo_rev = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/bamboo_reverse_spettrale.png", 1096, 250);
  ghostly_bamboo_rev_2 = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/bamboo_reverse_spettrale.png", 1096, 250);
  ghostly_bamboo = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/bamboo_spettrale.png", 1096, 250);
  ghostly_bamboo_2 = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/bamboo_spettrale.png", 1096, 250);
  ghostly_rocks = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/roccia_spettrale.png", 1280, 400);
  ghostly_radice = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/radice_spettrale.png", 400, 200);

  ghostly_separatore = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/solidoopaco.png", 6402, 1080);
  ghostly_tori = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/tori_spettrale.png", 400, 600);
  ghostly_tempio = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/tempio_spettrale.png", 600, 800);

  ghostly_pontile = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/pontile_spettrale.png", 400, 200);
  ghostly_pontile_2 = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/pontile_2_spettrale.png", 400, 200);
  ghostly_fox_statue = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/statua_2_spettrale.png", 300, 400);
  ghostly_statue = PP.assets.image.load(scene, "assets/images/forest/parallasse_spettrale/statua_spettrale.png", 400, 600);
  
  help = PP.assets.image.load(scene, "assets/images/help_comandi.png", 50, 50);
  panel = PP.assets.image.load(scene, "assets/images/comandi_bg.png", 760, 428 )

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
  ghostly_bg_far.tile_geometry.scroll_factor_x = 0.1;

  // montagne di sfondo 
  ghostly_bg_mid = PP.assets.tilesprite.add(scene, ghostly_mountains_bg, 0, 210, 6400, 920, 0, 0);
  ghostly_bg_mid.tile_geometry.scroll_factor_x = 0.2;

  // parallasse bamboo
  ghostly_bamboofondo3 = PP.assets.tilesprite.add(scene, ghostly_bamboofondo3, 0, 0, 6400, 920, 0, 0);
  ghostly_bamboofondo3.tile_geometry.scroll_factor_x = 0.3;
  ghostly_bamboofondo2 = PP.assets.tilesprite.add(scene, ghostly_bamboofondo2, 0, 0, 6400, 920, 0, 0);
  ghostly_bamboofondo2.tile_geometry.scroll_factor_x = 0.4;

  ghostly_bamboofondo1 = PP.assets.tilesprite.add(scene, ghostly_bamboofondo1, 0, 0, 6400, 920, 0, 0);
  ghostly_bamboofondo1.tile_geometry.scroll_factor_x = 0.5;

  ghostly_tori = PP.assets.tilesprite.add(scene, ghostly_tori, 200, 400, 900, 1000, 0, 0);
  ghostly_tori.tile_geometry.scroll_factor_x = 0.55;
  ghostly_cespuglio = PP.assets.image.add(scene, ghostly_cespuglio, 2400, 450, 0, 0);
  ghostly_cespuglio_2 = PP.assets.image.add(scene, ghostly_cespuglio_2, 1700, 430, 0, 0);

  ghostly_bamboo_rev = PP.assets.image.add(scene, ghostly_bamboo_rev, 520, 0, 0, 0);
  ghostly_bamboo_rev_2 = PP.assets.image.add(scene, ghostly_bamboo_rev_2, 1550, 0, 0, 0);

  ghostly_bamboo = PP.assets.image.add(scene, ghostly_bamboo, 1130, 0, 0, 0);
  ghostly_bamboo_2 = PP.assets.image.add(scene, ghostly_bamboo_2, 2100, 0, 0, 0);
  ghostly_tempio = PP.assets.image.add(scene, ghostly_tempio, 3095 + 60, -20, 0, 0);

  ghostly_rocks = PP.assets.image.add(scene, ghostly_rocks, 2440 + 60, 100, 0, 0);

  createGhostlyForest(scene, ghostly_small_tree, ghostly_forestTrees);

  ghostly_radice = PP.assets.image.add(scene, ghostly_radice, 2680 + 60, 140, 0, 0);

  // recinzione in bamboo
  ghostly_bg_front = PP.assets.tilesprite.add(scene, ghostly_bamboo_bg, -20, 750, 6400, 250, 0, 0);
  ghostly_casa = PP.assets.image.add(scene, ghostly_casa, -100, 80, 0, 0);
  
  ghostly_separatore = PP.assets.image.add(scene, ghostly_separatore, 0, 0, 0, 0);
  
  // pontili
  ghostly_pontile = PP.assets.image.add(scene, ghostly_pontile, 3395, 310, 0, 0);
  ghostly_pontile_2 = PP.assets.image.add(scene, ghostly_pontile_2, 3820, 480, 0, 0);

  ghostly_statue = PP.assets.image.add(scene, ghostly_statue, 600, 740, 0, 0);

  ghostly_fox_statue = PP.assets.image.add(scene, ghostly_fox_statue, 325, 860, 0, 0);

  tronco_spettrale = PP.assets.image.add(scene, tronco_spettrale, 900,  700, 0, 0);
  roccia_1_spettrale = PP.assets.image.add(scene, roccia_1_spettrale, 1300,  650, 0, 0); 
  roccia_2_spettrale = PP.assets.image.add(scene, roccia_2_spettrale, 1900, 650, 0, 0);

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

  const ramo = PP.shapes.rectangle_add(scene, 1120,  1000,  135,  225, "0x4a3b2a", 0);
  PP.physics.add(scene, ramo, PP.physics.type.STATIC);

  const massi = PP.shapes.rectangle_add(scene, 1620,  900,  210,  500, "0x4a3b2a", 0);
  PP.physics.add(scene, massi, PP.physics.type.STATIC);

  const massi2 = PP.shapes.rectangle_add(scene, 2220,  900,  210,  500, "0x4a3b2a", 0);
  PP.physics.add(scene, massi2, PP.physics.type.STATIC);

  const platformPositions = [

    // === PRIME PIATTAFORME ===
    { x: 410, y: 875, w: 150, h: 20, sprite_name: "piattaforma_foresta_roccia_spettrale" },
    { x: 650, y: 865, w: 150, h: 20, sprite_name: "piattaforma_foresta_roccia_spettrale" },
    { x: 860, y: 782, w: 150, h: 20, sprite_name: "piattaforma_foresta_roccia_spettrale" },

    // === TRONCO DA SCAVALCARE ===
    { x: 1260, y: 650, w: 150, h: 20, sprite_name: "piattaforma_foresta_roccia_spettrale" }, 

    // === PIATTAFORME PRIMA DELLA SCALA ===
    { x: 2000, y: 700, w: 150, h: 20, sprite_name: "piattaforma_foresta_roccia_spettrale" },
    { x: 2510, y: 825, w: 150, h: 20, sprite_name: "piattaforma_foresta_roccia_spettrale" }, 
    { x: 3050, y: 655, w: 150, h: 20, sprite_name: "piattaforma_foresta_roccia_spettrale" },
    { x: 3050, y: 515, w: 150, h: 20, sprite_name: "piattaforma_foresta_roccia_spettrale" },
    { x: 3050, y: 215, w: 150, h: 20, sprite_name: "piattaforma_foresta_roccia_spettrale" },
    { x: 3250, y: 165, w: 150, h: 20, sprite_name: "piattaforma_foresta_spettrale" },
    { x: 3550, y: 440, w: 150, h: 20, sprite_name: "piattaforma_foresta_spettrale" },
    { x: 3880, y: 530, w: 150, h: 20, sprite_name: "piattaforma_foresta_spettrale" }, 

    // PIATTAFORME FINALI
    { x: 4450, y: 850, w: 150, h: 20, sprite_name: "piattaforma_foresta_spettrale" }, 

  ];

  PP.game_state.platforms = PP.scene_objects.platform.create(scene, platformPositions);

  // === PIATTAFORME NEL MONDO SPETTRALE ===    
  const ghostlyPlatformPositions = [
    { x: 1820, y: 825, w: 150, h: 20, sprite_name: "particelle" },  
    { x: 2440, y: 700, w: 150, h: 20, sprite_name: "particelle" }, 
    { x: 2800, y: 765, w: 150, h: 20, sprite_name: "particelle" },
    { x: 2970, y: 375, w: 150, h: 20, sprite_name: "particelle" }, 
    { x: 4100, y: 695, w: 150, h: 20, sprite_name: "particelle" }, 
    { x: 3470, y: 325, w: 150, h: 20, sprite_name: "particelle" } 
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
    { id: "tutorial_lanterna_1", x: 450, y: 855, sprite_name: "lanterna" },
    { id: "tutorial_lanterna_2", x: 1300, y: 970, sprite_name: "lanterna" }, //slug
    { id: "tutorial_pterodattilo_1", x: 1890, y: 940, sprite_name: "pterodattilo" }, //pterodattilo
    { id: "tutorial_lanterna_3", x: 3150, y: 970, sprite_name: "lanterna" },
    { id: "tutorial_pterodattilo_2", x: 3350, y: 940, sprite_name: "pterodattilo" }, //pterodattilo
    { id: "tutorial_lanterna_4", x: 3550, y: 970, sprite_name: "lanterna" } //slug

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
  if (PP.interactive.kb.is_key_down(scene, PP.key_codes.W)) {
    console.log("Changing world");
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
       state.x = enemy.geometry.x;  // posizione corrente
       state.y = enemy.geometry.y;
       PP.game_state.enemiesState[enemy.id] = state;
      }
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

  // PAUSA MOVIMENTO PLAYER SE POP UP APERTO
  PP.game_state.pause = true;
  PP.game_state.uiBlockingInput = true;
  
  const popupLayer = PP.layers.create(scene);
  PP.layers.set_z_index(popupLayer, 100);

  const cam = scene.cameras.main;
  const centerX = cam.centerX;
  const centerY = cam.centerY;

  // === OVERLAY ===
  const overlay = PP.shapes.rectangle_add(scene, centerX, centerY, cam.width, cam.height, "0x000000", 0.45);
  overlay.tile_geometry.scroll_factor_x = 0;
  overlay.tile_geometry.scroll_factor_y = 0;

  // === PANELLO ===
  const panel_img = PP.assets.image.add(scene, panel, centerX, centerY, 0.5, 0.5);
  panel_img.tile_geometry.scroll_factor_x = 0;
  panel_img.tile_geometry.scroll_factor_y = 0;

  // === HITBOX ===
  const hitbox_close = PP.shapes.rectangle_add(scene, centerX + 300, centerY + 160, 90, 40, "0x000000", 0);
  const hitbox_menu = PP.shapes.rectangle_add(scene, centerX - 230, centerY + 160, 120, 60, "0x000000", 0);

  hitbox_close.tile_geometry.scroll_factor_x = 0;
  hitbox_close.tile_geometry.scroll_factor_y = 0;

  hitbox_menu.tile_geometry.scroll_factor_x = 0;
  hitbox_menu.tile_geometry.scroll_factor_y = 0;

  // === AGGIUNGI AL LAYER ===
  PP.layers.add_to_layer(popupLayer, overlay);
  PP.layers.add_to_layer(popupLayer, panel_img);
  PP.layers.add_to_layer(popupLayer, hitbox_close);
  PP.layers.add_to_layer(popupLayer, hitbox_menu);

  // === INTERAZIONI ===
  PP.interactive.mouse.add(hitbox_close, "pointerdown", (pointer) => {
    closeMenu();
  });

  PP.interactive.mouse.add(hitbox_menu, "pointerdown", (pointer) => {
    PP.game_state.enemiesState = {};
    PP.game_state.actualLives = 3;
    PP.game_state.changingWorld = false;
    PP.game_state.respawn = true;
    PP.scenes.start("main_menu");
    resetControlsPopupState();
  });

  // === FUNZIONE CHIUSURA  ===
  function closeMenu() {
    PP.assets.destroy(overlay);
    PP.assets.destroy(panel_img);
    PP.assets.destroy(hitbox_close);
    PP.assets.destroy(hitbox_menu);

    PP.game_state.pause = false;
    PP.game_state.controlsPopupOpen = false;
    PP.game_state.uiBlockingInput = false;
  }
}
  function resetControlsPopupState() {     
    PP.game_state.pause = false;
    PP.game_state.controlsPopupOpen = false;
    PP.game_state.uiBlockingInput = false;
}