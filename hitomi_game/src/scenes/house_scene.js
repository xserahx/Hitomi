// === HOUSE SCENE ===
function preload_house(scene) {

    // SPRITE PERSONALIZZATI
    scene.load.image("rialzino", "assets/images/house/rialzino.png");
    scene.load.image("palo_verticale","assets/images/house/wall_vertical.png");
    scene.load.image("piattaforma", "assets/images/house/piattaforma.png");
    scene.load.image("vaso", "assets/images/house/vaso.png");
    scene.load.image("armadio", "assets/images/house/armadio.png");

    // RESTO DELLE PIATTAFORME
    scene.load.image("platform_block2", "assets/images/house/platform_block2.png");
    scene.load.image("wall_big1", "assets/images/house/wall_big1.png");
    scene.load.image("platform_block3", "assets/images/house/platform_block3.png");
    scene.load.image("platform_block4", "assets/images/house/platform_block4.png");
    scene.load.image("platform_block5", "assets/images/house/platform_block5.png");
    scene.load.image("wall_big2", "assets/images/house/wall_big2.png");
    scene.load.image("platform_block6", "assets/images/house/platform_block6.png");
    scene.load.image("platform_block7", "assets/images/house/platform_block7.png");
    scene.load.image("platform_block8", "assets/images/house/platform_block8.png");
    scene.load.image("wall_big3", "assets/images/house/wall_big3.png");
    scene.load.image("platform_block9", "assets/images/house/platform_block9.png");
    scene.load.image("platform_block10", "assets/images/house/platform_block10.png");
    scene.load.image("wall_vertical_small", "assets/images/house/wall_vertical_small.png");
    scene.load.image("platform_block11", "assets/images/house/platform_block11.png");
    scene.load.image("platform_block12", "assets/images/house/platform_block12.png");
    scene.load.image("platform_block13", "assets/images/house/platform_block13.png");
    scene.load.image("platform_block14", "assets/images/house/platform_block14.png");
    scene.load.image("platform_block15", "assets/images/house/platform_block15.png");
    scene.load.image("wall_vertical_small2", "assets/images/house/wall_vertical_small2.png");
    scene.load.image("platform_block16", "assets/images/house/platform_block16.png");
    scene.load.image("platform_block17", "assets/images/house/platform_block17.png");
    scene.load.image("platform_block18", "assets/images/house/platform_block18.png");
    scene.load.image("platform_block19", "assets/images/house/platform_block19.png");
    scene.load.image("platform_block20", "assets/images/house/platform_block20.png");
    scene.load.image("platform_block21", "assets/images/house/platform_block21.png");
    scene.load.image("wall_big4", "assets/images/house/wall_big4.png");

    // OGGETTI INTERATTIVI
    scene.load.image("key_gold", "assets/sprites/key_gold.png");
    scene.load.image("door_locked", "assets/sprites/door_locked.png");
}

function create_house(scene, data) {

    // === SFONDO ===
    scene.cameras.main.setBackgroundColor(0x202020);

    // === GROUND ===
    const ground = scene.add.rectangle(3840, 720+175, 7680, 40, 0x000000);
    scene.physics.add.existing(ground, true);



    // --- PIATTAFORME ---
    const platformData = [
        // PIATTAFORME GIA' CON SPRITE //
        { x: 140, y: 635+175, w: 130, h: 130, spriteKey: "rialzino" },
        { x: 250, y: 564+175, w: 50, h: 270, spriteKey: "palo_verticale" },
        { x: 540, y: 520+175, w: 150, h: 42, spriteKey: "piattaforma" },
        { x: 1050, y: 635+175, w: 87, h: 130, spriteKey: "vaso" },
        { x: 780, y: 610+175, w: 130, h: 180, spriteKey: "armadio" },

        { x: 350, y: 470+175, w: 150, h: 20, spriteKey: "platform_block2" }, // basetta attaccata al palo
        { x: 1280, y: 250+175, w: 100, h: 620, spriteKey: "wall_big1" },  // muro grande a sinistra
        { x: 1600, y: 600+175, w: 150, h: 20, spriteKey: "platform_block3" }, // piattaforma piccola dopo muro grande
        { x: 1800, y: 500+175, w: 150, h: 20, spriteKey: "platform_block4" }, // seconda piattaforma piccola dopo muro grande
        { x: 2300, y: 400+175, w: 150, h: 20, spriteKey: "platform_block5" }, // ultima piattaforma piccola prima del secondo muro grande
        { x: 2560, y: 250+175, w: 100, h: 620, spriteKey: "wall_big2" },  // secondo muro grande
        { x: 2850, y: 675+175, w: 150, h: 100, spriteKey: "platform_block6" }, // cubone 1 dopo secondo muro
        { x: 3100, y: 625+175, w: 150, h: 250, spriteKey: "platform_block7" }, // cubone 2 dopo secondo muro
        { x: 3600, y: 450+175, w: 150, h: 20, spriteKey: "platform_block8" },  // piattaforma dopo i  cuboni 
        { x: 3840, y: 250+175, w: 100, h: 620, spriteKey: "wall_big3" }, // terzo muro grande
        { x: 4040, y: 250+175, w: 300, h: 150, spriteKey: "platform_block9" }, // piattaforma grande attaccata al terzo muro
        { x: 4265, y: 250+175, w: 150, h: 40, spriteKey: "platform_block10" }, 
        { x: 4335, y: 220+175, w: 40, h: 120, spriteKey: "wall_vertical_small" },
        { x: 4335, y: 150+175, w: 100, h: 20, spriteKey: "platform_block11" },
        { x: 4300, y: 630+175, w: 150, h: 100, spriteKey: "platform_block12" },
        { x: 4500, y: 470+175, w: 150, h: 20, spriteKey: "platform_block13" },
        { x: 4550, y: 130+175, w: 150, h: 20, spriteKey: "platform_block14" },
        { x: 4650, y: 300+175, w: 150, h: 20, spriteKey: "platform_block15" },
        { x: 4745, y: 375+175, w: 40, h: 150, spriteKey: "wall_vertical_small2" },
        { x: 5250, y: 300+175, w: 150, h: 100, spriteKey: "platform_block16" },
        { x: 5650, y: 250+175, w: 150, h: 100, spriteKey: "platform_block17" },
        { x: 6050, y: 200+175, w: 150, h: 100, spriteKey: "platform_block18" },
        { x: 6450, y: 300+175, w: 150, h: 100, spriteKey: "platform_block19" },
        { x: 7000, y: 480+175, w: 150, h: 20, spriteKey: "platform_block20" },
        { x: 7150, y: 595+175, w: 150, h: 250, spriteKey: "platform_block21" },
        { x: 7650, y: 250+175, w: 100, h: 620, spriteKey: "wall_big4" }
    ];

    PP.game_state.platforms = scene.physics.add.staticGroup();

    for (let p of platformData) {
        const plat = PP.game_state.platforms.create(p.x, p.y, p.spriteKey);
        plat.setOrigin(0.5);
        plat.displayWidth = p.w;
        plat.displayHeight = p.h;
        plat.refreshBody();
    }

    // --- PLAYER ---
    const startX = data?.x ?? PP.game_state.playerPosition?.x ?? 200;
    const startY = data?.y ?? PP.game_state.playerPosition?.y ?? 500;
    PP.game_state.player = PP.entities.player.create(scene, startX, startY);

    scene.physics.add.collider(PP.game_state.player, ground);
    scene.physics.add.collider(PP.game_state.player, PP.game_state.platforms);



    // === CAMERA ===
    scene.cameras.main.startFollow(PP.game_state.player);
    scene.cameras.main.setBounds(0, 0, 7680, 900);
    scene.physics.world.setBounds(0, 0, 7680, 900);
    scene.cameras.main.fadeIn(800, 0, 0, 0);



    // === CHIAVE ===
    const key = scene.physics.add.staticSprite(500, 600, "key_gold");
    let keyCollected = false;

    scene.physics.add.overlap(PP.game_state.player, key, () => {
        if (keyCollected) return;
        keyCollected = true;
        PP.game_state.player.hasKey = "goldenKey";
        key.destroy();

        showAchievement(scene,
            "Una chiave? Forse potrebbe aprire qualche piccola serratura..."
        );
    });

    // === PORTA ===
    const door = scene.physics.add.staticSprite(7650, 700, "door_locked");
    door.setOrigin(0.5, 1);

    door.isLocked = true;
    door.keyId = "goldenKey";
    door._opening = false;
    door._opened = false;
    door._enteringScene = false;
    door._popupActive = false;
    door._pendingAsk = false;
    door._msgShownLocked = false;


    function showDoorPopup() {

        if (door._popupActive) return;
        door._popupActive = true;

        const px = PP.game_state.player.x;
        const py = PP.game_state.player.y;

        const msg = scene.add.text(px, py - 90,
            "Vuoi usare la chiave per aprire la porta?",
            { font:"26px Arial", fill:"#fff", backgroundColor:"#333", padding:{x:10,y:6}}
        ).setOrigin(0.5,1);

        const btnYes = scene.add.text(px - 50, py - 40, "Sì",
            { font:"26px Arial", fill:"#0f0", backgroundColor:"#000", padding:{x:8,y:4}}
        ).setOrigin(0.5).setInteractive({useHandCursor:true});

        const btnNo = scene.add.text(px + 50, py - 40, "No",
            { font:"26px Arial", fill:"#f00", backgroundColor:"#000", padding:{x:8,y:4}}
        ).setOrigin(0.5).setInteractive({useHandCursor:true});

        function removePopup() {
            msg.destroy();
            btnYes.destroy();
            btnNo.destroy();
            door._popupActive = false;
        }

        btnYes.on("pointerdown", () => {
            removePopup();
            door._opening = true;

            openDoor(door, scene, () => {
                door._opening = false;
                door.isLocked = false;
                door._opened = true;

                if (!door._enteringScene) {
                    door._enteringScene = true;
                    scene.cameras.main.fadeOut(1000);

                    scene.time.delayedCall(1000, () => {
                        PP.game_state.playerPosition = { x: PP.game_state.player.x, y: PP.game_state.player.y };
                        scene.scene.start("forest_scene", PP.game_state.playerPosition);
                    });
                }
            });
        });

        btnNo.on("pointerdown", () => {
            removePopup();

            if (!door._pendingAsk) {
                door._pendingAsk = true;

                scene.time.delayedCall(1500, () => {
                    const dist = Phaser.Math.Distance.Between(
                        PP.game_state.player.x, PP.game_state.player.y,
                        door.x, door.y
                    );

                    if (dist < 150 && door.isLocked) showDoorPopup();

                    door._pendingAsk = false;
                });
            }
        });
    }

    // === COLLISIONE PORTA ===
    scene.physics.add.overlap(PP.game_state.player, door, () => {

        if (door._opening) return;

        // Porta chiusa → NON ho la chiave
        if (door.isLocked && PP.game_state.player.hasKey !== door.keyId) {
            if (!door._msgShownLocked) {
                door._msgShownLocked = true;
                showFloatingMessage(scene,
                    "La porta è bloccata... dovrei trovare una chiave.",
                    PP.game_state.player.x, PP.game_state.player.y
                );
            }
            return;
        }

        // Porta chiusa → ho la chiave
        if (door.isLocked && PP.game_state.player.hasKey === door.keyId) {
            showDoorPopup();
            return;
        }

        // Porta già aperta
        if (!door.isLocked && door._opened && !door._enteringScene) {
            door._enteringScene = true;
            scene.cameras.main.fadeOut(1000);

            scene.time.delayedCall(1000, () => {
                PP.game_state.playerPosition = { x: PP.game_state.player.x, y: PP.game_state.player.y };
                scene.scene.start("forest_scene", PP.game_state.playerPosition);
            });
        }
    });

    // === INPUT ===
    PP.interactive.kb.keys = scene.input.keyboard.addKeys({
        A: Phaser.Input.Keyboard.KeyCodes.A,
        D: Phaser.Input.Keyboard.KeyCodes.D,
        SPACE: Phaser.Input.Keyboard.KeyCodes.SPACE,
        LEFT: Phaser.Input.Keyboard.KeyCodes.LEFT,
        RIGHT: Phaser.Input.Keyboard.KeyCodes.RIGHT,
        SHIFT: Phaser.Input.Keyboard.KeyCodes.SHIFT,
        U: Phaser.Input.Keyboard.KeyCodes.U
    });

    // === CAMBIO MONDO ===
    PP.game_state.changingWorld = false;
    scene.input.keyboard.on("keydown-U", () => switchWorld(scene));
    scene.input.keyboard.on("keydown-u", () => switchWorld(scene));
}

// === MESSAGGIO  ===
function showFloatingMessage(scene, text, x, y) {
    const msg = scene.add.text(x, y - 50, text,
        { font:"24px Arial", fill:"#fff", backgroundColor:"#333", padding:{x:8,y:4} }
    );
    msg.setOrigin(0.5, 1);
    msg.setAlpha(0);

    scene.tweens.add({
        targets: msg,
        alpha: 1,
        duration: 400,
        onComplete: () => {
            scene.time.delayedCall(2000, () => {
                scene.tweens.add({
                    targets: msg,
                    alpha: 0,
                    duration: 400,
                    onComplete: () => msg.destroy()
                });
            });
        }
    });
}


// === ACHIEVEMENT ===
function showAchievement(scene, text) {
    const t = scene.add.text(
        scene.cameras.main.centerX, 100, text,
        { font:"24px Arial", fill:"#fff", backgroundColor:"#333", padding:{x:10,y:5} }
    );
    t.setOrigin(0.5);
    t.setAlpha(0);

    scene.tweens.add({
        targets: t,
        alpha: 1,
        duration: 400,
        onComplete: () => {
            scene.time.delayedCall(2000, () => {
                scene.tweens.add({
                    targets: t,
                    alpha: 0,
                    duration: 400,
                    onComplete: () => t.destroy()
                });
            });
        }
    });
}

// === APERTURA PORTA (ANIMAZIONE SLIDE) ===
function openDoor(door, scene, onComplete) {
    if (door._isTweening) return;

    door._isTweening = true;

    scene.tweens.add({
        targets: door,
        x: door.x + 80,
        duration: 500,
        ease: "Power2",
        onComplete: () => {
            if (door.body) door.body.enable = false;
            door._isTweening = false;
            if (onComplete) onComplete();
        }
    });
}

// === CAMBIO MONDO ===
function switchWorld(scene) {
    if (PP.game_state.changingWorld) return;

    PP.game_state.changingWorld = true;
    PP.game_state.playerPosition = {
        x: PP.game_state.player.x,
        y: PP.game_state.player.y
    };

    const current = scene.scene.key;
    const next = current.startsWith("ghostly_")
        ? current.replace("ghostly_", "")
        : "ghostly_" + current;

    scene.cameras.main.fadeOut(500);

    scene.time.delayedCall(500, () => {
        scene.scene.start(next, PP.game_state.playerPosition);
        PP.game_state.changingWorld = false;
    });
}

// === UPDATE ===
function update_house(scene) {
    PP.entities.player.update(scene, PP.game_state.player, PP.interactive.kb.keys);

    if (PP.game_state.player) {
        PP.game_state.playerPosition = {
            x: PP.game_state.player.x,
            y: PP.game_state.player.y
        };
    }
}

// === DESTROY ===
function destroy_house(scene) {}

// === REGISTRA LA SCENA ===
PP.scenes.add("house_scene", preload_house, create_house, update_house, destroy_house);

