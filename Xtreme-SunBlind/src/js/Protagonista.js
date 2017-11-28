'use strict';

var movible = require('./class_movible');	
var juego = require('./main');

var Protagonista = function(){
	movible.call(this, 'player');
	this.vida = 0;
	this.salto = 0;
}

Protagonista.prototype = Object.create(movible.prototype);
Protagonista.prototype.constructor = Protagonista;

Protagonista.prototype.actualizaVida = function (life){
	this.vida += life;
} 

Protagonista.prototype.update = function (){
	/*this.body.velocity.x = 0;

    if (juego.cursors.left.isDown)
    {
        this.body.velocity.x = -250;
    }
    else if (juego.cursors.right.isDown)
    {
        this.body.velocity.x = 250;
    }

   // if (jumpButton.isDown && (patata.body.onFloor() || patata.body.touching.down))
   if (juego.jumpButton.isDown)
    {
        this.body.velocity.y = -400;
    }
    */
}

module.exports = Protagonista;