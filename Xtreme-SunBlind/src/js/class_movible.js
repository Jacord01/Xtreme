//Scripta para objetos movibles

"use strict";

//*************CLASS MOVIBLE**************************\\
function movible(){

	var her = require('./class_objeto');
  this.herencia = new her.GO(0,0, '');
  //this.herencia.cambia_sprite('tostadora');
  this.velocity = {vx: 0, vy: 0};
  this.direction = 0;
}

//Metodo para aplicar la velocidad
movible.prototype.actualiza_pos = function(vx, vy){

  this.herencia.cambia_pos(this.herencia.posicion.x += vx,  
   this.herencia.posicion.y += vy);

};

module.exports.movible = movible;