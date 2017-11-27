'use strict';

var movible = require('./class_movible');	

var Protagonista = function(){
	movible.call(this, 'player');
	this.vida = 0;
	this.salto = 0;
}

Protagonista.prototype = Object.create(movible.prototype);
Protagonista.prototype.constructor = Protagonista;

Protagonista.prototype.actualizaVida = function (life){
	this.vida += life;
}

module.exports = Protagonista;