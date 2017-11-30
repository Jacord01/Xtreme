'use strict';

var entorno = require('./class_environment');

var plataforma = function(game, entradax, entraday, entradasprite){
	entorno.call(this, game, entradax, entraday, entradasprite);
	this.reescala_imagen(0.1, 0.05);
}

plataforma.prototype = Object.create(entorno.prototype);
plataforma.prototype.constructor = plataforma;

module.exports = plataforma;