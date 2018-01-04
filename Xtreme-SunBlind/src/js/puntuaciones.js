'use strict';

var men = require('./menu.js');
var handle = require('./handleRequest.js');

var juego;

var puntuaciones = {

	create: function(){
	 juego = this.game;
  	 juego.add.sprite(0,0,'Punct');
  	 puntuaciones.ActualizaTabla();
	}
}

puntuaciones.ActualizaTabla = function () {
	handle.Peticion(juego);
}

module.exports = puntuaciones;