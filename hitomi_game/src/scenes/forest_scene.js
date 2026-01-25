// === FOREST SCENE ===
let forest_bg;
let mountains_bg;
let mountains_2_bg;
let small_tree;
let bamboo_bg;
let bush;
let snowflakeImg;

let bg_far;
let bg_mid;
let bg_main;
let bg_trees;
let bg_front;

function createForest(scene, treeSprite, treePositionArray) {
  for (let position of treePositionArray) {
    PP.assets.image.add(scene,treeSprite,position.x,position.y,position.pivot_x,position.pivot_y);
  }
}

const forestTrees = [

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

function preload_forest(scene) {
  forest_bg = PP.assets.image.load(scene,"assets/images/forest/forest_background.png",1280,920);
  mountains_2_bg = PP.assets.image.load(scene,"assets/images/forest/parallasse/montagna1.png",1280,720);
  mountains_bg = PP.assets.image.load(scene,"assets/images/forest/parallasse/montagna2.png",1280,720);
  small_tree = PP.assets.image.load(scene, "assets/images/forest/parallasse/alberello.png",550, 684);
  bamboo_bg = PP.assets.image.load(scene,"assets/images/forest/parallasse/recinzione.png",1096,250);
  bush = PP.assets.image.load(scene, "assets/images/forest/parallasse/arbusto.png",150,114);
  snowflakeImg = PP.assets.image.load(scene, "assets/images/forest/neve.png");

  PP.game_state.lives = PP.assets.sprite.load_spritesheet(scene,"assets/images/heart.png",120,50);

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
  bg_far = PP.assets.tilesprite.add(scene, forest_bg, -20, -30, 6400, 920, 0, 0);
  bg_far.tile_geometry.scroll_factor_x = 0.15;

  // montagne lontane
  bg_mid = PP.assets.tilesprite.add(scene, mountains_bg, 0, 200, 6400, 920, 0, 0);
  bg_mid.tile_geometry.scroll_factor_x = 0.3;

  // montagne vicine
  bg_main = PP.assets.tilesprite.add(scene, mountains_2_bg, 0, 200, 6400, 920, 0, 0);
  bg_main.tile_geometry.scroll_factor_x = 0.45;

  createForest(scene, small_tree, forestTrees);

  // recinzione in bamboo
  bg_front = PP.assets.tilesprite.add(scene, bamboo_bg, -20, 750, 6400, 250, 0, 0);
  
  let img_bush = PP.assets.image.add(scene, bush, 750, 940, 0.5, 0.5);

  // === PULSANTE HELP ===
  const helpButton = PP.shapes.text_add(scene, 1220, 35, "?");
  helpButton.tile_geometry.scroll_factor_x = 0;
  helpButton.tile_geometry.scroll_factor_y = 0;

  // lo rendo cliccabile
  PP.interactive.mouse.add(helpButton, "pointerdown", () => {
  showControlsPopup(scene);
});

  // === BORDI ===
  const leftWall = PP.shapes.rectangle_add(scene, 0, 460, 40, 1060, "0x000000", 0);
  PP.physics.add(scene, leftWall, PP.physics.type.STATIC);

  const rightWall = PP.shapes.rectangle_add(scene, 5050, 460, 40, 720, "0x000000", 0);
  PP.physics.add(scene, rightWall, PP.physics.type.STATIC);


  // === GROUND ===
  const ground = PP.shapes.rectangle_add(scene, 3200, 1010, 6400, 40, "0x4a3b2a", 0);
  PP.physics.add(scene, ground, PP.physics.type.STATIC);

  // === PIATTAFORME ===
  const platformPositions = [
    
  // === PRIME PIATTAFORME ===
{ x: 400, y: 850, w: 200, h: 20, sprite_name: "piattaforma" },
//{ x: 820, y: 825, w: 200, h: 20, sprite_name: "piattaforma" }, // SOLO MONDO SPETTRALE
{ x: 1060, y: 720, w: 150, h: 20, sprite_name: "piattaforma" },

// === MASSO (?) DA SCAVALCARE ===
{ x: 1400, y: 730, w: 150, h: 350, sprite_name: "piattaforma" },
{ x: 1532, y: 870, w: 100, h: 50, sprite_name: "piattaforma" },

// === PIATTAFORME PRIMA DELLA SCALA ===
{ x: 1780, y: 665, w: 100, h: 20, sprite_name: "piattaforma" },
{ x: 1970, y: 755, w: 100, h: 20, sprite_name: "piattaforma" }, //SOLO MONDO REALE
//{ x: 2440, y: 665, w: 100, h: 20, sprite_name: "piattaforma" }, SOLO MONDO SPETTRALE
{ x: 2510, y: 590, w: 100, h: 20, sprite_name: "piattaforma" }, //SOLO MONDO REALE

// === ALBERO DA SCALARE ===
{ x: 2880, y: 765, w: 100, h: 20, sprite_name: "piattaforma" },
{ x: 3050, y: 655, w: 100, h: 20, sprite_name: "piattaforma" },
{ x: 3050, y: 375, w: 100, h: 20, sprite_name: "piattaforma" },
{ x: 3250, y: 165, w: 100, h: 20, sprite_name: "piattaforma" },
{ x: 3550, y: 325, w: 100, h: 20, sprite_name: "piattaforma" },
//{ x: 3700, y: 400, w: 100, h: 20, sprite_name: "piattaforma" },


{ x: 3900, y: 500, w: 100, h: 20, sprite_name: "piattaforma" },
// PIATTAFORME FINALI
//{ x: 3990, y: 665, w: 100, h: 20, sprite_name: "piattaforma" },
{ x: 4250, y: 665, w: 200, h: 20, sprite_name: "piattaforma" },
{ x: 4550, y: 850, w: 200, h: 20, sprite_name: "piattaforma" }


];

  PP.game_state.platforms = PP.scene_objects.platform.create(scene, platformPositions);

// === PIATTAFORME NEL MONDO SPETTRALE ===
const ghostlyPlatformPositions = [
  { x: 820, y: 825, w: 200, h: 20, sprite_name: "nuvoletta_1" },  
  { x: 2240, y: 665, w: 100, h: 20, sprite_name: "nuvoletta_1" }
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
    if(PP.game_state.changingWorld){
      PP.game_state.player.geometry.x = config.player_x;
      PP.game_state.player.geometry.y = config.player_y;
    }

  // === HUD CUORI ===
  PP.game_state.hearts = [];
  for (let i = 0; i < PP.game_state.player.maxLives; i++) {
    const heart = PP.assets.sprite.add(scene, PP.game_state.lives, 60 + i * 80, 50, 0.5, 0.5);
    PP.assets.sprite.animation_add(heart, "Cuore", 0, 8, 8, 1);
    heart.tile_geometry.scroll_factor_x = 0;
    heart.tile_geometry.scroll_factor_y = 0;
    PP.game_state.hearts.push(heart);
  }

  // === NEMICI ===
  const enemyPositions = [
    { x: 400,  y: 800, sprite_name: "pterodattilo" },
    { x: 1200, y: 800, sprite_name: "slug" },
    { x: 2250, y: 800, sprite_name: "lanterna" },
    { x: 2050, y: 155, sprite_name: "pterodattilo" },
    { x: 3150, y: 800, sprite_name: "lanterna" },
    { x: 3350, y: 800, sprite_name: "pterodattilo" },
    { x: 3550, y: 800, sprite_name: "slug" }
  ];

  PP.game_state.enemies = PP.entities.enemy.create(scene, enemyPositions);

  for (let enemy of PP.game_state.enemies) {
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

  // === ATTACCO ===
  scene.input.on("pointerdown", () => {
    PP.entities.player.attack(scene, PP.game_state.player, PP.game_state.enemies);
  });

  // === NEVE ===
  scene.snowflakes = [];

  PP.timers.add_timer(scene, 200, (s) => {
    const flake = PP.assets.image.add(s, snowflakeImg, Math.random() * s.scale.width, 0, 0.5, 0.5);
    flake.geometry.scale_x = 0.2;
    flake.geometry.scale_y = 0.2;

    flake.tile_geometry.scroll_factor_x = 0.6;
    flake.tile_geometry.scroll_factor_y = 0.6;

    flake.speedY = 2;

    s.snowflakes.push(flake);

  }, true);

  PP.game_state.changingWorld = false;
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

    flake.geometry.y += flake.speedY ?? 2;

    if (flake.geometry.y >= snowTopY - 5) {

      flake.geometry.y = -10;
      flake.geometry.x = Math.random() * snowTopX;
    }
  }

}

function destroy_forest(scene) {}

PP.scenes.add("forest_scene", preload_forest, create_forest, update_forest, destroy_forest);

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