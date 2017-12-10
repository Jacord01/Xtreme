'use strict';
var go = require('./class_object');
var mov = require('./class_movibl');
var player = require('./class_player');
var plat = require('./crea_Plataformas');
var tort = require('./class_turtle');
var crab = require('./class_crab');
var fly = require('./class_fly');
var env = require('./class_environment');
var ener = require('./class_bebidaEnergetica');
var alc = require('./class_alcohol');
var wat = require('./class_water');
var prot = require('./class_batidoDeProteinas');
var ag = require('./class_agarrador');
var fireball = require('./class_fireball');

var jugador; var nivel;
var platforms; var platformsIni;
var enemies; var numeroEnemigos; var enemigosPorNivel; var enemigosEnPantalla;
var deadZone1; var deadZone2; var deadZone3; var deadZone4;
var fireballs; var bolaCreada = false;
var juego;
var perder;
var powerUps; 
var auxRn;
var agarrador;

var PlayScene = {

  create: function () {

  juego = this.game;

  //Activamos la física del juego
  juego.physics.startSystem(Phaser.Physics.ARCADE);

  //Imagen de fondo
  var fondo = this.game.add.sprite(0,0,'fond');
  fondo.width = 1280;
  fondo.height = 720;

  //Imagen de perder
  //juego.add.sprite(0,0, 'perder');
  perder = new go(juego, 500,0, 'perder');
  perder.reescala_imagen(0.2,0.2);
  perder.visible = false;

  //Creamos grupo de plataformas
  plat.creaPlataforma(juego);
  platforms = plat.devuelvePlat();
  platformsIni = plat.devuelveIni();

  //Creamos primer PowerUp
  powerUps = this.game.add.physicsGroup();
  PU.creaPower();

  //Creamos enemigos
  enemies = this.game.add.physicsGroup();
  auxRn = false;
  agarrador = false;

  //Creamos las deadzones para los enemigos
  deadZone1 = new env(this.game, -50, 640, 'fond');
  deadZone1.reescala_imagen(0.05,0.08);
  deadZone1.visible = false;

  deadZone2 = new env(this.game, 1260, 640, 'fond');
  deadZone2.reescala_imagen(0.05,0.08);
  deadZone2.visible = false;

  //Creamos las deadzones para las fireballs
  deadZone3 = new env(this.game, -40, 0, 'fond');
  deadZone3.reescala_imagen(0.03,1);
  deadZone3.visible = false;

  deadZone4 = new env(this.game, 1260, 0, 'fond');
  deadZone4.reescala_imagen(0.03,1);
  deadZone4.visible = false;

  //Creamos bolas de fuego
  fireballs = this.game.add.physicsGroup();

  //Creamos al jugador
  jugador = new player(this.game, 200, 600, 'player', 1, 500 , 3);

  //Finalmente, creamos el nivel
  nivel = 0; //Para el nivel 1
  nuevoNivel();
  	
 },

  update: function (){
    //Para que choque el personaje con las plataformas
    juego.physics.arcade.collide(jugador, platforms, collisionHandlerJug);
    if(jugador.revive)
    	juego.physics.arcade.collide(jugador, platformsIni);

    juego.physics.arcade.collide(enemies, platforms, collisionHandlerPlat);

    if(!jugador.agarrado)
    	juego.physics.arcade.overlap(enemies, jugador, collisionHandlerEnem);
    juego.physics.arcade.overlap(fireballs, jugador, collisionHandlerFireBall);
    juego.physics.arcade.overlap(enemies, deadZone1, DeadZone1);
    juego.physics.arcade.overlap(enemies, deadZone2, DeadZone2);
    juego.physics.arcade.overlap(fireballs, deadZone3, DeadZoneF);
    juego.physics.arcade.overlap(fireballs, deadZone4, DeadZoneF);
    juego.physics.arcade.collide(powerUps, platforms);
    juego.physics.arcade.overlap(powerUps, jugador, collisionHandlerPower);    

    	if(enemigosEnPantalla < enemigosPorNivel && numeroEnemigos > 1){
    		creaEnemigoRandom();
    	}

    	if(numeroEnemigos <= 0){
    		jugador.kill();
    		nuevoNivel();
    	}

    	if (numeroEnemigos === enemigosEnPantalla && !bolaCreada)
    		creaFireballs();

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
  enemigosEnPantalla = 0;
  bolaCreada = false;

  if(nivel != 1)
	numeroEnemigos = nivel + juego.rnd.integerInRange(1,5);
  else numeroEnemigos = nivel + 3 + juego.rnd.integerInRange(0,1);

  jugador.borracho = false;
  jugador.invencible = false;
  jugador.corriendo = false;

  //UTILIZAREMOS ESTO MÁS ADELANTE PARA CREAR LAS PLATAFORMAS CADA VEZ QUE PASEMOS DE NIVEL YA QUE HABRÁ ALGUNAS QUE SEA DE DIFERENTE TIPO
  /*platforms.forEach(function(element) {
    element.kill();});*/

	//Sacamos un porcentaje entre 0 y 100. Si el nivel es mayor que 3 (Para hacer los primeros niveles fáciles) y el porcentaje seleccionado antes
	//entra en rango del número del nivel * 5 (progresivamente iremos teniendo más probabilidad de que haya mayor número de enemigos por pantalla),
	//entonces creamos el número base de enemigos con otra probabilidad de que salgan más enemigos, si esto no ocurre, es decir, estamos en los 3
	//primeros niveles, entonces simplemente creamos dos enemigos 

	var porcentaje = juego.rnd.integerInRange(0,100);
	
	if(nivel > 3 && porcentaje < nivel * 5)
		enemigosPorNivel = 2 + (juego.rnd.integerInRange(1, 3));
	else
		enemigosPorNivel = 2;


  if(nivel != 1){
	jugador.reset(640,0);
	jugador.revive = true;
	platformsIni.visible = true;
  setTimeout(function(){ platformsIni.visible = false; jugador.revive = false;}, 3000);
}
	creaEnemigoRandom();
}


//Este PU sirve para ser llamado desde la clase PowerUp. Creará un nuevo PU aleatorio
var PU = {};
PU.creaPower = function() {
			var aleatorio = juego.rnd.integerInRange(0, 3);
    		var po; 
    		
setTimeout(function(){ 
			if(aleatorio === 0){
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
module.exports.PU = PU;


function collisionHandlerPower(jug, pw){

	jug.incrementaOrina(pw.orina);
	pw.efecto(jug);
	pw.limpia();
	pw.kill();
	PU.creaPower(); 

}

function collisionHandlerFireBall(jug, fb){
	if (jugador.invencible){
		fb.kill();
		jugador.invencible = false;
	}

	else{
		jugador.kill();
		jugador.vidas--;
		jugador.vel = jugador.origVel;
		jugador.borracho = false;
  		jugador.invencible = false;
  		if(jugador.vidas > 0)
  			setTimeout(function(){ revive(jug); platformsIni.visible = true; jugador.orina = 0; jugador.vel = jugador.origVel;}, 1000);
  		else 
  			perder.visible = true;
	}

}


function collisionHandlerEnem (jug, enem){

	if(!enem.stunt){
		if(!jugador.invencible){
			if(enem.agarra != undefined)
			{
				enem.agarra(jug);

			}

			else{
  			jugador.kill();
  			jugador.vidas--;
  			jugador.vel = jugador.origVel;
  			jugador.borracho = false;
  			jugador.invencible = false;
  				if(jugador.vidas > 0)
  					setTimeout(function(){ revive(jug); platformsIni.visible = true; jugador.orina = 0; jugador.vel = jugador.origVel;}, 1000);
  				else perder.visible = true;
  			}
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
    if(enem.agarra != undefined)
      agarrador = false;
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
  		if (!enem.golpeado){
  			enem.golpeado = true;
  			enem.cont = enem.cont + 0.25;
  			if (enem.cont > 2) 
  				enem.cont = 2;
  			setTimeout(function(){ enem.golpeado = false;}, 3000);
  		}
  		else {
  			enem.golpeado = false;
  			enem.cont = enem.cont - 0.25;
  			if (enem.cont < 1) 
  				enem.cont = 1;
  		}
  	}
  }

  function DeadZone1(dead, enem){
  	enem.cambia_pos(1200,90);
  }

  function DeadZone2(dead, enem){
  	enem.cambia_pos(0,90);
  }

  function DeadZoneF(dead, fb){
  	fb.kill();
  }

  function creaEnemigoRandom(){

  	//Vamos a esperar x tiempo antes de crear un nuevo enemigo para que no se generen 2 en el mismo punto
  	setTimeout(function(){

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
    var y = 0;
    y = juego.rnd.integerInRange(0, 600);
    if(!auxRn){
      auxRn = true;
    	x = juego.rnd.integerInRange(100,250);
    }
    else {
      auxRn = false;
    	x = juego.rnd.integerInRange(950,1100);
    }

   
    if (nivel <= 4 && aleatorioEnem === 0){
    	var enemigo = new tort(juego, x, 0, 'enemigo', 1, 300);
    }

    else if (aleatorioEnem === 1){
    	var enemigo = new fly(juego, x, 90, 'fly', 1, 200);
    	
    }
    else if (aleatorioEnem === 2){
    	var enemigo = new crab(juego, x, 0, 'crabby', 1, 300);
    }

    else if(nivel > 4 && aleatorioEnem === 0 && !agarrador){
    	var enemigo = new ag (juego, x, y, 'enemigo', jugador);
      agarrador = true;
    }

    else //Para curarnos de espanto, porque hay veces que las otras condiciones no se cumplen
    	var enemigo = new tort(juego, x, 0, 'enemigo', 1, 300);


  	enemies.add(enemigo);
  	

  	if (x >= 950)
  		enemigo.cambia_dir();

  	enemigo.velocidad = nivel * 7 + enemigo.velocidad; //Cada nivel los enemigos irán más rápido
  	

  	 }, 1000); 
  	enemigosEnPantalla++;
  
  }

  function creaFireballs (){
  	var x; var y; var r; var time;
  	bolaCreada = true;
  	x = 1210; y = 330;
  	var fb = new fireball (juego, x, y, 'enemigo', 1, 500);
  	if (x >= 550)
  		fb.cambia_dir();
  	fireballs.add(fb);

  	x = 20; y = 300;
  	var fb2 = new fireball (juego, x, y, 'enemigo', 1, 500);
  	if (x >= 550)
  		fb2.cambia_dir();
  	fireballs.add(fb2);
  }


module.exports = PlayScene;


