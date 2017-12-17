'use strict';

var PlayScene = require('./play_scene.js');
var menuInformacion = require('./menuInformacion');

var buttonJuego; var buttonInfo; 
var juego;

var menu = {

  create: function () {
    juego = this.game;

    juego.state.add('info', menuInformacion);

    juego.state.add('play', PlayScene); 

   juego.add.sprite(0,0,'Menu');

    //Boton que nos lleva al juego
    buttonJuego = juego.add.button(juego.world.centerX - 75, 275, 'plat0', actionOnClickJuego, this, 2,1,0);
    buttonJuego.animations.add('plat0');
    buttonJuego.animations.play('plat0', 4, true );
    buttonJuego.width = 150;
    buttonJuego.height = 60;

    //Boton para el menú de información
    buttonInfo = juego.add.button(juego.world.centerX - 75, 475, 'plat0', actionOnClickInfo, this, 2,1,0);
    buttonInfo.animations.add('plat0');
    buttonInfo.animations.play('plat0', 4, true );
    buttonInfo.width = 150;
    buttonInfo.height = 60;
 },
};



function actionOnClickJuego () {

  
    juego.state.start('play');
}

function actionOnClickInfo(){

	juego.state.start('info');
}




module.exports = menu; 