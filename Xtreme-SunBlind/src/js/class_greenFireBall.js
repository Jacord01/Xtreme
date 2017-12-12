'use strict';

var fireball = require('./class_fireball');	

var greenfireball = function(game, entradax, entraday, entradasprite, dir, velx){
	fireball.call(this, game, entradax, entraday, entradasprite, dir, velx);
	this.velocidadY = 100;
	this.cont = 25;
	this.origcont = this.cont;
}

greenfireball.prototype = Object.create(fireball.prototype);
greenfireball.prototype.constructor = greenfireball;

greenfireball.prototype.update = function (){
	if (this.sale){
		this.actualiza_pos(this.velocidad);
		if (this.cont > 12){
			this.body.velocity.y = this.velocidadY;
		}
		else{
			this.body.velocity.y = -this.velocidadY;
		}
		this.cont--;
		if (this.cont <= 0)
			this.cont = this.origcont;
	}
}

module.exports = greenfireball;