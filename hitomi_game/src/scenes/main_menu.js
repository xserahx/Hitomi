function preload(s) {

}

function create(s) {

    // PP.game_state.set_variable("coins,0")

    PP.shapes.text_styled_add(s, 
                PP.game.config.canvas_width / 2,
                PP.game.config.canvas_height / 2,
                "Hitomi\nThrough The Other Side",100,
                "Helvetica",
                "normal",
                "0xFFFFFF",
                null,
                0.5,
                0.5);

  PP.shapes.text_styled_add(s, 
                PP.game.config.canvas_width / 2,
                PP.game.config.canvas_height / 5 * 4,
                "Press Spacebar to Begin",
                50,
                "Helvetica",
                "normal",
                "0xFFFFFF",
                null,
                0.5,
                0.5);
}

function update(s) {
  if(PP.interactive.kb.is_key_down(s, PP.key_codes.SPACE)) {
    PP.scenes.start("tutorial_scene");
  }
  //if(PP.interactive.kb.is_key_down(s, PP.key_codes.SPACE)) {
  //  PP.scenes.start("tutorial_scene");
  //}
}

function destroy(s) {

}

PP.scenes.add("main_menu", preload, create, update, destroy);
