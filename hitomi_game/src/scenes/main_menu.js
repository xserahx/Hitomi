let menu_bg;

function preload(s) {
  menu_bg = PP.assets.image.load(s, "assets/images/homepage.png");
}

function create(s) {
  const centerX = PP.game.config.canvas_width / 2;
  const centerY = PP.game.config.canvas_height / 2;
  PP.game_state.DevMode = false;
  
  PP.assets.image.add(s, menu_bg, centerX, centerY, 0.5, 0.5);

  PP.game_state.bossIsDead = false;
  PP.game_state.bossIsFriendly = false;

  // === TITOLO PRINCIPALE ===
  s.add.text(centerX, centerY - 120, "Hitomi", {
    fontFamily: "Gotham",
    fontSize: "120px",
    color: "#FFFFFF",
    fontStyle: "bold",
    align: "center"
  }).setOrigin(0.5);

  // === SOTTOTITOLO ===
  s.add.text(centerX, centerY - 20, "Through The Other Side", {
    fontFamily: "Baskerville",
    fontSize: "50px",
    color: "#FFFFFF",
    align: "center"
  }).setOrigin(0.5);

  // === MENU OPZIONI ===
  const menuItems = [
    { label: "Gioca", y: centerY + 100, action: () => PP.scenes.start("tutorial_scene") },
    { label: "House Scene (DEV)", y: centerY + 180, action: () => PP.scenes.start("house_scene") },
    { label: "Forest Scene (DEV)", y: centerY + 260, action: () => PP.scenes.start("forest_scene") },
    { label: "Boss Scene (DEV)", y: centerY + 340, action: () => PP.scenes.start("bossfight_scene") }
  ];

  menuItems.forEach(item => {
    const text = s.add.text(centerX, item.y, item.label, {
      fontFamily: "Gotham",
      fontSize: "45px",
      color: "#FFFFFF",
      align: "center"
    }).setOrigin(0.5);

    // === Effetti interattivi ===
    text.setInteractive({ useHandCursor: true });
    text.on("pointerover", () => text.setColor("#6b60e6ff"));
    text.on("pointerout", () => text.setColor("#FFFFFF"));
    text.on("pointerdown", item.action);
  });
}

function update(s) {
  // Nessun aggiornamento necessario
}

function destroy(s) {
  // Pulizia se necessario
}

PP.scenes.add("main_menu", preload, create, update, destroy);
