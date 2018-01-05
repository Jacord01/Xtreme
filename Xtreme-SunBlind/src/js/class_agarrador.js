"use strict";

var enemy = require('./class_enemy');
var escena = require('./play_scene');
var HUD = require('./HUD');

var agarrador =  function(game, entradax, entraday, entradasprite, jugador, grabber){
  enemy.call(this, game, entradax, entraday, entradasprite, 1, 1, grabber, 1);

  this.agarrando = false;
  this.medAgarro = 50;
  this.jug = jugador;
  this.juego = game;
  this.espacio = this.juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  this.reescala_imagen(1.5,1.5);
  this.aleatorio = 0;
    this.animations.add('mueve',[0,1,2,3,4,5,6,7], 3, true);
  this.animations.play('mueve');

}

agarrador.prototype = Object.create(enemy.prototype);
agarrador.prototype.constructor = agarrador;


agarrador.prototype.update = function(){
	if(this.golpeado) this.stunt = true;
	//this.juego.debug.body(this);
	//this.juego.debug.text('POSICION: ' + this.x + 'Y: ' + this.y, this.x , this.y);
	//this.juego.debug.text('MEDIDOR AGARRADO: ' + this.medAgarro, 500, 70);
	//this.juego.debug.text('JUGADOR AGARRADO: ' + this.jug.agarrado, 500, 90);

	if(this.jug.agarrado === true && this.espacio.isDown && this.espacio.downDuration(50)){
		this.medAgarro += 10 / 4;
		HUD.cambiaGrabber(this.medAgarro);

	}
	
	if(this.medAgarro >= 100){
		this.aleatorio = this.juego.rnd.integerInRange(0,1);
		if(this.aleatorio === 0)
			this.aleatorio = -1;

		this.jug.cambia_pos(this.x + 200 * this.aleatorio, this.y);
		this.jug.agarrado = false;
		this.agarrando = false;
		this.medAgarro = 50;
		HUD.GrabberInvisible();
	}

	else if (this.medAgarro < 0 && this.jug.agarrado === true){
		this.jug.agarrado = false;
		this.agarrando = false;
		this.medAgarro = 50;
		HUD.GrabberInvisible();
		escena.estadosJugador.jugadorMuerte();
	}

	
}

agarrador.prototype.agarra = function(jug){
	var ag = this; //Cagon el this de las narices la de tiempo que he estado para esta bobada
	ag.medAgarro = 50;
	ag.agarrando = true;
	jug.agarrado = true;
	HUD.GrabberVisible(this.x, this.y);
	
	agarrador.prototype.cambiaAgarre(ag, jug);
}

agarrador.prototype.cambiaAgarre = function(ag, jug){

	HUD.cambiaGrabber(ag.medAgarro);
	ag.medAgarro -= 10;
	if(ag.jug.agarrado)
		setTimeout(function(){agarrador.prototype.cambiaAgarre(ag, jug);}, 350);

}

module.exports = agarrador;