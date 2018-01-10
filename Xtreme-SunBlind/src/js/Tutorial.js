'use strict';

var PlayScene = require('./play_scene.js');

var buttonJuego;  var juego; var video; var timer;

var Tutorial = {

  create: function () {
    juego = this.game;

    juego.state.add('play', PlayScene); 
    //Aquí insertamos el vídeo de cómo jugar
   
    juego.add.sprite(0,0, 'fVideo');
    var aux = juego.add.sprite(100,0, 'aux');
    aux.width = 1100;
    aux.height = 615;

    video = juego.add.video('tuto');
    video.play(false);
    video.addToWorld(650, 300, 0.5, 0.5, 0.8, 0.8);

    timer = setTimeout(function(){video.currentTime = 0;
	video.stop(); juego.state.start('play');}, 35000);

    //Boton que nos lleva al juego
    buttonJuego = juego.add.button(juego.world.centerX + 400, 600, 'omitir', actionOnClickJuego, this, 2,1,0);
    buttonJuego.animations.add('omitir');
    buttonJuego.animations.play('omitir', 4, true );
    buttonJuego.width = 150;
    buttonJuego.height = 60;

 },
};


function actionOnClickJuego () {
	video.currentTime = 0;
	video.stop();
    clearTimeout(timer);
    juego.state.start('play');
}

module.exports = Tutorial; 

