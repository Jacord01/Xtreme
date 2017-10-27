"use strict";

function movible(velx, vely, dir){
	this.velocity = {vx: velx, vy: vely};
	this.direction = dir;
}
var obj = require('./class_objeto');
var object = new obj.objeto(4, 6, "hola");

