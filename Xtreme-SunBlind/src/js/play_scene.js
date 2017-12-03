'use strict';
var go = require('./class_object');
var mov = require('./class_movibl');
var player = require('./class_player');
var plat = require('./class_platform');
var tort = require('./class_turtle');
var env = require('./class_environment');
var ener = require('./class_bebidaEnergetica');

var jugador;
var platforms; var platformsIni;
var enemies;
var deadZone1; var deadZone2;
var juego;
var perder;
var powerUps; var PU;


var PlayScene = {
  create: function () {

  	juego = this.game;

  this.game.add.sprite(0,0, 'perder');
  //Activamos la física del juego
  this.game.physics.startSystem(Phaser.Physics.ARCADE);

  //Imagen de fondo
  this.game.add.sprite(0,0,'fond');
  perder = new go(juego, 500,0, 'perder');
  perder.reescala_imagen(0.2,0.2);
  perder.visible = false;

  //Creamos grupo de plataformas
  platforms = this.game.add.physicsGroup();
  platformsIni = this.game.add.physicsGroup();
  powerUps = this.game.add.physicsGroup();


  var anchorx;
  var anchory;	
  var anchoPlat = 500;
  var largoPlat = 50;


  //conjuntos de plataformas
  anchorx = 0; anchory = 0;
  for (var a = -1; a < 26; a++){
  	creaPlat(a, anchorx, anchory, juego, true, false);
  }
  anchorx = 0; anchory = 200;
  for (var a = 0; a < 10; a++){
  	creaPlat(a, anchorx, anchory, juego, false, false);
  }
  anchorx = 1280-anchoPlat; anchory = 200;
  for (var a = 0; a < 10; a++){
  	creaPlat(a, anchorx, anchory, juego, false, false);
  }
  anchorx = 350; anchory = 375;
  for (var a = 1; a < 11; a++){
  	creaPlat(a, anchorx, anchory, juego, false, false);
  }
  anchorx = 0; anchory = 400;
  for (var a = 0; a < 5; a++){
  	creaPlat(a, anchorx, anchory, juego, false, false);
  }
  anchorx = 1280 - 250; anchory = 400;
  for (var a = 0; a < 5; a++){
  	creaPlat(a, anchorx, anchory, juego, false, false);
  }
  anchorx = 0; anchory = 550;
  for (var a = 0; a < 10; a++){
  	creaPlat(a, anchorx, anchory, juego, false, false);
  }
  anchorx = 1280-anchoPlat; anchory = 550;
  for (var a = 0; a < 10; a++){
  	creaPlat(a, anchorx, anchory, juego, false, false);
  }
  anchorx = 0; anchory = 700;
  for (var a = -1; a < 26; a++){
  	creaPlat(a, anchorx, anchory, juego, false, false);
  }

  //Plataformas para cuando muera el jugador
   var anchorx = 535; var anchory = 100;
  	for (var a = 0; a < 4; a++){
  	creaPlat(a, anchorx, anchory, juego, false, true);
  }		
   	platformsIni.visible = false;

  //Creamos al jugador
  jugador = new player(this.game, 200, 600, 'player', 1, 200, 3);
  jugador.animations.add('walk');
  jugador.animations.play('walk', 9, true);

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


	PU = 0; //Número de bebidas en el juego

 },

  update: function (){
    //Para que choque el personaje con las plataformas
    juego.physics.arcade.collide(jugador, platforms, collisionHandlerJug);
    if(jugador.revive)
    	juego.physics.arcade.collide(jugador, platformsIni);
    juego.physics.arcade.collide(enemies, platforms, collisionHandlerPlat);
    juego.physics.arcade.collide(enemies, jugador, collisionHandlerEnem);
    juego.physics.arcade.collide(enemies, deadZone1, DeadZone1);
    juego.physics.arcade.collide(enemies, deadZone2, DeadZone2);
    juego.physics.arcade.collide(powerUps, platforms);
    juego.physics.arcade.collide(powerUps, jugador, collisionHandlerPower);    


    	if(PU === 0){

    		var energetica = new ener(juego,'energetica', 2);
 			powerUps.add(energetica);
  			PU++;
}	

  },

  render: function(){
  	juego.debug.text('VIDAS: ' + jugador.vidas, 32, 50);
  	juego.debug.text('ORINA: ' + jugador.orina, 32, 30);
  	juego.debug.text('VELOCIDAD: ' + jugador.vel, 32, 70);
  }
};

function collisionHandlerPower(jug, pw){

	jug.incrementaOrina(pw.orina);
	pw.efecto(jug);
	pw.kill();
	PU--; 

}

function collisionHandlerEnem (jug, enem){
	if(!enem.stunt){
  	jugador.kill();
  	jugador.vidas--;
  	jugador.vel = jugador.origVel;
  	if(jugador.vidas > 0){
  	setTimeout(function(){ revive(jug); platformsIni.visible = true; jugador.orina = 0;}, 1000);
  	}

  	else perder.visible = true;
  	 	
 	}

  else 
  	enem.kill();
  }

  function revive(jug, game){
  	jugador.muerto = true;
  	jugador.revive = true;
  	jug.reset(640,0); 
  	setTimeout(function(){ jugador.revive = false; platformsIni.visible = false; jugador.muerto = false;}, 2000);

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

  function creaPlat(a, anchorx, anchory, juego, superior, ini){

  	var p = (new plat(juego, 0, 0, 'tostadora'));
  	if(superior)
  		p.reescala_imagen(0.1, 0.001);
  	p.cambia_pos(anchorx + (a*p.width), anchory);
  	if(!ini)
  	platforms.add(p);
  	else
  	platformsIni.add(p);
  }


module.exports = PlayScene;


