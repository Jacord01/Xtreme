//Scripta para objetos movibles

"use strict";

var GO = require('./class_object');

var movibl = function(game, entradax, entraday, entradasprite, dir, velx){
  GO.call(this, game, entradax, entraday, entradasprite);
  this.direction = dir;
  this.velocidad = velx;
  game.physics.arcade.enable(this);
}

movibl.prototype = Object.create(GO.prototype);
movibl.prototype.constructor = movibl;

movibl.prototype.actualiza_pos = function(){
  this.body.velocity.x = this.velocidad * this.direction;
};

movibl.prototype.cambia_dir = function(){
	this.direction = this.direction * (-1);
}

module.exports = movibl;