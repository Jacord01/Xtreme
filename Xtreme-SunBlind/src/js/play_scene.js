'use strict';
var go = require('./class_object');
var mov = require('./class_movibl');
var player = require('./class_player');
var plat = require('./class_platform');
var tort = require('./class_turtle');
var env = require('./class_environment');

var jugador;
var platforms;
var enemies;
var deadZone1; var deadZone2;

var PlayScene = {
  create: function () {
  //Activamos la física del juego
  this.game.physics.startSystem(Phaser.Physics.ARCADE);

  //Imagen de fondo
  this.game.add.sprite(0,0,'fond');

  //Creamos grupo de plataformas
  platforms = this.game.add.physicsGroup();
  var anchorx;
  var anchory;	
  var anchoPlat = 50;
  var largoPlat = 50;
	
  //conjuntos de plataformas
  anchorx = 0; anchory = 0;
  for (var a = -1; a < 26; a++){
  	var p = (new plat(this.game, 0, 0, 'tostadora'));
  	p.cambia_pos(anchorx + (a*p.width), anchory);
  	p.reescala_imagen(0.1, 0.005);
  	platforms.add(p);
  }
  anchorx = 0; anchory = 150;
  for (var a = 0; a < 10; a++){
  	var p = (new plat(this.game, 0, 0, 'tostadora'));
  	p.cambia_pos(anchorx + (a*p.width), anchory);
  	platforms.add(p);
  }
  anchorx = 1280-anchoPlat; anchory = 150;
  for (var a = 0; a < 10; a++){
  	var p = (new plat(this.game, 0, 0, 'tostadora'));
  	p.cambia_pos(anchorx - (a*p.width), anchory);
  	platforms.add(p);
  }
  anchorx = 350; anchory = 375;
  for (var a = 1; a < 11; a++){
  	var p = (new plat(this.game, 0, 0, 'tostadora'));
  	p.cambia_pos(anchorx + (a*p.width), anchory);
  	platforms.add(p);
  }
  anchorx = 0; anchory = 400;
  for (var a = 0; a < 5; a++){
  	var p = (new plat(this.game, 0, 0, 'tostadora'));
  	p.cambia_pos(anchorx + (a*p.width), anchory);
  	platforms.add(p);
  }
  anchorx = 1280 - anchoPlat * 5; anchory = 400;
  for (var a = 0; a < 5; a++){
  	var p = (new plat(this.game, 0, 0, 'tostadora'));
  	p.cambia_pos(anchorx + (a*p.width), anchory);
  	platforms.add(p);
  }
  anchorx = 0; anchory = 550;
  for (var a = 0; a < 10; a++){
  	var p = (new plat(this.game, 0, 0, 'tostadora'));
  	p.cambia_pos(anchorx + (a*p.width), anchory);
  	platforms.add(p);
  }
  anchorx = 1280-anchoPlat; anchory = 550;
  for (var a = 0; a < 10; a++){
  	var p = (new plat(this.game, 0, 0, 'tostadora'));
  	p.cambia_pos(anchorx - (a*p.width), anchory);
  	platforms.add(p);
  }
  anchorx = 0; anchory = 700;
  for (var a = -1; a < 26; a++){
  	var p = (new plat(this.game, 0, 0, 'tostadora'));
  	p.cambia_pos(anchorx + (a*p.width), anchory);
  	platforms.add(p);
  }

  //Creamos al jugador
  jugador = new player(this.game, 200, 640, 'player', 1, 200, 3);

  //Creamos enemigos
  enemies = this.game.add.physicsGroup();
  for (var i = 0; i < 2; i++){
  	var enemigo = new tort(this.game, 0, 0, 'enemigo', 1, 200);
  	enemies.add(enemigo);
  	enemigo.cambia_pos(i * 1200, 0);
  	if (i === 0)
  		enemigo.cambia_dir();
  }

  //Creamos las deadzones
  deadZone1 = new env(this.game, -50, 640, 'fond');
  deadZone1.reescala_imagen(0.05,0.08);
  deadZone1.visible = false;

  deadZone2 = new env(this.game, 1260, 640, 'fond');
  deadZone2.reescala_imagen(0.05,0.08);
  deadZone2.visible = false;
 },

  update: function (){
    //Para que choque el personaje con las plataformas
    this.game.physics.arcade.collide(jugador, platforms, collisionHandlerJug);
    this.game.physics.arcade.collide(enemies, platforms, collisionHandlerPlat);
    this.game.physics.arcade.collide(enemies, jugador, collisionHandlerEnem);
    this.game.physics.arcade.collide(enemies, deadZone1, DeadZone1);
    this.game.physics.arcade.collide(enemies, deadZone2, DeadZone2);
  },

  render: function(){

  }
};

function collisionHandlerEnem (jug, enem){
	if(!enem.stunt){

  	jugador.kill();
  	setTimeout(function(){ jug.reset(640,0); }, 2000);
 	}

  else 
  	enem.kill();
  }

function collisionHandlerJug (jug, plat){
  	if(jugador.body.touching.up === true){
   		plat.cambia_tocada();
   		plat.jump();
  	}
  }

  function collisionHandlerPlat(enem, plat){
  	if(plat.tocada){
  		plat.cambia_tocada();
  		enem.stunt = true;
  		setTimeout(function(){ enem.stunt = false; }, 3000);
  	}
  }

  function DeadZone1(dead, enem){

  	enem.cambia_pos(1200,0);
  }

  function DeadZone2(dead, enem){
  	enem.cambia_pos(0,0);
  }


module.exports = PlayScene;
