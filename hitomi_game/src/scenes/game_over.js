function preload(s) {

}

function create(s) {

    // Questa scena di game over contiene solamente il testo centrato.

    PP.shapes.text_styled_add(s, 
                PP.game.config.canvas_width / 2,
                PP.game.config.canvas_height / 2,
                "Game Over",
                100,
                "Helvetica",
                "normal",
                "0xFFFFFF",
                null,
                0.5,
                0.5);

}

function update(s) {

}

function destroy(s) {

}

PP.scenes.add("game_over", preload, create, update, destroy);