function preload(s) {
  // Caricamenti futuri (font, immagini, ecc.)
}

function create(s) {
  const centerX = PP.game.config.canvas_width / 2;
  const centerY = PP.game.config.canvas_height / 2;

  // === TITOLO PRINCIPALE ===
  s.add.text(centerX, centerY - 120, "Hitomi", {
    fontFamily: "Helvetica",
    fontSize: "120px",
    color: "#FFFFFF",
    fontStyle: "bold",
    align: "center"
  }).setOrigin(0.5);

  // === SOTTOTITOLO ===
  s.add.text(centerX, centerY - 20, "Through The Other Side", {
    fontFamily: "Helvetica",
    fontSize: "50px",
    color: "#FFFFFF",
    align: "center"
  }).setOrigin(0.5);

  // === MENU OPZIONI ===
  const menuItems = [
    { label: "Start", y: centerY + 100, action: () => PP.scenes.start("tutorial_scene") },
    { label: "House Scene (DEVELOPMENT REASONS)", y: centerY + 180, action: () => PP.scenes.start("house_scene") },
    { label: "Forest Scene (DEVELOPMENT REASONS)", y: centerY + 260, action: () => PP.scenes.start("forest_scene") }
  ];

  menuItems.forEach(item => {
    const text = s.add.text(centerX, item.y, item.label, {
      fontFamily: "Helvetica",
      fontSize: "45px",
      color: "#FFFFFF",
      align: "center"
    }).setOrigin(0.5);

    // === Effetti interattivi ===
    text.setInteractive({ useHandCursor: true });
    text.on("pointerover", () => text.setColor("#ff4444"));
    text.on("pointerout", () => text.setColor("#FFFFFF"));
    text.on("pointerdown", item.action);
  });
}

function update(s) {
  // Nessun input da tastiera necessario
}

function destroy(s) {
  // Pulizia se necessario
}

PP.scenes.add("main_menu", preload, create, update, destroy);
