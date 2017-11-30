'use strict';

var entorno = require('./class_environment');



var plataforma = function(game, entradax, entraday, entradasprite){
	entorno.call(this, game, entradax, entraday, entradasprite);
	this.reescala_imagen(0.1, 0.05);
	this.tocada = false;
	this.arriba = false;
	this.iniPointY = entraday;
	this.temporizador = this.game.time.create(false);
}

plataforma.prototype = Object.create(entorno.prototype);
plataforma.prototype.constructor = plataforma;

plataforma.prototype.cambia_tocada = function (){
	this.tocada = !this.tocada;
}



plataforma.prototype.jump = function(){
	if(this.arriba === false)
	{
	this.arriba = true;
	this.immovable = false;
	this.body.gravity.y = 400;
	this.body.velocity.y = -100

	this.temporizador.loop(500, vuelve, this);
  	this.temporizador.start();
}
	
}

function vuelve(){
	this.body.gravity.y = 0;
	this.body.velocity.y = 0;
	this.immovable = true;
	this.tocada = false;
	this.temporizador.stop();
	this.arriba = false;

}


module.exports = plataforma;