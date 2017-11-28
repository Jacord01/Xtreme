'use strict';

var movible = require('./class_movible');	
var juego = require('./main');
var cursors;
var jumpButton;

var Protagonista = function(){
	movible.call(this, 'player');
	this.vida = 0;
	this.salto = 0;
	this.create();
}

Protagonista.prototype = Object.create(movible.prototype);
Protagonista.prototype.constructor = Protagonista;

Protagonista.prototype.create = function (){
	juego.game.physics.arcade.enable(this.fisica);
 	this.fisica.body.gravity.y = 4000;
 	cursors = juego.game.input.keyboard.createCursorKeys();
    jumpButton = juego.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.reescala_imagen(0.2,0.2);
}

Protagonista.prototype.actualizaVida = function (life){
	this.vida += life;
} 

Protagonista.prototype.update = function (){
	 this.fisica.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        this.fisica.body.velocity.x = -1000;
    }
    else if (cursors.right.isDown)
    {
        this.fisica.body.velocity.x = 1000;
    }

    if (jumpButton.isDown && (this.fisica.body.onFloor() 
      || this.fisica.body.touching.down))

    {
        this.fisica.body.velocity.y = -1500;
    }

     //Aquí actualizamos la posición del objeto jugador en su clase si es que se ha movido
      if( this.fisica.body.velocity.x != 0 ||  this.fisica.body.velocity.y != 0){
         this.cambia_pos(this.fisica.x, this.fisica.y);
       }
}

module.exports = Protagonista;