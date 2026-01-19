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
}

// Create the game with PoliPhaer
PP.game.create(config)
