"use strict";

var enemy = require('./class_enemy');

var crab =  function(game, entradax, entraday, entradasprite, dir, velx){
  enemy.call(this, game, entradax, entraday, entradasprite, dir, velx);
  this.enfado = false;
  this.origVel = velx;
}
crab.prototype = Object.create(enemy.prototype);
crab.prototype.constructor = crab;

crab.prototype.update = function(){
	if (this.golpeado && !this.enfado){
		this.enfado = true;
		this.golpeado = false;
	}
	else if (this.golpeado && this.enfado)
		this.stunt = true;
	else
		this.stunt = false;

	if (this.enfado && !this.stunt)
		this.actualiza_pos(this.velocidad * 1.5);
	else if (!this.enfado && !this.stunt)
		this.actualiza_pos(this.velocidad);
	else
		this.actualiza_pos(0);

	if( this.body.velocity.x != 0 ||  this.body.velocity.y != 0){
         this.cambia_pos(this.x, this.y);
    }
	this.velocidad = this.origVel;
}

module.exports = crab;