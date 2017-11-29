'use strict';

var movible = require('./class_movible');	
var juego = require('./main');

var enemigo = function(){
	movible.call(this, 'enemigo');
	this.create();
}

enemigo.prototype = Object.create(movible.prototype);
enemigo.prototype.constructor = enemigo;

enemigo.prototype.create = function (){
	juego.game.physics.arcade.enable(this.fisica);
 	this.fisica.body.gravity.y = 4000;
    this.reescala_imagen(0.05,0.04);
}

enemigo.prototype.update = function (){

	 this.fisica.body.velocity.x = +300;

	 this.cambia_pos(this.fisica.x, this.fisica.y);
}


module.exports = enemigo;