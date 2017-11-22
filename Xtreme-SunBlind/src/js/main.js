'use strict';

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });


function preload() {

    game.stage.backgroundColor = '#1ff';

    game.load.image('player', 'images/original.png');
    game.load.image('tostadora', 'images/tostadora.png');

}

var jugador;
var platforms;
var cursors;
var jumpButton;

function create() {

    jugador = new objeto( 0,0,'player');

    console.log(jugador);

}

function update () {


    if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
      jugador.cambia_pos(jugador.posicion.x - 10, jugador.posicion.y);

    else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
       jugador.cambia_pos(jugador.posicion.x + 10, jugador.posicion.y);

    if(game.input.keyboard.isDown(Phaser.Keyboard.UP))
       jugador.cambia_pos(jugador.posicion.x, jugador.posicion.y - 10);

     else if(game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
       jugador.cambia_pos(jugador.posicion.x, jugador.posicion.y + 10);

     if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
       jugador.reescala_imagen(0.5,0.5);

}

function render () {

}


//****************FUNCION OBJETO******************\\


function objeto(entradax, entraday, entradasprite){


  this.posicion = {x: entradax, y: entraday};
  this.sprite = entradasprite;
  this.objeto = game.add.sprite(this.posicion.x,this.posicion.y,this.sprite);

}

//Metodo para cambiar la posicion del objeto
objeto.prototype.cambia_pos = function(newposx, newposy){
  
  this.objeto.x = newposx;
  this.objeto.y = newposy;
  this.posicion.x =  newposx;
  this.posicion.y = newposy;
 
 

};

//Metodo para cambiar el sprite del objeto
objeto.prototype.cambia_sprite = function (newsprite) {

  this.objeto.sprite = newsprite;
};

objeto.prototype.reescala_imagen = function (x, y){

  this.objeto.scale.setTo(x,y);
}


//*************FUNCION MOVIBLE**************************\\

function movible(velx, vely, dir){
  this.velocity = {vx: velx, vy: vely};
  this.direction = dir;
}

//Creamos el objeto object para acceder a la posicion

//Metodo para aplicar la velocidad
movible.prototype.actualiza_pos = function(vx, vy){
  object.posicion.x = vx*object.posicion.x;
  object.posicion.y = vy*object.posicion.y;
};

//***************************************************************\\

