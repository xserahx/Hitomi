PP.entities = PP.entities || {};
PP.entities.player = {};

// === PRELOAD ===
PP.entities.player.preload = function (scene) {
    PP.entities.player.img_goody = PP.assets.sprite.load_spritesheet(scene, "assets/images/player/spritesheet_goody.png", 120, 120);
    PP.entities.player.img_bambino = PP.assets.sprite.load_spritesheet(scene, "assets/images/player/spritesheet_bambino.png", 120, 120);
}

// === CREATE ===
PP.entities.player.create = function (scene, x, y) {
    const img = (PP.game_state.nanashiState === "taken") ? PP.entities.player.img_bambino : PP.entities.player.img_goody;
    const player = PP.assets.sprite.add(scene, img, x, y, 0.5, 0.5);
    PP.physics.add(scene, player, PP.physics.type.DYNAMIC);
    PP.physics.set_collision_rectangle(player, 40, 120, 40, 0);

    // === STATI VITA ===
    player.maxLives = 3;
    if (!PP.game_state.changingWorld) {
        player.lives = 3;
        PP.game_state.actualLives = 3;
    } else {
        player.lives = PP.game_state.actualLives;
    }
    console.log("VITE INIZIALI " + player.lives);
    player.isInvincible = false;
    player.isKnocked = false;

    // === SALTO E MOVIMENTO ===
    player.jumpPressedTime = 0;
    player.canJump = false;
    player.coyoteTime = 150;
    player.jumpAnticTime = 100;
    player.jumpHoldTime = 400;
    player.jumpForce = -650;
    player.gravityUp = 600;
    player.gravityDown = 1200;
    player.jumpCutMultiplier = 2.5;
    player.jumpState = "ground";   // ground | anticipation | up | down
    player.lastGrounded = 0;

    player.isDashing = false;
    player.dashSpeed = 600;
    player.dashTime = 200;
    player.dashCooldown = 400;
    player.lastDash = 0;

    // === ATTACCO ===
    player.isAttacking = false;

    // === CUTSCENES ===
    player.inCutscene = false;

    PP.physics.set_acceleration_y(player, player.gravityDown);

    // === ANIMAZIONI ===
    PP.assets.sprite.animation_add(player, "camminata", 0, 7, 12, -1);
    PP.assets.sprite.animation_add(player, "idle", 8, 12, 5, -1);
    PP.assets.sprite.animation_add(player, "attacco", 16, 21, 20, 0);
    PP.assets.sprite.animation_add(player, "salto_pre", 24, 24, 1, 0);
    PP.assets.sprite.animation_add(player, "salto1", 25, 26, 10, 0);
    PP.assets.sprite.animation_add(player, "salto2", 27, 29, 12, 0);
    PP.assets.sprite.animation_add(player, "dash", 40, 43, 12, 0);
    PP.assets.sprite.animation_add(player, "morte", 32, 36, 10, 0);

    if (PP.game_state.isPLayerFlipped) player.geometry.flip_x = true;

    PP.assets.sprite.animation_play(player, "idle");
    player.currentAnim = "idle";

    return player;
};

// === UPDATE ===
PP.entities.player.update = function (scene, player) {
    // === STATO CUTSCENE / PAUSA / MORTE ===
    player.inCutscene = PP.game_state.bossIsDead || 
                        PP.game_state.duringBossCutscene || 
                        PP.game_state.pause || 
                        PP.game_state.tutorialCutscene;

    if (player.lives === 0 || player.inCutscene) {
        PP.physics.set_velocity_x(player, 0);
        return;
    }

    // === INPUT ===
    const movingLeft  = PP.interactive.kb.is_key_down(scene, PP.key_codes.A) || PP.interactive.kb.is_key_down(scene, PP.key_codes.LEFT);
    const movingRight = PP.interactive.kb.is_key_down(scene, PP.key_codes.D) || PP.interactive.kb.is_key_down(scene, PP.key_codes.RIGHT);
    const hasNanashi = PP.game_state.nanashiState === "taken";
    let speed = hasNanashi ? 150 : 200;
    player.dashSpeed = hasNanashi ? 400 : 600;
    // === DEV MODE ===
    if (PP.interactive.kb.is_key_down(scene, PP.key_codes.P) && !PP.game_state.DevMode) {
        PP.shapes.text_add(scene, player.geometry.body_x, player.geometry.body_y - 200, "PLAYER IS NOW IN DEV MODE");
        PP.game_state.DevMode = true;
    } else if (PP.interactive.kb.is_key_down(scene, PP.key_codes.O) && PP.game_state.DevMode) {
        PP.shapes.text_add(scene, player.geometry.body_x, player.geometry.body_y - 200, "PLAYER IS NOT IN DEV MODE ANYMORE");
        PP.game_state.DevMode = false;
    }

    // === DASH ===
    if (PP.interactive.kb.is_key_down(scene, PP.key_codes.SHIFT) && !player.inCutscene &&
        !player.isDashing && PP.timers.getTime(scene) - player.lastDash > player.dashCooldown) {
        player.isDashing = true;
        player.lastDash = PP.timers.getTime(scene);
        PP.physics.set_velocity_x(player, (player.geometry.flip_x ? -1 : 1) * player.dashSpeed);
    }

    if (player.isDashing) {
        if (PP.timers.getTime(scene) - player.lastDash > player.dashTime) {
            player.isDashing = false;
        } else {
            if (player.currentAnim !== "dash") {
                PP.assets.sprite.animation_play(player, "dash");
                player.currentAnim = "dash";
            }
            return;
        }
    }

    // === MOVIMENTO ORIZZONTALE ===
    if (!player.isKnocked && !player.isAttacking && !player.isDashing) {
        let velocityX = 0;
        if (movingLeft && !movingRight) velocityX = -speed;
        else if (movingRight && !movingLeft) velocityX = speed;
        PP.physics.set_velocity_x(player, velocityX);

        if (velocityX < 0) player.geometry.flip_x = true;
        else if (velocityX > 0) player.geometry.flip_x = false;
        PP.game_state.isPLayerFlipped = player.geometry.flip_x;
    }

    // === PAUSA ===
    if (PP.game_state.pause) {
        PP.physics.set_velocity_x(player, 0);
        PP.assets.sprite.animation_stop(player);
        return;
    }

    // === COYOTE TIME / ATTERAGGIO ===
    if (player.ph_obj.body.blocked.down) {
        player.canJump = true;
        player.lastGrounded = PP.timers.getTime(scene);
        if (player.jumpState !== "anticipation") player.jumpState = "ground";
    } else if (PP.timers.getTime(scene) - player.lastGrounded > player.coyoteTime) {
        player.canJump = false;
    }

    // === INPUT → ANTICIPAZIONE SALTO ===
    if (PP.interactive.kb.is_key_down(scene, PP.key_codes.SPACE) &&
        player.canJump && !player.inCutscene && player.jumpState === "ground") {
        player.jumpState = "anticipation";
        player.jumpAnticStart = PP.timers.getTime(scene);
    }

    // === ANTICIPAZIONE → SALTO ===
    if (player.jumpState === "anticipation" &&
        PP.timers.getTime(scene) - player.jumpAnticStart > player.jumpAnticTime) {
        PP.physics.set_velocity_y(player, player.jumpForce);
        player.jumpPressedTime = PP.timers.getTime(scene);
        player.canJump = false;
        player.jumpState = "up";
    }

    // === JUMP HOLD / GRAVITY ===
    if (player.jumpState === "up" &&
        PP.interactive.kb.is_key_down(scene, PP.key_codes.SPACE) &&
        PP.timers.getTime(scene) - player.jumpPressedTime < player.jumpHoldTime) {
        PP.physics.set_acceleration_y(player, player.gravityUp);
    } else {
        PP.physics.set_acceleration_y(player, player.gravityDown);
    }

    // === JUMP CUT ===
    if (PP.interactive.kb.is_key_up(scene, PP.key_codes.SPACE) &&
        PP.physics.get_velocity_y(player) < 0) {
        PP.physics.set_velocity_y(player, PP.physics.get_velocity_y(player) / player.jumpCutMultiplier);
    }

    // === TRANSIZIONE UP → DOWN ===
    if (player.jumpState === "up" && PP.physics.get_velocity_y(player) > 0) player.jumpState = "down";

    // === ANIMAZIONI ===
    if (player.isDashing) {
        if (player.currentAnim !== "dash") {
            PP.assets.sprite.animation_play(player, "dash");
            player.currentAnim = "dash";
        }
    } else if (player.isAttacking) {
        if (player.currentAnim !== "attacco") {
            PP.assets.sprite.animation_play(player, "attacco");
            player.currentAnim = "attacco";
        }
    } else if (!player.ph_obj.body.blocked.down) {
        let jumpAnim = player.jumpState === "anticipation" ? "salto_pre" :
                       player.jumpState === "up" ? "salto1" :
                       player.jumpState === "down" ? "salto2" : null;
        if (jumpAnim && player.currentAnim !== jumpAnim) {
            PP.assets.sprite.animation_play(player, jumpAnim);
            player.currentAnim = jumpAnim;
        }
    } else {
        const velocityX = PP.physics.get_velocity_x(player);
        if (velocityX === 0) {
            if (player.currentAnim !== "idle") {
                PP.assets.sprite.animation_play(player, "idle");
                player.currentAnim = "idle";
            }
        } else {
            if (player.currentAnim !== "camminata") {
                PP.assets.sprite.animation_play(player, "camminata");
                player.currentAnim = "camminata";
            }
        }
    }
};

// === DAMAGE ===
PP.entities.player.damage = function (scene, player, enemy) {
    console.log("Player damaged");
    if (player.isInvincible || PP.game_state.DevMode || player.inCutscene == true) return;

    player.lives--;
    PP.game_state.actualLives = player.lives;
    console.log("vite attuali " + player.lives);

    player.isInvincible = true;
    const heartIndex = player.lives;

    if (heartIndex >= 0 && PP.game_state.hearts[heartIndex]) {
        PP.assets.sprite.animation_play(
            PP.game_state.hearts[heartIndex], "empty"  
        );
    }

    // === KNOCKBACK ===
    player.isKnocked = true;
    const knockbackX = 600;
    const knockbackY = -300;
    const dirX = (player.geometry.body_x < enemy.geometry.body_x) ? -1 : 1;

    PP.physics.set_velocity_x(player, knockbackX * dirX);
    PP.physics.set_velocity_y(player, knockbackY);

    // Disabilita knockback dopo breve tempo
    PP.timers.add_timer(scene, 200, () => {
        player.isKnocked = false;
    }, false);

    // Rimuove invincibilità dopo 1.5 sec
    PP.timers.add_timer(scene, 1500, () => {
        if (!player.inCutscene) player.isInvincible = false;
    }, false);

    // === GAME OVER / ANIMAZIONE MORTE ===
    if (player.lives <= 0) {
        PP.physics.set_velocity_x(player, 0);
        PP.physics.set_velocity_y(player, 0);
        player.isInvincible = true;
        player.isKnocked = true;

        PP.assets.sprite.animation_play(player, "morte");
        player.currentAnim = "morte";

        PP.timers.add_timer(scene, 1000, () => {
            player.lives = player.maxLives;
            PP.scenes.start("game_over");
        }, false);
    }
};

// === ATTACCO ===
PP.entities.player.attack = function (scene, player, enemies) {
    if (player.isAttacking || player.inCutscene || player.isDashing) return;

    player.isAttacking = true;
    PP.physics.set_velocity_x(player, 0);
    PP.assets.sprite.animation_play(player, "attacco");

    let dir = player.geometry.flip_x ? -1 : 1;
    let hitboxX = player.geometry.body_x + (dir === -1 ? -50 : 80);
    let hitboxY = player.geometry.body_y + 40;
    const hitbox = PP.shapes.rectangle_add(scene, hitboxX, hitboxY, 100, 100, "0xABCDEF", 1);
    PP.physics.add(scene, hitbox, PP.physics.type.STATIC);

    if (Array.isArray(enemies)) {
        enemies.forEach(enemy => {
            PP.physics.add_overlap_f(scene, hitbox, enemy, () => {
                PP.entities.enemy.damage(scene, enemy, hitbox);
            });
        });
    } else {
        PP.physics.add_overlap_f(scene, hitbox, enemies, () => {
            if (!PP.game_state.bossIsFriendly)
                PP.entities.boss.damage(scene, enemies, hitbox);
        });
    }

    PP.timers.add_timer(scene, 100, () => {
        PP.shapes.destroy(hitbox);
    }, false);

    PP.timers.add_timer(scene, 500, () => {
        player.isAttacking = false;
        if (player.currentAnim !== "camminata" && player.ph_obj.body.blocked.down) {
            PP.assets.sprite.animation_play(player, "idle");
            player.currentAnim = "idle";
        }
    }, false);
};

PP.entities.player.setSpriteByNanashiState = function (scene, player) {
    // Scegli il nuovo spritesheet
    const newSprite = PP.game_state.nanashiState === "taken" ? PP.entities.player.img_bambino : PP.entities.player.img_goody;

    // Cambia texture Phaser
    player.ph_obj.setTexture(newSprite.id);
    player.ph_obj.setFrame(0);

    // Aggiorna orig_sprite così le nuove animazioni useranno lo spritesheet corretto
    player.orig_sprite = newSprite;

    // Forza animazione idle/salto
    if (player.ph_obj.body.blocked.down) {
        PP.assets.sprite.animation_play(player, "idle");
        player.currentAnim = "idle";
    } else {
        PP.assets.sprite.animation_play(player, "salto1");
        player.currentAnim = "salto1";
    }
};

// === CAMBIO MONDO ===
PP.entities.player.changeWorld = function (scene) {
    console.log("World changing to:", PP.game_state.otherWorld);
    PP.game_state.changingWorld = true;
    config.player_x = PP.game_state.player.geometry.x;
    config.player_y = PP.game_state.player.geometry.y;
    PP.scenes.start(PP.game_state.otherWorld);
}

PP.entities.player.refreshWorld = function (scene, player) {
    PP.game_state.otherWorld = PP.game_state.currentScene;
    PP.entities.player.changeWorld(scene, player);
}