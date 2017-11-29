'use strict';

var per = require('./class_protagonista');
var plat = require('./class_plataforma');
var tort = require('./class_tortuguita');
var game = require('./main');

var jugador;
var temporizador;
var platforms;
var enemigs;
var deadZone;

var PlayScene = {
  create: function () {

    //Activamos la física del juego
game.physics.startSystem(Phaser.Physics.ARCADE);

//Imagen de fondo
game.add.sprite(0,0,'fond');

//Temporizador para el juego en general
temporizador = game.time.create(false);

//Creamos grupo de plataformas
platforms = game.add.physicsGroup();
plataformas();

//Creamos al jugador
jugador = new per();
jugador.cambia_pos(300, 650);

//Creamos enemigos
enemigs = game.add.physicsGroup();
enemigos();
  	
	}
};

function update(){

     //Para que choque el personaje con las plataformas
  game.physics.arcade.collide(jugador.fisica, platforms);
  game.physics.arcade.collide(enemigs, platforms);
  game.physics.arcade.collide(enemigs, jugador.fisica, collisionHandler);
  
  jugador.update();
  enemigs.prototype.update.call(this);

}

function render(){

}

function collisionHandler(){

//Esta parte de aquí mata al jugador y a los enemigos cuando chocan entre si

  jugador.fisica.kill();

  enemigo.fisica.kill();

  temporizador.loop(2000, revive, this);
  temporizador.start();
 
}


function revive(){
  jugador.fisica.reset(300,650);

  enemigo.fisica.reset(0,0);

  temporizador.stop();
}

function  plataformas (){

var anchorx;
var anchory;
var anchoPlat = 50;
var largoPlat = 50;
//conjuntos de plataformas
anchorx = 0;
anchory = 0;
for (var a = -1; a < 26; a++){
  var p = (new plat('tostadora'));
  p.cambia_pos(anchorx + (a*p.fisica.width), anchory);
  p.reescala_imagen(0.1, 0.005);
  platforms.add(p.fisica);
}
anchorx = 0;
anchory = 150;
for (var a = 0; a < 10; a++){
  var p = (new plat('tostadora'));
  p.cambia_pos(anchorx + (a*p.fisica.width), anchory);
  platforms.add(p.fisica);
}
anchorx = 1280-anchoPlat;
anchory = 150;
for (var a = 0; a < 10; a++){
  var p = (new plat('tostadora'));
  p.cambia_pos(anchorx - (a*p.fisica.width), anchory);
  platforms.add(p.fisica);
}
anchorx = 350;
anchory = 375;
for (var a = 1; a < 11; a++){
  var p = (new plat('tostadora'));
  p.cambia_pos(anchorx + (a*p.fisica.width), anchory);
  platforms.add(p.fisica);
}

anchorx = 0;
anchory = 400;
for (var a = 0; a < 5; a++){
  var p = (new plat('tostadora'));
  p.cambia_pos(anchorx + (a*p.fisica.width), anchory);
  platforms.add(p.fisica);
}

anchorx = 1280 - anchoPlat * 5;
anchory = 400;
for (var a = 0; a < 5; a++){
  var p = (new plat('tostadora'));
  p.cambia_pos(anchorx + (a*p.fisica.width), anchory);
  platforms.add(p.fisica);
}

anchorx = 0;
anchory = 550;
for (var a = 0; a < 10; a++){
  var p = (new plat('tostadora'));
  p.cambia_pos(anchorx + (a*p.fisica.width), anchory);
  platforms.add(p.fisica);
}
anchorx = 1280-anchoPlat;
anchory = 550;
for (var a = 0; a < 10; a++){
  var p = (new plat('tostadora'));
  p.cambia_pos(anchorx - (a*p.fisica.width), anchory);
  platforms.add(p.fisica);
}

anchorx = 0;
anchory = 700;
for (var a = -1; a < 26; a++){
  var p = (new plat('tostadora'));
  p.cambia_pos(anchorx + (a*p.fisica.width), anchory);
  platforms.add(p.fisica);
}
}

function enemigos(){
  var enemigo = new tort();
  enemigs.add(enemigo.fisica);
}


module.exports = PlayScene;
