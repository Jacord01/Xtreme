'use strict';

var men = require('./menu.js');
var handle = require('./handleRequest.js');

var juego;

var puntuaciones = {

	create: function(){
	 juego = this.game;
  	 juego.add.sprite(0,0,'Menu');

	}
}

puntuaciones.ActualizaTabla = function () {
	handle.Peticion();
}

module.exports = puntuaciones;