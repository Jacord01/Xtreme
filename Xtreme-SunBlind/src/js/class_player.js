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
  this.orina = 0;
  this.origVel = 500;
  this.vel = 500;
  this.corriendo = false;
  this.borracho = false;
	this.create();
}

Protagonista.prototype = Object.create(movible.prototype);
Protagonista.prototype.constructor = Protagonista;

Protagonista.prototype.create = function (){
 	this.body.gravity.y = 4000;
 	cursors = this.juego.input.keyboard.createCursorKeys();
    jumpButton = this.juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.reescala_imagen(1.4,1.1);
    this.animations.add('walk', [0,1,2,3]);
  this.animations.add('stay', [4,5], 6, true);
  this.animations.play('stay');
}

Protagonista.prototype.update = function (){

  //Si no hay inputs consideramos que el jugador está parado
	 this.body.velocity.x = 0;

	 if (this.corriendo)
	 	this.vel = 2*this.vel;

	 if (this.borracho)
	 	this.vel = -this.vel;

	 this.juego.debug.text('VELOCIDAD: ' + this.vel, 32, 70);
   
    if (cursors.left.isDown)
    {
        this.body.velocity.x = -this.vel;
        this.scale.x = -1.4;
        this.animations.play('walk', 6, true);
    }
    else if (cursors.right.isDown)
    {
        this.body.velocity.x = this.vel;
        this.scale.x = 1.4;
        this.animations.play('walk', 6, true);
    }

    this.vel = this.origVel - (this.orina * 20);

    if (jumpButton.isDown && (this.body.onFloor() 
      || this.body.touching.down))

    {
        this.body.velocity.y = -1500;
    }

     //Aquí actualizamos la posición del objeto jugador en su clase si es que se ha movido
      if( this.body.velocity.x != 0 ||  this.body.velocity.y != 0){
         this.cambia_pos(this.x, this.y);
       }

       if (this.body.velocity.x === 0)
       	this.animations.play('stay');
}

Protagonista.prototype.incrementaOrina = function (orina){

  this.orina = this.orina + orina;
  if(this.orina>10)
    this.orina = 10; 
}

module.exports = Protagonista;