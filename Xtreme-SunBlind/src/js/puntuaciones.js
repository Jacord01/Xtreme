'use strict';

var men = require('./menu.js');
var handle = require('./handleRequest.js');

var juego;
var respuesta;
var buttonInfoM;

var puntuaciones = {

	create: function(){
	 juego = this.game;
  	 juego.add.sprite(0,0,'Punct');

  	//Boton para volver atrás desde la puntuaciones
    buttonInfoM = juego.add.button(juego.world.centerX - 600 , 25, 'plat2', puntuaciones.vuelveAMenu, this, 2,1,0);
    buttonInfoM.animations.add('plat2');
    buttonInfoM.animations.play('plat2', 4, true );
    buttonInfoM.width = 100;
    buttonInfoM.height = 50;

    puntuaciones.ActualizaTabla();
	}
}

puntuaciones.ActualizaTabla = function () {
	handle.Peticion(juego, false, true);
	handle.Peticion(juego, true, false);
}

puntuaciones.vuelveAMenu = function(){

	juego.state.start('menu');
}

module.exports = puntuaciones;