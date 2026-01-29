const config = {
  canvas_width: 1280,
  canvas_height: 720,
  canvas_id: 'game',
  background_color: 0x000000,
  debug_mode: true,
  gravity_value: 600,
  player_x: 0,
  player_y: 0,
  player_is_hit: false
};

// ✅ INIZIALIZZAZIONE GLOBALE DELLO STATO
PP.game_state = PP.game_state || {};
PP.game_state.enemiesState = PP.game_state.enemiesState || {};
PP.game_state.playerPosition = PP.game_state.playerPosition || null;
PP.game_state.nanashiState = PP.game_state.nanashiState || "not_taken";
PP.game_state.changingWorld = false;

// Create the game with PoliPhaser
PP.game.create(config);
