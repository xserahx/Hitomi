PP.scenes.add(
'main_scene',

  function preload(scene) {
    // Nothing to load for now
  },

  function create(scene) {
    // Black ground
    //scene.add(cordinatex, coordinatey, larghezza, altezza, colore)
    const ground = scene.add.rectangle(400, 580, 10000, 40, 0x000000)
    scene.physics.add.existing(ground, true)

    
    //---------PLATFORMS------------------------------------------------------------------//
    // positions and sizes for platforms
    const platformPositions = [
      { x: 0, y:250, w: 100, h: 620 },
      { x: 600, y: 450, w: 150, h: 20 },
      { x: 900, y: 380, w: 120, h: 20 },
      { x: 1200, y: 320, w: 200, h: 20 },
      { x: 1500, y: 530, w: 300, h: 20 },
      { x: 1000, y: 300, w: 90, h: 20 },
      { x: 3200, y: 320, w: 200, h: 20 },
      { x: 900, y: 90, w: 200, h: 20 }
    ]
    // Floating platforms group
    PP.game_state.platforms = PP.scene_objects.platform.create(scene, platformPositions)

    // === Moving Platforms ===
    const movingPlatformConfigs = [
      { x: 300, y: 300, w: 150, h: 20, direction: 'y', range: 150, speed: 60 },
      { x: 1100, y: 250, w: 120, h: 20, direction: 'y', range: 100, speed: 40 }
    ]
    PP.game_state.movingPlatforms = PP.scene_objects.moving_platform.create(scene, movingPlatformConfigs)
    scene.physics.add.collider(PP.game_state.movingPlatforms, PP.game_state.platforms)
    //---------------------------------------------------------------------------------------//

    //---------PLAYER------------------------------------------------------------------//
    // Store reference
    PP.game_state.player = PP.entities.player.create(scene, 200, 500)
    // Player collides with ground
    scene.physics.add.collider(PP.game_state.player, ground)
    // Keyboard input (A and D)
    PP.interactive.kb.keys = scene.input.keyboard.addKeys({
      A: Phaser.Input.Keyboard.KeyCodes.A,
      D: Phaser.Input.Keyboard.KeyCodes.D,
      SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE,
      LEFT: Phaser.Input.Keyboard.KeyCodes.LEFT,
      RIGHT: Phaser.Input.Keyboard.KeyCodes.RIGHT,
      UP: Phaser.Input.Keyboard.KeyCodes.UP
});
    // enable collision between player and all platforms
    scene.physics.add.collider(PP.game_state.player, PP.game_state.platforms)
    scene.physics.add.collider(PP.game_state.player, PP.game_state.movingPlatforms)
    // Make camera follow the player
    scene.cameras.main.startFollow(PP.game_state.player)
    // Optionally, set camera bounds (so it doesn't scroll beyond the world)
    scene.cameras.main.setBounds(0, 0, 10000, 600) // width=2000 → your level width
    scene.physics.world.setBounds(0, 0, 2000, 600)
    //-------------------------------------------------------------------------------------//
    
    /*/---------Enemies------------------------------------------------------------//
    // Positions of enemies 
    const enemyPositions = [
      { x: 600, y: 200 },
      { x: 1300, y: 500 }
    ]
    // === Enemies setup ===
    PP.game_state.enemies = PP.entities.enemy.create(scene, enemyPositions)
    scene.physics.add.collider(PP.game_state.enemies, PP.game_state.platforms)
    scene.physics.add.collider(PP.game_state.enemies, ground)
    scene.physics.add.collider(PP.game_state.enemies, PP.game_state.enemies)
    scene.physics.add.collider(PP.game_state.enemies, PP.game_state.player)
    scene.physics.add.collider(PP.game_state.enemies, PP.game_state.movingPlatforms)
    //----------------------------------------------------------------------------/*/

    

  },

  function update(scene) {
    // Update logic goes here
    
    PP.entities.player.update(scene, PP.game_state.player, PP.interactive.kb.keys)
    
    //COMANDO PER SAPERE LA POSIZIONE DEL PLAYER IN TEMPO REALE E SEGNARSI I PIXEL
    //console.log(`Player position → x: ${PP.game_state.player.x.toFixed(0)}, y: ${PP.game_state.player.y.toFixed(0)}`)

    //AGGIUNGE I NEMICI 
    //PP.entities.enemy.update(scene, PP.game_state.enemies, PP.game_state.player)

    //PP.scene_objects.moving_platform.update(scene, PP.game_state.movingPlatforms.getChildren())

  },

  function destroy(scene) {
    // Cleanup logic
  }
)
