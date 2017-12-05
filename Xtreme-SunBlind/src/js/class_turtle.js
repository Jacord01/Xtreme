"use strict";

var enemigo = require('./class_enemy');

var tortuguita =  function(game, entradax, entraday, entradasprite, dir, velx){
  enemigo.call(this, game, entradax, entraday, entradasprite, dir, velx);
}
tortuguita.prototype = Object.create(enemigo.prototype);
tortuguita.prototype.constructor = tortuguita;

tortuguita.prototype.update = function (){
if (this.golpeado)
	this.stunt = true;
else
	this.stunt = false;

if(!this.stunt)
	this.actualiza_pos(this.velocidad);
else 
	this.actualiza_pos(0);
	if( this.body.velocity.x != 0 ||  this.body.velocity.y != 0){
         this.cambia_pos(this.x, this.y);
       }
}

module.exports = tortuguita;