// === ghostly_forest SCENE ===
function preload_ghostly_forest(scene) {
  scene.load.image('snowflake', 'assets/images/forest/neve.png');
  PP.game_state.lives = PP.assets.sprite.load_spritesheet(scene, "assets/images/heart.png", 120, 50);
  PP.scene_objects.platform.preload(scene);
  PP.entities.player.preload(scene);
}


function create_ghostly_forest(scene, data) {
  // Setta la scena del mondo spettrale
    PP.game_state.otherWorld = "forest_scene";

  // === PULSANTE HELP ===
  const helpButton = PP.shapes.text_add(scene, 1220, 35, "?");
  helpButton.tile_geometry.scroll_factor_x = 0;
  helpButton.tile_geometry.scroll_factor_y = 0;

  // lo rendo cliccabile
  PP.interactive.mouse.add(helpButton, "pointerdown", () => {
  showControlsPopup(scene);
});

  const leftWall = PP.shapes.rectangle_add(scene, 0, 460, 40, 720, "0x000000", 0);
  PP.physics.add(scene, leftWall, PP.physics.type.STATIC);

  const rightWall = PP.shapes.rectangle_add(scene, 7780, 460, 40, 720, "0x000000", 0);
  PP.physics.add(scene, rightWall, PP.physics.type.STATIC);

  // === SFONDO ===
  scene.cameras.main.setBackgroundColor(0x0b3d0b);

// === GROUND ===
    const ground = PP.shapes.rectangle_add(scene, 3100, 895, 6400, 40, "0x4a3b2a", 1);
    PP.physics.add(scene, ground, PP.physics.type.STATIC);

  // === PIATTAFORME "TRONCHI" ===
  const platformPositions = [

    // -- PRIMA CHAMBER --
    { x: 320, y: 725, w: 200, h: 20, sprite_name: "piattaforma"  },
    //{ x: 740, y: 1850, w: 200, h: 20  },
    { x: 970, y: 595, w: 150, h: 20, sprite_name: "piattaforma"  },
    { x: 1270, y: 615, w: 150, h: 20, sprite_name: "piattaforma" },

    // MASSI
    { x: 1600, y: 760, w: 150, h: 190, sprite_name: "piattaforma"},
    { x: 1732, y: 830, w: 100, h: 50, sprite_name: "piattaforma" },

    // SCALA
    //{ x: 2080, y: 1850, w: 100, h: 20 },  One
    { x: 2250, y: 615, w: 100, h: 20, sprite_name: "piattaforma" }, // Two
    { x: 2250, y: 475, w: 100, h: 20, sprite_name: "piattaforma" }, //Three
  //  { x: 2250, y: 1460, w: 100, h: 20 }, //FOUR


    // BLOCCO A SINISTRA DELLA SCALA
    { x: 2050, y: 20 + 175, w: 300, h: 20, sprite_name: "piattaforma" },

    // SECONDA RAMPA DI SCALE 
    { x: 2450, y: 25, w: 100, h: 20, sprite_name: "piattaforma" },
  //  { x: 2675, y: 1070, w: 150, h: 20 },
    { x: 3000, y: -125, w: 150, h: 20, sprite_name: "piattaforma" },  // apice

    // MASSI
    { x: 2890, y: 780, w: 200, h: 150, sprite_name: "piattaforma"},

    // PIATTAFROME FRA I DUE MASSI
    { x: 3190, y: 625, w: 100, h: 20, sprite_name: "piattaforma" },

    //PIATTAFROME ADIACENTE ALL'ASCENSORE
    { x: 3500, y: 575, w: 100, h: 20, sprite_name: "piattaforma" },

    //PIATTAFORMA SOPRA L'ASCENSORE
  //  { x: 3450, y: 1550, w: 200, h: 20 },

    // SPAZIO PER MOVING PLATFORM

    // MASSI finale
    { x: 3850, y: 818, w: 160, h: 75, sprite_name: "piattaforma" }
  ];

  PP.game_state.platforms = PP.scene_objects.platform.create(scene, platformPositions);

   // === PLAYER ===
    let startX = scene.scene.settings.data?.x ?? PP.game_state.playerPosition?.x ?? 100;
    let startY = scene.scene.settings.data?.y ?? PP.game_state.playerPosition?.y ?? 800;

    PP.game_state.player = PP.entities.player.create(scene, startX, startY);

    // === COLLIDER PLAYER ===
    PP.physics.add_collider(scene, PP.game_state.player, ground);

    for (let plat of PP.game_state.platforms) {
        PP.physics.add_collider(scene, PP.game_state.player, plat);
    }

    //Check se sta cambiando mondo
    if(PP.game_state.changingWorld){
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
    const enemyPositions = [{ x: 400, y: 825, speed: 80 }, //pterodattilo
      { x: 1200, y: 825, speed: 80 }, //slug
      { x: 2250, y: 825, speed: 80 }, //lanterna
      { x: 2050, y: 155, speed: 80 }, // pterodattilo
      { x: 3150, y: 825, speed: 80 }, //lanterna
      { x: 3350, y: 825, speed: 80 }, //pterodattilo
        { x: 3550, y: 825, speed: 80 }, //slug

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
      if (!(PP.game_state.player.lives <= 0)) {

      // HUD DANNO
      let currentIndex = PP.game_state.player.lives - 1;
      PP.assets.sprite.animation_play(PP.game_state.hearts[currentIndex], "Cuore");
      }
      PP.entities.player.damage(scene, PP.game_state.player, enemy);
   });
      }

   // === CAMERA ===
  const worldWidth = rightWall.geometry.body_x - leftWall.geometry.body_x + 40;
  const worldHeight = ground.geometry.body_y + 40;
  scene.cameras.main.setBounds(leftWall.geometry.body_x, 0, worldWidth, worldHeight);
  PP.camera.start_follow(scene, PP.game_state.player, 0, 0);

  // === CLICK DEL MOUSE PER ATTACCARE ===
    scene.input.on("pointerdown", () => {
        PP.entities.player.attack(scene, PP.game_state.player, PP.game_state.enemies);
    });

  // --- NEVE ---
    // array per i fiocchi
    scene.snowflakes = [];

    // timer che crea fiocchi
    scene.time.addEvent({
        delay: 200,
        callback: () => {
            const x = Phaser.Math.Between(0, scene.sys.game.config.width);
            const flake = scene.add.image(x, 0, 'snowflake').setScale(0.2);
            scene.snowflakes.push(flake);
        },
        loop: true
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

const groundTopY = 895 - (40 / 2);

// muovi i fiocchi verso il basso
for (let flake of scene.snowflakes) {
    flake.y += 2; // velocità caduta

    // fermali prima di toccare il terreno
    if (flake.y >= groundTopY - 5) { // -5 = margine
        flake.destroy(); // oppure flake.y = groundTopY - 5;
    }
}
    // === FINE LIVELLO ===
    if(PP.game_state.player.geometry.x >= 6325){
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
    const popupLayer = PP.layers.create(scene);
    PP.layers.set_z_index(popupLayer, 20);

    // sfondo scuro
    const bg = PP.shapes.rectangle_add(scene,640, 360,700, 420,"0x000000",0.8);

    // testo controlli
    const text = PP.shapes.text_add(scene, 340, 300,
      "COMANDI DEL PLATFORM\n\n" +
      "A/D oppure ← / → : Muovi il personaggio\n" +
      "SPAZIO : Salta\n" +
      "SHIFT : Scatto \n" +
      "CLICK SINISTRO DEL MOUSE : Attacca\n" +
      "U : Cambia mondo\n"
    );

    // bottone per chiudere il pop up dei comandi
    const closeBtn = PP.shapes.text_add(scene, 400, 440, "CHIUDI");

    // aggiungo tutto al layer
    PP.layers.add_to_layer(popupLayer, bg);
    PP.layers.add_to_layer(popupLayer, text);
    PP.layers.add_to_layer(popupLayer, closeBtn);

    // click su chiudi
    PP.interactive.mouse.add(closeBtn, "pointerdown", () => {
      PP.assets.destroy(bg);
      PP.assets.destroy(text);
      PP.assets.destroy(closeBtn);
    });
}



