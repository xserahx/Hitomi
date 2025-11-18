PP.entities = PP.entities || {};
PP.entities.player = {};

PP.entities.player.create = function (scene, x, y) {
  const player = scene.add.rectangle(x, y, 80, 120, 0xFFFF00);
  scene.physics.add.existing(player);
  player.body.setCollideWorldBounds(true);

  // === STATI VITA ===
  player.maxLives = 3;
  player.lives = 3;
  player.isInvincible = false;

  // Parametri salto e movimento
  player.jumpPressedTime = 0;
  player.canJump = false;
  player.coyoteTime = 150;
  player.jumpHoldTime = 400;
  player.jumpForce = -650;
  player.gravityUp = 600;
  player.gravityDown = 1200;
  player.jumpCutMultiplier = 2.5;
  player.lastGrounded = 0;
  player.isDashing = false;
  player.dashSpeed = 900; //600 ORIGINALE
  player.dashTime = 200;
  player.dashCooldown = 1000;
  player.lastDash = 0;
  // === ATTACCO ===
player.isAttacking = false;
player.attackTime = 200; // durata attacco in ms
player.lastAttack = 0;

// === HITBOX ATTACCO ===
player.attackHitbox = scene.add.rectangle(x, y, 150, 120, 0xff0000, 0);
scene.physics.add.existing(player.attackHitbox);
player.attackHitbox.body.enable = false;
player.attackHitbox.body.allowGravity = false;


  player.body.setGravityY(player.gravityDown);

  return player;
};

PP.entities.player.update = function (scene, player, keys) {
  const speed = 400; //200 ORIGINALE
  let movingLeft = keys.A.isDown || keys.LEFT.isDown;
  let movingRight = keys.D.isDown || keys.RIGHT.isDown;

  // === DASH ===
  if (
    Phaser.Input.Keyboard.JustDown(keys.SHIFT) &&
    !player.isDashing &&
    scene.time.now - player.lastDash > player.dashCooldown
  ) {
    player.isDashing = true;
    player.lastDash = scene.time.now;

    let dir = 0;
    if (movingLeft) dir = -1;
    else if (movingRight) dir = +1;
    else dir = player.body.velocity.x >= 0 ? +1 : -1;

    player.body.setVelocityX(dir * player.dashSpeed);
  }

  if (player.isDashing) {
    if (scene.time.now - player.lastDash > player.dashTime) {
      player.isDashing = false;
    } else {
      return;
    }
  }

  // === ATTACCO ===
if (
  Phaser.Input.Keyboard.JustDown(keys.K) &&
  scene.time.now - player.lastAttack > player.attackTime
) {
  player.isAttacking = true;
  player.lastAttack = scene.time.now;

  // Attiva hitbox temporanea
  player.attackHitbox.body.enable = true;

  // Direzione attacco
  const dir = player.body.velocity.x >= 0 ? 1 : -1;
  player.attackHitbox.x = player.x + dir * 100;
  player.attackHitbox.y = player.y;

  // Disattiva hitbox finita animazione attacco
  scene.time.delayedCall(player.attackTime, () => {
    player.isAttacking = false;
    player.attackHitbox.body.enable = false;
  });
}


  // === MOVIMENTO ORIZZONTALE ===
  if (movingLeft && !movingRight) player.body.setVelocityX(-speed);
  else if (movingRight && !movingLeft) player.body.setVelocityX(speed);
  else player.body.setVelocityX(0);

  // === COYOTE TIME ===
  if (player.body.blocked.down) {
    player.canJump = true;
    player.lastGrounded = scene.time.now;
  } else if (scene.time.now - player.lastGrounded > player.coyoteTime) {
    player.canJump = false;
  }

  // === SALTO ===
  if (Phaser.Input.Keyboard.JustDown(keys.SPACE) && player.canJump) {
    player.body.setVelocityY(player.jumpForce);
    player.jumpPressedTime = scene.time.now;
    player.canJump = false;
  }

  if (keys.SPACE.isDown && scene.time.now - player.jumpPressedTime < player.jumpHoldTime)
    player.body.setGravityY(player.gravityUp);
  else player.body.setGravityY(player.gravityDown);

  if (Phaser.Input.Keyboard.JustUp(keys.SPACE) && player.body.velocity.y < 0)
    player.body.setVelocityY(player.body.velocity.y / player.jumpCutMultiplier);
};

// === FUNZIONE DI DANNO ===
PP.entities.player.damage = function (scene) {
  const player = PP.game_state.player;
  if (player.isInvincible) return;

  player.lives -= 1;
  player.isInvincible = true;

  // === LAMPEGGIO ROSSO ===
  const originalColor = player.fillColor;
  let flashCount = 0;
  const flashTimer = scene.time.addEvent({
    delay: 100,
    repeat: 10,
    callback: () => {
      player.fillColor = flashCount % 2 === 0 ? 0xff0000 : originalColor;
      flashCount++;
    },
  });

  // === KNOCKBACK ===
  const knockback = 250;
  const direction = player.body.velocity.x >= 0 ? -1 : 1;
  player.body.setVelocity(knockback * direction, -200);

  // === INVINCIBILITÀ TEMPORANEA ===
  scene.time.delayedCall(1500, () => {
    player.isInvincible = false;
    player.fillColor = originalColor;
  });

  // === GAME OVER ===
  if (player.lives <= 0) {
    scene.cameras.main.shake(300, 0.01);
    scene.time.delayedCall(300, () => {
      scene.scene.restart();
      player.lives = player.maxLives;
    });
  }
};
