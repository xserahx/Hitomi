// src/entities/player.js
// File che descrive il funzionamento del player

PP.entities = PP.entities || {}
PP.entities.player = {}

// Function per creare il player
PP.entities.player.create = function(scene, x, y) {
  const player = scene.add.rectangle(x, y, 40, 60, 0xFFFF00)
  scene.physics.add.existing(player)
  player.body.setCollideWorldBounds(true)
  return player
}

// Function per gestirne il funzionamento
PP.entities.player.update = function(scene, player, keys) {
  //movement
  const speed = 300
  let movingLeft = keys.A.isDown || keys.LEFT.isDown
  let movingRight = keys.D.isDown || keys.RIGHT.isDown

  if (movingLeft && !movingRight) {
    player.body.setVelocityX(-speed)
  } else if (movingRight && !movingLeft) {
    player.body.setVelocityX(speed)
  } else {
    player.body.setVelocityX(0)
  }

  /*/ Jump 1
  if (PP.interactive.kb.keys.SPACE.isDown && player.body.blocked.down) {
      player.body.setVelocityY(-400)
  }*/
  //Versione 2
  player.jumpPressedTime = 0
  player.canJump = false
  player.coyoteTime = 100      // millisecondi da quando hai lasciato terra
  player.jumpHoldTime = 2000    // tempo massimo in cui premere spazio influenza il salto
  player.jumpForce = -820      // velocità di salto iniziale
  player.jumpCutMultiplier = 2 // quanto aumenta la velocità se rilasci prima il tasto
  
  // --- COYOTE TIME (permette di saltare poco dopo aver lasciato il terreno) ---
  if (player.body.blocked.down) {
    player.canJump = true
    player.lastGrounded = scene.time.now
  } else if (scene.time.now - player.lastGrounded > player.coyoteTime) {
    player.canJump = false
  }

  // --- JUMP START ---
  if (Phaser.Input.Keyboard.JustDown(keys.SPACE) && player.canJump) {
    player.body.setVelocityY(player.jumpForce)
    player.jumpPressedTime = scene.time.now
    player.canJump = false
  }
  // --- ALTEZZA DI SALTO VARIABILE (+ tieni premuto + salti) ---
  if (keys.SPACE.isDown && (scene.time.now - player.jumpPressedTime < player.jumpHoldTime)) {
    // Se tieni premuto la gravità diminuisce
    player.body.setGravityY(400)
  } else {
    // Mentre riscendi torna normale
    player.body.setGravityY(800)
  }

  // --- EARLY RELEASE (taglio del salto) ---
  if (Phaser.Input.Keyboard.JustUp(keys.SPACE) && player.body.velocity.y < 0) {
    player.body.setVelocityY(player.body.velocity.y / player.jumpCutMultiplier)
  }  
}
