'use strict';
//rezando

var game = new Phaser.Game(1280, 720, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

var per = require('./class_protagonista');
var plat = require('./class_plataforma');

function preload() {
    game.stage.backgroundColor = '#1ff';
    game.load.image('player', 'images/original.png');
    game.load.image('tostadora', 'images/tostadora.png');
    game.load.image('fond', 'images/Olaya.png');
}

var jugador;
var temporizador;
var platforms;

function create() { 
//Activamos la física del juego
game.physics.startSystem(Phaser.Physics.ARCADE);

//Temporizador para el juego en general
temporizador = game.time.create(false);

//Creamos grupo de plataformas
platforms = game.add.physicsGroup();
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
anchory = 350;
for (var a = 1; a < 11; a++){
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

//Creamos al jugador
jugador = new per();
/*
//Activamos la física del juego
  game.physics.startSystem(Phaser.Physics.ARCADE);

      //CREAMOS AL JUGADOR

    jugador = new movible();
    jugador.cambia_sprite('player');
    jugador.reescala_imagen(0.2,0.2);
    game.physics.enable(jugador.fisica, Phaser.Physics.ARCADE);
    jugador.fisica.body.gravity.y = 3000;
    jugador.cambia_pos(300,650);

      //Creamos las plataformas

      plataformas = game.add.group();

      for(var i = 0; i < 8; i++){
          plats[i] = new GO(0,0,'tostadora');
          plats[i].reescala_imagen(0.1,0.1);
          game.physics.enable(plats[i].fisica, Phaser.Physics.ARCADE);
          plats[i].fisica.body.immovable = true;
          plataformas.add(plats[i].fisica);
      }

      //Tenemos que colocar ahora cada una de las 7 plataformas en su posición
      plats[0].cambia_pos(0,150);
      plats[0].reescala_imagen(1.1,0.1);

      plats[1].cambia_pos(700,150);
      plats[1].reescala_imagen(1.2,0.1);
      
      plats[2].cambia_pos(390,300);
      plats[2].reescala_imagen(1,0.1);

      plats[3].cambia_pos(0,340);
      plats[3].reescala_imagen(0.5,0.1);

      plats[4].cambia_pos(1030,340);
      plats[4].reescala_imagen(0.5,0.1);

      plats[5].cambia_pos(0,500);
      plats[5].reescala_imagen(1,0.1);

      plats[6].cambia_pos(780,500);
      plats[6].reescala_imagen(1,0.1);

      plats[7].cambia_pos(0,700);
      plats[7].reescala_imagen(2.6,0.1);


      //Creamos enemigos

        enemigos = game.add.group();

        for(var i = 0; i < 2; i++){
          enem[i] = new movible();
          enem[i].cambia_sprite('tostadora');
          enem[i].reescala_imagen(0.1,0.1);
          game.physics.enable(enem[i].fisica, Phaser.Physics.ARCADE);
          enem[i].fisica.body.gravity.y = 2000;
          enemigos.add(enem[i].fisica);
      }     
*/
} 

function update () {
    //Para que choque el personaje con las plataformas
  game.physics.arcade.collide(jugador.fisica, platforms);
  
  jugador.update();

   /* game.physics.arcade.collide(jugador.fisica, plataformas);
    game.physics.arcade.collide(plataformas, enemigos);
    game.physics.arcade.collide(jugador.fisica, enemigos, collisionHandler);
  //Si no hay in put, es que estamos quietos jejeje
     jugador.fisica.body.velocity.x = 0;


     //***INPUTS***\\



       for(var i = 0; i < 2; i++){
        if(enem[i].fisica.body.velocity.x != 0 || enem[i].fisica.body.velocity.y != 0){
          enem[i].cambia_pos(enem[i].fisica.x, enem[i].fisica.y)
          }


      }

        enem[0].actualiza_pos(5, 0);
        enem[1].actualiza_pos(-5,0);
 */
}

function render () {

}


function collisionHandler(){
/*
//Esta parte de aquí mata al jugador y a los enemigos cuando chocan entre si

  jugador.fisica.kill();

  for(var i = 0; i<2; i++)
  enem[i].fisica.kill();

  temporizador.loop(2000, revive, this);
  temporizador.start();
 */ 
}


function revive(){/*
  jugador.fisica.reset(300,650);
  for(var i = 0; i<2; i++)
    enem[i].fisica.reset(0,0);

  enem[0].cambia_pos(0,0);
  enem[1].cambia_pos(1200,0);
  temporizador.stop();*/
}


//****************CLASS OBJETO******************\\
/*
var GO = 
function(entradax, entraday, entradasprite){


  this.posicion = {x: entradax, y: entraday};
  this.sprite = entradasprite;
  this.fisica = game.add.sprite(this.posicion.x,this.posicion.y,this.sprite);
  
}
//Metodo para cambiar la posicion del objeto
GO.prototype.cambia_pos = function(newposx, newposy){
  
       this.fisica.x =  newposx % 1280; 
  if(this.fisica.x <0 )
    this.fisica.x = 1280;
  //this.objeto.x = newposx; 
  this.fisica.y = newposy;
  this.posicion.x =  newposx;
  this.posicion.y = newposy;
 
};

//Metodo para cambiar el sprite del objeto
GO.prototype.cambia_sprite = function (newsprite) {

  //this.objeto = game.remove.sprite(this.posicion.x,this.posicion.y,this.sprite);
  this.sprite = newsprite;
  this.fisica = game.add.sprite(this.posicion.x,this.posicion.y,this.sprite);
};

//Metodo para reescalar la imagen que queramos
GO.prototype.reescala_imagen = function (x, y){

  this.fisica.scale.setTo(x,y);
};
*/

/*//*************CLASS MOVIBLE**************************\\
var movible =  function(){
  GO.call(this, 0,0,'player');
  //this.herencia.cambia_sprite('tostadora');
  this.velocity = {vx: 0, vy: 0};
  this.direction = 0;

}
movible.prototype = Object.create(GO.prototype);
movible.prototype.constructor = movible;

//Metodo para aplicar la velocidad
movible.prototype.actualiza_pos = function(vx, vy){

  this.cambia_pos(this.posicion.x += vx,   this.posicion.y += vy);

};*/

//***************************************************************\\

module.exports.game = game;