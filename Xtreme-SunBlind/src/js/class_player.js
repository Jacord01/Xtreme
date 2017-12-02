'use strict';

var movible = require('./class_movibl');	
var cursors;
var jumpButton;

var Protagonista = function(game, entradax, entraday, entradasprite, dir, velx, vidas){
	movible.call(this, game, entradax, entraday, entradasprite, dir, velx);
	this.vidas = vidas;
	this.juego = game;
  this.revive = false;
  this.muerto = false;
	this.create();
}

Protagonista.prototype = Object.create(movible.prototype);
Protagonista.prototype.constructor = Protagonista;

Protagonista.prototype.create = function (){
 	this.body.gravity.y = 4000;
 	cursors = this.juego.input.keyboard.createCursorKeys();
    jumpButton = this.juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.reescala_imagen(0.2,0.2);
}

Protagonista.prototype.update = function (){

if (!this.muerto){
  //Si no hay inputs consideramos que el jugador está parado
	 this.body.velocity.x = 0;
   
    if (cursors.left.isDown)
    {
        this.body.velocity.x = -1000;
    }
    else if (cursors.right.isDown)
    {
        this.body.velocity.x = 1000;
    }

    if (jumpButton.isDown && (this.body.onFloor() 
      || this.body.touching.down))

    {
        this.body.velocity.y = -1500;
    }

     //Aquí actualizamos la posición del objeto jugador en su clase si es que se ha movido
      //if( this.body.velocity.x != 0 ||  this.body.velocity.y != 0){
      //   this.cambia_pos(this.x, this.y);
      // }
   }
}

module.exports = Protagonista;