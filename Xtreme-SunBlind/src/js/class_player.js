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
  this.orinando = false;
  this.escala = 1.4;
  this.origVel = velx;
  this.vel = velx;
  this.corriendo = false;
  this.borracho = false;
  this.invencible = false;
  this.saltando = false;
	this.create();
}

Protagonista.prototype = Object.create(movible.prototype);
Protagonista.prototype.constructor = Protagonista;

Protagonista.prototype.create = function (){
 	this.body.gravity.y = 2000;
 	cursors = this.juego.input.keyboard.createCursorKeys();
    jumpButton = this.juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.reescala_imagen(1.2,1);
    this.animations.add('walk', [0,1,2,3]);
  this.animations.add('stay', [4,5], 6, true);
  this.animations.add('jump', [6,7,8,9,10,11,12,13,14]);
  this.animations.play('stay');
}

Protagonista.prototype.update = function (){

  //Si no hay inputs consideramos que el jugador está parado
	 this.body.velocity.x = 0;

	 if (this.corriendo)
	 	this.vel = 2*this.vel;

	 if (this.borracho){
	 	this.vel = -this.vel;
   }

   if(this.orinando)
    this.vel = 0;

	 this.juego.debug.text('VELOCIDAD: ' + this.vel, 32, 70);
   this.juego.debug.text('SALTO: ' + this.saltando, 230, 70);
   this.juego.debug.text('ORINANDO: ' + this.orinando, 500, 50);
   
    if (cursors.left.isDown)
    {
        this.body.velocity.x = -this.vel;
        if(!this.borracho)
          this.scale.x = -this.escala;
        else this.scale.x = this.escala;
        if (this.body.touching.down)
           this.animations.play('walk', 6, true);
    }
    else if (cursors.right.isDown)
    {
        this.body.velocity.x = this.vel;
        if(!this.borracho)
        this.scale.x = this.escala;
        else this.scale.x = -this.escala;
        if (this.body.touching.down)
           this.animations.play('walk', 6, true);
    }

    this.vel = this.origVel - (this.orina * 20);
    if (jumpButton.isDown && (this.body.onFloor() 
      || this.body.touching.down))

    {

        this.body.velocity.y = -1000;
    }

    if(!this.body.touching.down) //Si no toca el suelo, está saltando. Servirá para hacer pis
             this.saltando = true;
    else this.saltando = false;

    if(cursors.up.isDown && !this.saltando  && this.orina >= 10)
        {
          this.orina = 0;
          this.orinando = true;
          var prota = this;
          
          setTimeout(function(){prota.orinando = false;}, 1000);
        }


     //Aquí actualizamos la posición del objeto jugador en su clase si es que se ha movido
      if( this.body.velocity.x != 0 ||  this.body.velocity.y != 0){
         this.cambia_pos(this.x, this.y);
       }

       if (!this.body.touching.down)
        this.animations.play('jump', 10 , true);

       else if (this.body.velocity.x === 0)
       	this.animations.play('stay');
}

Protagonista.prototype.incrementaOrina = function (orina){

  this.orina = this.orina + orina;
  if(this.orina>10)
    this.orina = 10; 
}

module.exports = Protagonista;