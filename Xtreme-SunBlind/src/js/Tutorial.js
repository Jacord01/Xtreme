'use strict';

var PlayScene = require('./play_scene.js');

var buttonJuego;  var juego;

var Tutorial = {

  create: function () {
    juego = this.game;

    juego.state.add('play', PlayScene); 
    //Aquí insertamos el vídeo de cómo jugar
    juego.add.sprite(0,0, 'fVideo');

    //Boton que nos lleva al juego
    buttonJuego = juego.add.button(juego.world.centerX + 400, 600, 'omitir', actionOnClickJuego, this, 2,1,0);
    buttonJuego.animations.add('omitir');
    buttonJuego.animations.play('omitir', 4, true );
    buttonJuego.width = 150;
    buttonJuego.height = 60;

 },
};


function actionOnClickJuego () {
    
    juego.state.start('play');
}

module.exports = Tutorial; 

