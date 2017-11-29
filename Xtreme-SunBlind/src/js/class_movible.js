//Scripta para objetos movibles

"use strict";

var GO = require('./class_objeto');

//*************CLASS MOVIBLE**************************\\
var movible =  function(img){
  GO.call(this, 0, 0, img);
  this.velocity = {vx: 0, vy: 0};
  this.direction = -1;
}
movible.prototype = Object.create(GO.prototype);
movible.prototype.constructor = movible;

//Metodo para aplicar la velocidad
movible.prototype.actualiza_pos = function(vx){
  this.fisica.body.velocity.x = vx * this.direction;
};

movible.prototype.cambia_dir = function(){
	this.direction = this.direction * (-1);
}

module.exports = movible;