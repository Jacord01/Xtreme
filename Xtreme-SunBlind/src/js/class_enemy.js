'use strict';

var movible = require('./class_movibl');	

var enemigo = function(game, entradax, entraday, entradasprite, dir, velx){
	movible.call(this, game, entradax, entraday, entradasprite, dir, velx);
	this.juego = game;
	this.create();
	this.velocidad = velx;
	this.stunt = false;
	this.golpeado = false;
}

enemigo.prototype = Object.create(movible.prototype);
enemigo.prototype.constructor = enemigo;

enemigo.prototype.create = function (){
	this.juego.physics.arcade.enable(this);
 	this.body.gravity.y = 4000;
    this.reescala_imagen(0.05,0.02);
}

enemigo.prototype.cambia_vel = function (vl){
	this.velocidad = vl;
}
module.exports = enemigo;






/*//var Modulo = {};
//Module.creaPower = function() {

//}
//module.exports.Modulo = Modulo;

//-----

//var module = require('Modulo');
//module.Modulo.creaPower
*/