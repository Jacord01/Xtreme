//Scripta para objetos movibles

"use strict";

//Constructora
function movible(velx, vely, dir){
	this.velocity = {vx: velx, vy: vely};
	this.direction = dir;
}
var obj = require('./class_objeto');

//Creamos el objeto object para acceder a la posicion
var object = new obj.objeto(4, 6, " ");

//Metodo para aplicar la velocidad
movible.prototype.actualiza_pos = function(vx, vy){
	object.posicion.x = vx*object.posicion.x;
	object.posicion.y = vy*object.posicion.y;
};