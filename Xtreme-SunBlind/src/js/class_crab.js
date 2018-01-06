"use strict";

var enemy = require('./class_enemy');

var crab =  function(game, entradax, entraday, entradasprite, dir, velx, grabber){
  enemy.call(this, game, entradax, entraday, entradasprite, dir, velx, grabber, 6);
  this.enfado = false;
  this.origVel = velx;
  this.reescala_imagen(0.1,0.1);
}
crab.prototype = Object.create(enemy.prototype);
crab.prototype.constructor = crab;

crab.prototype.update = function(){
	if (this.golpeado && !this.enfado){
		this.enfado = true;
		this.golpeado = false;
	}
	else if (this.golpeado && this.enfado){
		this.stunt = true;
	}
	else
		this.stunt = false;

	if (this.enfado && !this.stunt)
		this.actualiza_pos(this.velocidad * 1.25 * this.cont);
	else if (!this.enfado && !this.stunt)
		this.actualiza_pos(this.velocidad * this.cont);
	else
		this.actualiza_pos(0);

	if( this.body.velocity.x != 0 ||  this.body.velocity.y != 0){
         this.cambia_pos(this.x, this.y);
    }
	this.velocidad = this.origVel;
}


module.exports = crab;