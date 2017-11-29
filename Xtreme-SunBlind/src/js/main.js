'use strict';
//rezando

var game = new Phaser.Game(1280, 720, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

var per = require('./class_protagonista');
var plat = require('./class_plataforma');
var tort = require('./class_tortuguita');

function preload() {
    game.stage.backgroundColor = '#1ff';
    game.load.image('player', 'images/original.png');
    game.load.image('tostadora', 'images/tostadora.png');
    game.load.image('fond', 'images/Olaya.png');
    game.load.image('enemigo', 'images/juen.png');
}

var jugador;
var temporizador;
var platforms;
var enemigs;
var deadZone;
var plats = [];
var tortugas =  [];

function create() { 
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

function update () {
    //Para que choque el personaje con las plataformas
  game.physics.arcade.collide(jugador.fisica, platforms, collisionHandlerPlat);
  game.physics.arcade.collide(enemigs, platforms);
  game.physics.arcade.collide(enemigs, jugador.fisica, collisionHandlerEnem);
  
  jugador.update();
  for (var i = 0; i < 2; i++)
  tortugas[i].update();
}

function render () {

}


function collisionHandlerEnem(){

//Esta parte de aquí mata al jugador y a los enemigos cuando chocan entre si

  jugador.fisica.kill();

  for (var i = 0; i < 2; i++)
    tortugas[i].fisica.kill();

  temporizador.loop(2000, revive, this);
  temporizador.start();
 
}

function collisionHandlerPlat(jug, plat){

//Esta parte de aquí mata al jugador y a los enemigos cuando chocan entre si
  
if(jugador.fisica.body.touching.up === true)
  plat.kill();

 
}


function revive(){
  jugador.fisica.reset(300,650);

  for (var i = 0; i < 2; i++)
   tortugas[i].fisica.reset(i * 1200, 0);

  temporizador.stop();
}


function  plataformas (){

var anchorx;
var anchory;
var anchoPlat = 50;
var largoPlat = 50;
var num = 0;
//conjuntos de plataformas
anchorx = 0;
anchory = 0;
for (var a = -1; a < 26; a++){
  var p = (new plat('tostadora'));
  p.cambia_pos(anchorx + (a*p.fisica.width), anchory);
  p.reescala_imagen(0.1, 0.005);
  platforms.add(p.fisica);
  plats[num] = p;
  num++;
}
anchorx = 0;
anchory = 150;
for (var a = 0; a < 10; a++){
  var p = (new plat('tostadora'));
  p.cambia_pos(anchorx + (a*p.fisica.width), anchory);
  platforms.add(p.fisica);
  plats[num] = p;
  num++;
}
anchorx = 1280-anchoPlat;
anchory = 150;
for (var a = 0; a < 10; a++){
  var p = (new plat('tostadora'));
  p.cambia_pos(anchorx - (a*p.fisica.width), anchory);
  platforms.add(p.fisica);
  plats[num] = p;
  num++;
}
anchorx = 350;
anchory = 375;
for (var a = 1; a < 11; a++){
  var p = (new plat('tostadora'));
  p.cambia_pos(anchorx + (a*p.fisica.width), anchory);
  platforms.add(p.fisica);
  plats[num] = p;
  num++;
}

anchorx = 0;
anchory = 400;
for (var a = 0; a < 5; a++){
  var p = (new plat('tostadora'));
  p.cambia_pos(anchorx + (a*p.fisica.width), anchory);
  platforms.add(p.fisica);
  plats[num] = p;
  num++;
}

anchorx = 1280 - anchoPlat * 5;
anchory = 400;
for (var a = 0; a < 5; a++){
  var p = (new plat('tostadora'));
  p.cambia_pos(anchorx + (a*p.fisica.width), anchory);
  platforms.add(p.fisica);
  plats[num] = p;
  num++;
}

anchorx = 0;
anchory = 550;
for (var a = 0; a < 10; a++){
  var p = (new plat('tostadora'));
  p.cambia_pos(anchorx + (a*p.fisica.width), anchory);
  platforms.add(p.fisica);
  plats[num] = p;
  num++;
}
anchorx = 1280-anchoPlat;
anchory = 550;
for (var a = 0; a < 10; a++){
  var p = (new plat('tostadora'));
  p.cambia_pos(anchorx - (a*p.fisica.width), anchory);
  platforms.add(p.fisica);
  plats[num] = p;
  num++;
}

anchorx = 0;
anchory = 700;
for (var a = -1; a < 26; a++){
  var p = (new plat('tostadora'));
  p.cambia_pos(anchorx + (a*p.fisica.width), anchory);
  platforms.add(p.fisica);
  plats[num] = p;
  num++;
}
}

function enemigos(){
  for (var i = 0; i < 2; i++){
  var enemigo = new tort();
  tortugas[i] = enemigo;
  enemigs.add(enemigo.fisica);
  enemigo.cambia_pos(i * 1200, 0);
  if (i === 0)
  tortugas[i].cambia_dir();
  
  
}
}

//***************************************************************\\

module.exports.game = game;