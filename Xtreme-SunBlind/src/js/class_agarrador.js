"use strict";

var enemy = require('./class_enemy');

var agarrador =  function(game, entradax, entraday, entradasprite, jugador){
  enemy.call(this, game, entradax, entraday, entradasprite, 0, 0);
  this.agarrando = false;
  this.medAgarro = 50;
  this.jug = jugador;
  this.juego = game;
  this.espacio = this.juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  this.reescala_imagen(0.075,0.075);
  this.aleatorio = 0;

}

agarrador.prototype = Object.create(enemy.prototype);
agarrador.prototype.constructor = agarrador;

agarrador.prototype.update = function(){
	if(this.golpeado) this.stunt = true;

	this.juego.debug.text('MEDIDOR AGARRADO: ' + this.medAgarro, 500, 70);
	this.juego.debug.text('JUGADOR AGARRADO: ' + this.jug.agarrado, 500, 90);

	if(this.jug.agarrado == true && this.espacio.isDown && this.espacio.downDuration(50))
		this.medAgarro += 10 / 4;

	if(this.medAgarro >= 100){
		this.aleatorio = this.juego.rnd.integerInRange(0,1);
		if(this.aleatorio === 0)
			this.aleatorio = -1;

		this.jug.cambia_pos(this.x + 200 * this.aleatorio, this.y);
		this.jug.agarrado = false;
		this.agarrando = false;
		this.medAgarro = 50;
	}


}

agarrador.prototype.agarra = function(jug){
	var ag = this; //Cagon el this de las narices la de tiempo que he estado para esta bobada
	ag.agarrando = true;
	jug.agarrado = true;
	
	//agarrador.prototype.cambiaAgarre(ag);
}

agarrador.prototype.cambiaAgarre = function(ag){

	ag.medAgarro = ag.medAgarro - 10;
	setTimeout(function(){agarrador.prototype.cambiaAgarre(ag);}, 350);

}


module.exports = agarrador;