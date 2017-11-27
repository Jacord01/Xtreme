//Scripta para objetos movibles

"use strict";

var GO = require('./class_objeto');

//*************CLASS MOVIBLE**************************\\
var movible =  function(img){
  GO.call(this, 0, 0, img);
  this.velocity = {vx: 0, vy: 0};
  this.direction = 0;
}
movible.prototype = Object.create(GO.prototype);
movible.prototype.constructor = movible;

//Metodo para aplicar la velocidad
movible.prototype.actualiza_pos = function(vx, vy){
  this.cambia_pos(this.posicion.x += vx,   this.posicion.y += vy);
};

module.exports = movible;