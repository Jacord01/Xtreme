'use strict';
var go = require('./class_object');
var mov = require('./class_movibl');
var player = require('./class_player');
var plat = require('./class_platform');
var tort = require('./class_turtle');
var crab = require('./class_crab');
var fly = require('./class_fly');
var env = require('./class_environment');
var ener = require('./class_bebidaEnergetica');
var alc = require('./class_alcohol');
var wat = require('./class_water');
var prot = require('./class_batidoDeProteinas');

var jugador; var nivel;
var platforms; var platformsIni;
var enemies; var numeroEnemigos; var enemigosPorNivel; var enemigosEnPantalla;
var deadZone1; var deadZone2;
var juego;
var perder;
var powerUps; var PoEliminado;


var PlayScene = {
  create: function () {

  	juego = this.game;

  	nivel = 1;
  	//Para el nivel 1
  	numeroEnemigos = nivel + 3 + juego.rnd.integerInRange(0,2);
  	enemigosPorNivel = 2;
  	enemigosEnPantalla = 0;

  this.game.add.sprite(0,0, 'perder');
  //Activamos la física del juego
  this.game.physics.startSystem(Phaser.Physics.ARCADE);

  //Imagen de fondo
  var fondo = this.game.add.sprite(0,0,'fond');
  fondo.width = 1280;
  fondo.height = 720;
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
  for (var a = 0; a < 8; a++){
  	creaPlat(a, anchorx, anchory, juego, false, false);
  }
  anchorx = 1280-anchoPlat; anchory = 200;
  for (var a = 0; a < 8; a++){
  	creaPlat(a, anchorx, anchory, juego, false, false);
  }
  anchorx = 350; anchory = 375;
  for (var a = 1; a < 8; a++){
  	creaPlat(a, anchorx, anchory, juego, false, false);
  }
  anchorx = 0; anchory = 400;
  for (var a = 0; a < 4; a++){
  	creaPlat(a, anchorx, anchory, juego, false, false);
  }
  anchorx = 1280 - 250; anchory = 400;
  for (var a = 0; a < 4; a++){
  	creaPlat(a, anchorx, anchory, juego, false, false);
  }
  anchorx = 0; anchory = 550;
  for (var a = 0; a < 8; a++){
  	creaPlat(a, anchorx, anchory, juego, false, false);
  }
  anchorx = 1280-anchoPlat; anchory = 550;
  for (var a = 0; a < 8; a++){
  	creaPlat(a, anchorx, anchory, juego, false, false);
  }
  anchorx = 0; anchory = 700;
  for (var a = -1; a < 26; a++){
  	creaPlat(a, anchorx, anchory, juego, false, false);
  }

  //Plataformas para cuando muera el jugador
   var anchorx = 510; var anchory = 100;
  	for (var a = 0; a < 4; a++){
  	creaPlat(a, anchorx, anchory, juego, false, true);
  }		
   	platformsIni.visible = false;

  //Creamos al jugador
  jugador = new player(this.game, 200, 600, 'player', 1, 500 , 3);

  //Creamos enemigos
  enemies = this.game.add.physicsGroup();
  //Hay que crear dos enemigos primero por nivel

  creaEnemigoRandom();
  creaEnemigoRandom();
    	

  //Creamos las deadzones
  deadZone1 = new env(this.game, -50, 640, 'fond');
  deadZone1.reescala_imagen(0.05,0.08);
  deadZone1.visible = false;

  deadZone2 = new env(this.game, 1260, 640, 'fond');
  deadZone2.reescala_imagen(0.05,0.08);
  deadZone2.visible = false;

  PoEliminado = false;

  Modulo.creaPower();

 },

  update: function (){
    //Para que choque el personaje con las plataformas
    juego.physics.arcade.collide(jugador, platforms, collisionHandlerJug);
    if(jugador.revive)
    	juego.physics.arcade.collide(jugador, platformsIni);

    juego.physics.arcade.collide(enemies, platforms, collisionHandlerPlat);
    juego.physics.arcade.overlap(enemies, jugador, collisionHandlerEnem);
    juego.physics.arcade.overlap(enemies, deadZone1, DeadZone1);
    juego.physics.arcade.overlap(enemies, deadZone2, DeadZone2);
    juego.physics.arcade.collide(powerUps, platforms);
    juego.physics.arcade.overlap(powerUps, jugador, collisionHandlerPower);    

    	if(enemigosEnPantalla < enemigosPorNivel && numeroEnemigos > 1){
    		creaEnemigoRandom();
    	}

    	if(numeroEnemigos <= 0){
    		jugador.kill();
    		nuevoNivel();
    	}

  },

  render: function(){
  	juego.debug.text('VIDAS: ' + jugador.vidas, 32, 50);
  	juego.debug.text('ORINA: ' + jugador.orina, 32, 30);
  	juego.debug.text('NUM ENEMIGOS: ' + numeroEnemigos, 32, 90);
  	juego.debug.text('NIVEL: ' + nivel, 232, 30);
  	juego.debug.text('ENEMIGOS EN PANTALLA: ' + enemigosPorNivel, 232, 50);
  	juego.debug.text('INVENCIBLE: ' + jugador.invencible, 232, 90);
  	juego.debug.text('BORRACHO: ' + jugador.borracho, 500, 30);
  }
};

function nuevoNivel(){
	nivel++;
	numeroEnemigos = nivel + 3 + juego.rnd.integerInRange(1,2);

	//Sacamos un porcentaje entre 0 y 100. Si el nivel es mayor que 3 (Para hacer los primeros niveles fáciles) y el porcentaje seleccionado antes
	//entra en rango del número del nivel * 5 (progresivamente iremos teniendo más probabilidad de que haya mayor número de enemigos por pantalla),
	//entonces creamos el número base de enemigos con otra probabilidad de que salgan más enemigos, si esto no ocurre, es decir, estamos en los 3
	//primeros niveles, entonces simplemente creamos dos enemigos 

	var porcentaje = juego.rnd.integerInRange(0,100);
	
	if(nivel > 3 && porcentaje < nivel * 5)
		enemigosPorNivel = 2 + (juego.rnd.integerInRange(1, 3));
	else
		enemigosPorNivel = 2;

	jugador.reset(640,0);
	jugador.revive = true;
	platformsIni.visible = true;

	creaEnemigoRandom();
	creaEnemigoRandom();
	
	setTimeout(function(){ platformsIni.visible = false; jugador.revive = false;}, 3000);
}


var Modulo = {};
Modulo.creaPower = function() {
			var aleatorio = juego.rnd.integerInRange(0, 3);
    		var po; 
    		
setTimeout(function(){ if(aleatorio === 0){
    		po = new ener(juego,'energetica');
 			powerUps.add(po);
  			}

  			else if(aleatorio === 1){
  			po = new alc(juego, 'alcohol');
  			powerUps.add(po);
  			}

  			else if(aleatorio === 2){
  				po = new wat(juego, 'agua');
  				powerUps.add(po);
  			}

  			else if(aleatorio === 3){
  				po = new prot(juego, 'proteinas');
  				powerUps.add(po);
  			}
	}, 2000);
    		
}
module.exports.Modulo = Modulo;


function collisionHandlerPower(jug, pw){

	jug.incrementaOrina(pw.orina);
	pw.efecto(jug);
	pw.limpia();
	pw.kill();
	Modulo.creaPower(); 

}

function collisionHandlerEnem (jug, enem){

	if(!enem.stunt){
		if(!jugador.invencible){
  			jugador.kill();
  			jugador.vidas--;
  			jugador.vel = jugador.origVel;
  			jugador.borracho = false;
  			jugador.invencible = false;
  				if(jugador.vidas > 0)
  					setTimeout(function(){ revive(jug); platformsIni.visible = true; jugador.orina = 0; jugador.vel = jugador.origVel;}, 1000);
  				else perder.visible = true;
  			}
  			else if (jugador.invencible) {
  				enem.kill();
  				enemigosEnPantalla--;
  				numeroEnemigos--;
  				jugador.invencible = false;
  			}

}
  else {
  	enem.kill();
  	enemigosEnPantalla--;
  	numeroEnemigos--;
  }
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
  		enem.golpeado = true;
  		setTimeout(function(){ enem.golpeado = false; }, 3000);
  	}
  }

  function DeadZone1(dead, enem){
  	enem.cambia_pos(1200,0);
  }

  function DeadZone2(dead, enem){
  	enem.cambia_pos(0,0);
  }

  function creaPlat(a, anchorx, anchory, juego, superior, ini){
  	var sprite = 'plat2';
  	var p = (new plat(juego, 0, 0, sprite));
  	if(superior)
  		p.reescala_imagen(1, 0.1);
  	p.cambia_pos(anchorx + (a*p.width), anchory);
  	if(!ini)
  	platforms.add(p);
  	else
  	platformsIni.add(p);
  }

  function creaEnemigoRandom(){

  	//Vamos a esperar x tiempo antes de crear un nuevo enemigo para que no se generen 2 en el mismo punto
  	setTimeout(function(){	var aleatorio = juego.rnd.integerInRange(0,2);

  		var p = 0;
  	if(nivel <= 2)
  		aleatorioEnem = 0;
  	else
  		if(nivel == 3)
  			p = 1;
  		else if(nivel > 3)
  			p = 2;

  		var aleatorioEnem = juego.rnd.integerInRange(0,p);
  		
    var x = 0;
    if(aleatorio == 0)
    	x = juego.rnd.integerInRange(100,250);
    else 
    	x = juego.rnd.integerInRange(950,1100);

   
    if (aleatorioEnem === 0)
    	var enemigo = new tort(juego, 0, 0, 'enemigo', 1, 300);

    else if (aleatorioEnem === 1){
    	var enemigo = new fly(juego, 0, 0, 'fly', 1, 200);
    	
    }
    else if (aleatorioEnem === 2){
    	var enemigo = new crab(juego, 0, 0, 'crabby', 1, 300);
    }


  	enemies.add(enemigo);
  	enemigo.cambia_pos(x, 0);

  	if (x >= 1000)
  		enemigo.cambia_dir();

  	enemigo.velocidad = nivel * 7 + enemigo.velocidad; //Cada nivel los enemigos irán más rápido
  	

  	 }, 1000); 
  	enemigosEnPantalla++;
  
  }


module.exports = PlayScene;


