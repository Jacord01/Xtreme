'use strict';

var PlayScene = require('./play_scene.js');

var buttonJuego;  var juego;

var Tutorial = {

  create: function () {
    juego = this.game;

    juego.state.add('play', PlayScene); 

    //Boton que nos lleva al juego
    buttonJuego = juego.add.button(juego.world.centerX - 75, 275, 'button', actionOnClickJuego, this, 2,1,0);
    buttonJuego.animations.add('button');
    buttonJuego.animations.play('button', 4, true );
    buttonJuego.width = 150;
    buttonJuego.height = 60;

 },
};


function actionOnClickJuego () {
    
    juego.state.start('play');
}

module.exports = Tutorial; 

