'use strict';
var go = require('./class_object');
var mov = require('./class_movibl');
var player = require('./class_player');
var plat = require('./crea_Plataformas');
var enem = require('./crea_Enemigos');
var env = require('./class_environment');
var ener = require('./class_bebidaEnergetica');
var alc = require('./class_alcohol');
var wat = require('./class_water');
var prot = require('./class_batidoDeProteinas');
var fireball = require('./class_fireball');
var greenfireball = require('./class_greenFireBall');
var cols = require('./handleCollisions');
var HUD = require('./HUD');
var coins = require('./crea_Monedas');
var Put = require('./puntuaciones');

var jugador; var nivel;
var platforms; var platformsIni;
var enemies; var numeroEnemigos; var enemigosPorNivel; var enemigosEnPantalla;
var monedas;
var deadZone1; var deadZone2; var deadZones;
var fireballs; var bolaCreada = false; var bolaGreenCreada = false;
var juego;
var perder;
var powerUps; var PUcreado; 
var auxRn;
var agarrador = {};
var agarro;
var course = false; var endCourse = false; var numMonedas = 0; 
var time = 0;
var pausa; var menu; var fullS;
var fondo; var fondocourse;
var datos; var puntuation; var punt;
var pause; var drop; var back;
var style; var letras;

var muerte;
var debug = false;


var PlayScene = {

  create: function () {

  juego = this.game;

  //Activamos la física del juego
  juego.physics.startSystem(Phaser.Physics.ARCADE);
  puntuation = 0;
  punt = 0;

  //Imagen de fondo
  fondo = juego.add.sprite(0,0,'fondo');
  fondo.width = 1280;
  fondo.height = 720;
  fondo.animations.add('run', [0,1,2,3,4,5,6,7,8], 2, true);
  fondo.animations.play('run');

  fondocourse = juego.add.sprite(0,0,'fondocourse');
  fondocourse.width = 1280;
  fondocourse.height = 720;
  fondocourse.animations.add('runcourse', [0,1,2,3,4,5,6], 5, true);
  fondocourse.visible = false;

  //Imagen de perder
  perder = new go(juego, 500,0, 'perder');
  perder.reescala_imagen(0.2,0.2);
  perder.visible = false;


  //Creamos primer PowerUp
  powerUps = juego.add.physicsGroup();
  PUcreado = false;
  //Creamos enemigos
  enem.creaGrupo(juego);
  auxRn = false;
  agarro = false;

  //Creamos monedas
  var numMonedas = 0;
  monedas = coins.creaGrupo(juego);

  //Creamos las deadzones 
  deadZones = juego.add.physicsGroup();
  creaDeadZone();


  //Creamos bolas de fuego
  fireballs = juego.add.physicsGroup();

  //Creamos al jugador
  jugador = new player(juego, 200, 600, 'player', 1, 350 , 3);
  jugador.body.setSize(25, 60, 15,-3);

  //Creamos el hud
  HUD.create(juego);
  cols.create(juego);

  //variables de audio
  muerte = juego.add.audio('death');
  pause = juego.add.audio('pause');
  drop = juego.add.audio('drop');
  back = juego.add.audio('back');

  //Finalmente, creamos el nivel
  nivel = 0; //Para el nivel 1
  nuevoNivel();

  pausa = juego.input.keyboard.addKey(Phaser.Keyboard.P);

  pausa.onDown.add(function () {

    if(juego.paused){juego.paused = false
      HUD.quitaPausa();
      
    };
    pause.play();
  },this);

  menu = juego.input.keyboard.addKey(Phaser.Keyboard.M);

  menu.onDown.add(function () {
    back.play();
    if(juego.paused){
      juego.paused = false;
      HUD.Pausa();        
	PU.eliminado();

      juego.state.start('menu');
    }
  },this);

  juego.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

  fullS = juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  fullS.onDown.add(function () {

    if(juego.paused){

        HUD.fullscreen()}
      
  },this);


	PU.eliminado();

    style = { font: "bold 32px Arial", fill: "#F7FE2E", boundsAlignH: "center", boundsAlignV: "middle"};
    letras = juego.add.text(300, 20, "PUNTUACION:  " + puntos.daPuntos(), style);  	
 },

  update: function (){

    //Para el menú de pausa
    if(pausa.isDown && !juego.paused){
      juego.paused = true;
      HUD.Pausa();
    }
    
    letras.setText("PUNTUACIÓN:  " + puntos.daPuntos());
    //Para que choque el personaje con las plataformas
    juego.physics.arcade.collide(jugador, platforms, cols.collisionHandlerJug);

    if(jugador.orinando){
      juego.physics.arcade.collide(jugador.pis, platforms, cols.collisionHandlerPis);
      juego.physics.arcade.collide(enem.devuelveGrupo(), jugador.pis, cols.collisionHandlerEnemPis);
    }

    if(jugador.revive)
    	juego.physics.arcade.collide(jugador, platformsIni);

    juego.physics.arcade.collide(enem.devuelveGrupo(), platforms, cols.collisionHandlerPlat);

    if(!jugador.agarrado && !jugador.atacando){
        	juego.physics.arcade.overlap(enem.devuelveGrupo(), jugador, cols.collisionHandlerEnem);
    }

    juego.physics.arcade.overlap(fireballs, jugador, cols.collisionHandlerFireBall);

    juego.physics.arcade.overlap(enem.devuelveGrupo(), deadZone1, cols.DeadZone1);
    juego.physics.arcade.overlap(enem.devuelveGrupo(), deadZone2, cols.DeadZone2);
    juego.physics.arcade.overlap(fireballs, deadZones, cols.DeadZoneF);
    juego.physics.arcade.collide(powerUps, platforms);
    juego.physics.arcade.overlap(powerUps, jugador, cols.collisionHandlerPower); 
    juego.physics.arcade.overlap(monedas, jugador, cols.collisionHandlerMonedas);   

    	if(enemigosEnPantalla < enemigosPorNivel && numeroEnemigos > 0 && enemigosEnPantalla != numeroEnemigos){
    		enem.creaEnemigoRandom(juego, nivel, auxRn, jugador);
    		auxRn = !auxRn;
    		enemigosEnPantalla++;
    	}

    	if(numeroEnemigos <= 0 && !course){
    		jugador.kill();
    		nuevoNivel();
    	}

    	if (nivel >= 7 && numeroEnemigos === 2 && !bolaCreada && !course)
    		creaFireballs();
      
    	if (nivel >= 7 && !bolaGreenCreada && numeroEnemigos === 4 && !course)
    		creaGreenFireballs();

    	if (numMonedas <= 0 && course){
    		course = false;
    		jugador.vidas++;
    		HUD.actualizaVida(jugador);
    		endCourse = false;
    	}

      if (time <= 0 && course){
        course = false;
        endCourse = false;
      }

      if (endCourse)
    		course = false;

    	if (!course)
    	{
    		fondocourse.animations.stop(null,true);
    		fondocourse.visible = false;
    		for (var i = 0 ; i < monedas.children.length; i++){
  				monedas.children[i].kill();}
    	}

  },

  render: function(){
  	if(debug){
    juego.debug.body(jugador);
  	juego.debug.text('VIDAS: ' + jugador.vidas, 32, 50);
  	juego.debug.text('ORINA: ' + jugador.orina, 32, 30);
  	juego.debug.text('NUM ENEMIGOS: ' + numeroEnemigos, 32, 70);
  	juego.debug.text('NIVEL: ' + nivel, 232, 30);
  	juego.debug.text('ENEMIGOS EN PANTALLA: ' + enemigosPorNivel, 232, 50);
  	juego.debug.text('INVENCIBLE: ' + jugador.invencible, 232, 70);
  	juego.debug.text('BORRACHO: ' + jugador.borracho, 500, 30);
  	if(nivel % 5 === 0)
  		juego.debug.text('TIME: ' + time, 500, 70);
      juego.debug.text('agarro: ' + agarro, 500, 30);
  }
  }
};

function vuelvePausa(event){

  if(game.paused)
   game.paused = false;
}

var puntos = {}

puntos.suma = function (numero) {
  punt += numero;
}

puntos.daPuntos = function(){

  return punt
}

module.exports.puntos = puntos;

function nuevoNivel(){

  nivel++;
  puntos.suma(10);
  HUD.nivel(nivel);

  enemigosEnPantalla = 0;
  bolaCreada = false;
  bolaGreenCreada = false;
  agarro = false;

  PU.eliminado();
    PU.creaPower();

  if(nivel >= 7)
	 numeroEnemigos = nivel + juego.rnd.integerInRange(0,2);
  else
	numeroEnemigos = nivel;

  jugador.borracho = false;
  HUD.noBorracho();
  jugador.orinando = false;
  jugador.invencible = false;
  jugador.corriendo = false;

	
	//Cada vez que pasamos de nivel, tenemos que eliminar las plataformas y después volver a crearlas, ya que a partir de x nivel
	//tendremos varios tipos de plataformas y hay que cambiarlas	
	if(nivel != 1){
 			 for (var i = 0 ; i < platforms.children.length; i++){
  				platforms.children[i].kill();}

 			 for (var i = 0 ; i < platformsIni.children.length; i++){
  				platformsIni.children[i].kill(); }
}	

  //Creamos grupo de plataformas
  plat.creaPlataforma(juego, nivel);
  platforms = plat.devuelvePlat();
  platformsIni = plat.devuelveIni();


	var porcentaje = juego.rnd.integerInRange(0,100);
	
  if(nivel > 25)
    enemigosPorNivel = 4;
  else if(nivel > 10)
    enemigosPorNivel = 3;
	else if(nivel > 2)
		enemigosPorNivel = 2;
	else
		enemigosPorNivel = 1;


  if(nivel != 1){
	jugador.reset(640,0);
	jugador.revive = true;
	platformsIni.visible = true;
    setTimeout(function(){ platformsIni.visible = false; jugador.revive = false;}, 3000);
}

if (nivel % 5 === 0) //cada 5 niveles pantalla bonus
  {

  	fondocourse.animations.play('runcourse');
  	fondocourse.visible = true;
  	time = 15;
    HUD.muestraTempLevel();
    actualizaCont(time);
  	course = true;
  	endCourse = false;
  	numeroEnemigos = 0;
  	enemigosEnPantalla = 0;
  	numMonedas = 10;
  	monedas = coins.devuelveGrupo(juego, numMonedas);
  }

  else 
    HUD.ocultaTempLevel();
}

agarrador.devuelve= function (){

  return agarro;
}

agarrador.True = function(){

  agarro = true;
}

agarrador.False = function(){

agarro = false;
}

module.exports.agarrador = agarrador;


var enemigos = {}

enemigos.reduceNumero = function () {
  numeroEnemigos--;
}

enemigos.reducePantalla = function(){
  enemigosEnPantalla--;
}

module.exports.enemigos = enemigos;

var perd = {};

perd.Perder = function(){

	puntuation = puntos.daPuntos();

	perder.visible = true; //Texto de perder en visible

    setTimeout(function(){
      var nombre = "abcdefsgufjsl"
      var cont = 0;
      while(nombre.length > 11){
        if(cont <= 3)
    	nombre = prompt("Introduce tu nombre para el ranking: \n (no introduzcas nada si no quieres guardar la puntuación,\nMáximo 12 caracteres <3)");
       else
        nombre = prompt("Introduce tu nombre para el ranking: \n (¡MENOS DE 12 CARACTERES!)");
      cont++;
    } 

    if(nombre != undefined && nombre != null) 
      
    if  (nombre.length != 0){
        
		datos = [nombre, puntuation.toString(), nivel.toString()];
		if(puntuation <= 0)
			alert("¡" + nombre + " tu puntuación es 0!"  +"\n" + "(Mejor vuelve a intentarlo, que queda feo poner un 0)");
    
    	else
   		Put.mandaDatos(datos);} //Mandamos los datos al servidor
        }, 3000);

    setTimeout(function(){ 
      PU.eliminado();
    juego.state.start('menu');
  }, 6000);
}

function actualizaCont(tiempo){

    time = tiempo;
     HUD.tempLevel(tiempo); 
     tiempo--;
     if(time >= 0 && !endCourse) {
      setTimeout(function(){actualizaCont(tiempo);}, 1000);
    }
}

module.exports.perd = perd;

//Este PU sirve para ser llamado desde la clase PowerUp. Creará un nuevo PU aleatorio
var PUcreado;
var PU = {};

PU.creaPower = function() {
			var aleatorio = juego.rnd.integerInRange(0, 3);
    		var po; 
    		if(!PU.devuelve()){
    			PU.creado();
setTimeout(function(){ 
			if(aleatorio === 0){
    		po = new ener(juego,'energetica');
 			
  			}

  			else if(aleatorio === 1){
  			po = new alc(juego, 'alcohol');
  			
  			}

  			else if(aleatorio === 2){
  				po = new wat(juego, 'agua');
  				
  			}

  			else if(aleatorio === 3){
  				po = new prot(juego, 'proteinas');
  				
  			}

        powerUps.add(po);
        drop.play();

	}, 2000);

	
		}
    		
}

PU.creado = function () {
  PUcreado = true;
}

PU.devuelve = function(){

  return PUcreado;
}

PU.eliminado = function(){

	for (var i = 0 ; i < powerUps.length; i++){

      powerUps.children[i].limpia();
      powerUps.children[i].kill();
      powerUps.remove(powerUps.children[i]);
      
    }
  
  PUcreado = false;
}

module.exports.PU = PU;


var estadosJugador = {};

  estadosJugador.jugadorMuerte = function(jug){
        muerte.play();
        jugador.kill();
        jugador.vidas--;
        HUD.actualizaVida(jugador);
        jugador.vel = jugador.origVel;
        jugador.borracho = false;
        jugador.invencible = false;

        if(jugador.vidas > 0)
            setTimeout(function(){ estadosJugador.revive(jug); platformsIni.visible = true; jugador.orina = 0; HUD.cambiaPis(jugador.orina); HUD.noBorracho(); jugador.vel = jugador.origVel;}, 1000);
          else 
            {
              perd.Perder();
            }

  }

   estadosJugador.revive = function(jug, game){
    
    jugador.muerto = true;
    jugador.revive = true;
    jugador.reset(640,0); 
    setTimeout(function(){ jugador.revive = false; platformsIni.visible = false; jugador.muerto = false;}, 2000);

   }

  module.exports.estadosJugador = estadosJugador;

  function creaFireballs (){
  	var x; var y; var r; var time;
  	bolaCreada = true;
  	x = 1210; y = 320;
  	var fb = new fireball (juego, x, y, 'fireball', 1, 400);
  	if (x >= 550)
  		fb.cambia_dir();
  	fireballs.add(fb);

  	x = 20; y = 290;
  	var fb2 = new fireball (juego, x, y, 'fireball', 1, 400);
  	if (x >= 550)
  		fb2.cambia_dir();
  	fireballs.add(fb2);
  }

    function creaGreenFireballs (){
  	var x; var y; var r; var time;
  	bolaGreenCreada = true;
  	x = 1210; y = 450;
  	var fb = new greenfireball (juego, x, y, 'greenfireball', 1, 200, 400);
  	if (x >= 550)
  		fb.cambia_dir();
  	fireballs.add(fb);

  	x = 20; y = 450;
  	var fb2 = new greenfireball (juego, x, y, 'greenfireball', 1, 200, 400);
  	if (x >= 550)
  		fb2.cambia_dir();
  	fireballs.add(fb2);
  }

  function creaDeadZone(){
      //Para los enemigos
  deadZone1 = new env(juego, -50, 640, 'fondo');
  deadZone1.reescala_imagen(0.05,0.08);
  deadZone1.visible = false;

  deadZone2 = new env(juego, 1260, 640, 'fondo');
  deadZone2.reescala_imagen(0.05,0.08);
  deadZone2.visible = false;

  //Para las fireballs
  var deadZone3 = new env(juego, -40, 0, 'fondo');
  deadZone3.reescala_imagen(0.03,1);
  deadZone3.visible = false;
  deadZones.add(deadZone3);

  var deadZone4 = new env(juego, 1260, 0, 'fondo');
  deadZone4.reescala_imagen(0.03,1);
  deadZone4.visible = false;
  deadZones.add(deadZone4);
  }

  var stateMoneda = {};
  stateMoneda.reduceMoneda = function(){
  	numMonedas--;
  }
  module.exports.stateMoneda = stateMoneda;

  function endedCourse(){
  	endCourse=true;
  }

module.exports = PlayScene;
