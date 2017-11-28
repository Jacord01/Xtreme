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
 	this.fisica.body.collideWorldBounds = true;
 	this.fisica.body.gravity.y = 500;
 	cursors = juego.game.input.keyboard.createCursorKeys();
    jumpButton = juego.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

Protagonista.prototype.actualizaVida = function (life){
	this.vida += life;
} 

Protagonista.prototype.update = function (){
	 this.fisica.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        this.fisica.body.velocity.x = -250;
    }
    else if (cursors.right.isDown)
    {
        this.fisica.body.velocity.x = 250;
    }

    if (jumpButton.isDown && (this.fisica.body.onFloor() 
      || this.fisica.body.touching.down))

    {
        this.fisica.body.velocity.y = -400;
    }
}

module.exports = Protagonista;