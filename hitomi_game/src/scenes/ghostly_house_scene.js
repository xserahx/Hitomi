// === GHOSTLY TUTORIAL SCENE ===
function preload_ghostly_tutorial(scene) {
  // Caricamenti opzionali (audio, sprite, ecc.)
}

function create_ghostly_tutorial(scene, data) {

   // === MURI ===
    const leftWall = PP.shapes.rectangle_add(scene, 0, 360, 40, 720, "0x000000", 0); // muro sinistro invisibile
    PP.physics.add(scene, leftWall, PP.physics.type.STATIC);

    const rightWall = PP.shapes.rectangle_add(scene, 1280, 360, 40, 720, "0x000000", 0); // muro destro invisibile
    PP.physics.add(scene, rightWall, PP.physics.type.STATIC);

  // === GROUND ===
    const ground = PP.shapes.rectangle_add(scene, 640, 700, 1280, 40, "0x000000", 1);
    PP.physics.add(scene, ground, PP.physics.type.STATIC);

  // === NEBBIA ROSSA ===
  //const overlay = scene.add.rectangle(640, 360, 1280, 720, 0x660000);
  //overlay.setAlpha(0.2);
  //overlay.setBlendMode(Phaser.BlendModes.ADD);

  // === PIATTAFORME ===
  const platformPositions = [
    { x: 250, y: 350, w: 50, h: 400 },
    { x: 850, y: 500, w: 150, h: 20 },
    { x: 600, y: 400, w: 150, h: 20 },
    { x: 1100, y: 650, w: 100, h: 60 },
    { x: 1500, y: 530, w: 300, h: 20 },
    { x: 350, y: 300, w: 150, h: 20 }
  ];
  PP.game_state.platforms = PP.scene_objects.platform.create(scene, platformPositions);

   // === PLAYER ===
    const startX = scene.scene.settings.data?.x ?? PP.game_state.playerPosition?.x ?? 1200;
    const startY = scene.scene.settings.data?.y ?? PP.game_state.playerPosition?.y ?? 500;

    PP.game_state.player = PP.entities.player.create(scene, startX, startY);

   // === COLLIDER PLAYER ===
    PP.physics.add_collider(scene, PP.game_state.player, ground);
    PP.physics.add_collider(scene, PP.game_state.player, leftWall);
    PP.physics.add_collider(scene, PP.game_state.player, rightWall);

for (let plat of PP.game_state.platforms) {
       PP.physics.add_collider(scene, PP.game_state.player, plat);
    }

    // === HUD VITE ===
    PP.game_state.playerLivesText = PP.shapes.text_add(scene, 20, 20, "Lives:");
    
    // === NEMICI ===
    const enemyPositions = [{ x: 400, y: 200, speed: 80 }];
    PP.game_state.enemies = PP.entities.enemy.create(scene, enemyPositions);

    for (let enemy of PP.game_state.enemies) {

        // collisioni con terreno e piattaforme
        PP.physics.add_collider(scene, enemy, ground);

        for (let plat of PP.game_state.platforms) {
          PP.physics.add_collider(scene, enemy, plat);
        }

        // Overlap player-nemico
        PP.physics.add_overlap_f(scene, PP.game_state.player, enemy, () => {
          PP.entities.player.damage(scene, PP.game_state.player);
        });
    }
    PP.game_state.changingWorld = false;
}

function update_ghostly_tutorial(scene) {
    PP.entities.player.update(scene, PP.game_state.player);
    PP.entities.enemy.update(scene, PP.game_state.enemies, PP.game_state.player);

    if (PP.game_state.player) {
      PP.game_state.playerPosition = {
        x: PP.game_state.player.x,
        y: PP.game_state.player.y
        };
    }
}

function destroy_ghostly_tutorial(scene) {}


PP.scenes.add("ghostly_tutorial_scene", preload_ghostly_tutorial, create_ghostly_tutorial, update_ghostly_tutorial, destroy_ghostly_tutorial);