(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var HUD = {};
var vida1; var vida2; var vida3;
var punct1; var punct2; var nivel;
var pisDentro; var pisFuera; var medPis; var fondoRet;
var ebrio;
var Temp1; var Temp2; 
var AG; 
var PA;
var juego;
var fullscreen;
var vidaExtra;
var vidas = [];

HUD.create = function(game){

	juego = game;

 	//VidasPlayer (el jugador siempre comienza con 3 vidas)
 	//Hacemos 2 bucles para colocar las vidas del jugador en la posición que deben tener
 	//Como máximo el jugador podrá tener 8 vidas
	for(var i = 0; i < 4; i++){
			vidas[i] = game.add.sprite(10 + 64 * i , 10,'vidas');
		}

		vidas[3].visible = false; //Recordamos que solo tienes 3 vidas al comenzar, por lo que ocultamos la cuarta

	for(var i = 0; i < 4; i++){

		vidas[i + 4] = game.add.sprite(10 + 64 * i , 70,'vidas');
		vidas[i + 4].visible = false;
		}	


	//Nivel

	//Letras "Nivel"
 	nivel = game.add.sprite(300,100, 'nivel');
 	nivel.width = 100;
 	nivel.height = 50;

 	//Número izda
	punct1 = game.add.sprite(400, 80, 'numeros');
 	punct1.width = 50;
 	punct1.height = 80;

 	//Número dcha
 	punct2 = game.add.sprite(450,80, 'numeros');
 	punct2.width = 50;
 	punct2.height = 80;

 	//Temporizador para los niveles extra

 	//Número izquierda
 	Temp1 = game.add.sprite(300, 80, 'numeros');
 	Temp1.width = 50;
 	Temp1.height = 80;
 	Temp1.visible = false;
 	Temp1.x = 600; Temp1.y = 20;

 	//Número derecha
 	Temp2 = game.add.sprite(350,80, 'numeros');
 	Temp2.width = 50;
 	Temp2.height = 80;
 	Temp2.visible = false;
	Temp2.x = 645; Temp2.y = 20;


 	//Medidor de Pis
 	//Para el retrete
 	fondoRet = game.add.sprite(870, 25, 'fondoRetrete');
 	fondoRet.height = 60;
 	fondoRet.width = 400;

 	//Barra de pis interior
 	pisDentro = game.add.sprite(950,50, 'interiorPis');
 	pisDentro.height = 10;
 	pisDentro.width = 0;

 	//Barra de pis exterior
 	pisFuera = game.add.sprite(950,50, 'exteriorPis');
 	pisFuera.height = 10;
 	pisFuera.width = 300; 	

 	//medidor de pis del retrete
 	medPis = game.add.sprite(890,20, 'medPis');
 	medPis.width = 50;
 	medPis.height = 50;
 	medPis.animations.add('maximo', [10,11]);
 	medPis.frame = 0;

 	//Jugador ebrio
 	 ebrio = game.add.sprite(0 ,0,'borracho');
 	 ebrio.visible = false;
 	 ebrio.animations.add('drunk', [0,1,2,3], 6, true);
 	 ebrio.play('drunk');

 	 //Medidor de agarre
 	 AG = game.add.sprite(950, 100, 'barraAgarrador');
 	 AG.height = 20;
 	 AG.width = 0;
 	 AG.visible = false;

 	 //Para nivel extra
 	vidaExtra = game.add.sprite(350,400, 'vidaExtra');
 	vidaExtra.width = 1000;
 	vidaExtra.height = 500;
 	vidaExtra.visible = false;

 	 //Pausa
 	 PA = game.add.sprite(0,0, 'Pausa');
 	 PA.visible = false;

}

HUD.actualizaVida = function(jug){

	//Hacemos visibles las vidas que tenga el jugador
	for(var i = 0; i < jug.vidas; i++){
		vidas[i].visible = true;
	}
	//Y hacemos invisibles las que haya perdido
	for(var j = jug.vidas; j < 8; j++){
		vidas[i].visible = false;
	}
}

HUD.nivel = function(lvl){

	//Hacemos visibles los números
  punct1.visible = true; punct2.visible = true; nivel.visible = true;

  	//Cálculo para los dos números de nivel
  punct1.frame = Math.floor(lvl / 10);
  punct2.frame = lvl % 10;

	//Ocultamos los números y las letras de nivel
  setTimeout(function(){punct1.visible = false; punct2.visible = false; nivel.visible = false;}, 3000);
}

HUD.tempLevel = function(temp){

	//Para los números del temporizador igual que para los de nivel
 Temp1.frame = Math.floor(temp / 10);
 Temp2.frame = temp % 10;

}

HUD.ocultaTempLevel = function(){

	//Ocultamos el temporizador
 Temp1.visible = false; Temp2.visible = false;

}

HUD.muestraTempLevel = function(){

	//Mostramos el temporizador
	Temp1.visible = true; Temp2.visible = true;
}

HUD.cambiaPis = function(pis){

	 	pisDentro.width = pis * 30;
	 	
	 	//Para la animación del retrete, si el pis está a 0 la paramos y ponemos el medidor a cero
	 	if(pis === 0){
	 		medPis.animations.stop(null, true);
	 		medPis.frame = 0;
	 	}
	 	//Si está a 10, reproducimos la animación
	 	else if(pis >= 10){
	 		medPis.animations.play('maximo', 2, true);
	 		
	 	}
	 	//Sino, actualizamos el retrete
	 	else {	
	 		medPis.frame = pis - 1;
	 	}
	 	
}

HUD.borracho = function(){

	 ebrio.visible = true;
}

HUD.noBorracho = function(){

	ebrio.visible = false;
}

HUD.cambiaGrabber = function(llega){
	//Método para cambiar la barra del grabber
	AG.width = llega * 1.5;

}

HUD.GrabberVisible = function(x,y){

	AG.visible = true;
	AG.x = x - 20;
	AG.y = y + 70;
}

HUD.GrabberInvisible = function(){

	AG.visible = false;
}

HUD.Pausa = function(){

juego.world.bringToTop(PA); //Para que se vea por delante de todo el menú de pausa
PA.visible = true;

}

HUD.quitaPausa = function(){

	PA.visible = false;
}

HUD.fullscreen = function(){
	//Método para poner el juego en modo pantalla completa

    if (juego.scale.isFullScreen)
    {
        juego.scale.stopFullScreen();
    }
    else
    {
        juego.scale.startFullScreen(false);
    }
}

HUD.cambiaExtra = function(){

	//Cuando ganas una vida en los niveles extra, aparece un mensaje que te lo dice
	vidaExtra.visible = !vidaExtra.visible;
}

module.exports = HUD;
},{}],2:[function(require,module,exports){
'use strict';

var PlayScene = require('./play_scene.js');

var buttonJuego;  var juego; var video; var timer;
var click;

var Tutorial = {

  create: function () {
    juego = this.game;

    click = juego.add.audio('click');

    juego.state.add('play', PlayScene); 

    //Aquí insertamos el vídeo de cómo jugar
   
    //Primero el fondo
    juego.add.sprite(0,0, 'fVideo');
    var aux = juego.add.sprite(100,0, 'aux');
    aux.width = 1100;
    aux.height = 615;

    //Después el vídeo
    video = juego.add.video('tuto');
    video.play(false);
    video.addToWorld(650, 300, 0.5, 0.5, 0.8, 0.8);

    //Temporizador para cuando termine el vídeo ir directamente al estado del juego
    timer = setTimeout(function(){video.currentTime = 0;
	video.stop(); juego.state.start('play');}, 51000);

    //Boton que nos lleva al juego
    buttonJuego = juego.add.button(juego.world.centerX + 400, 600, 'omitir', actionOnClickJuego, this, 2,1,0);
    buttonJuego.animations.add('omitir');
    buttonJuego.animations.play('omitir', 4, true );
    buttonJuego.width = 150;
    buttonJuego.height = 60;

 },
};


function actionOnClickJuego () {
    //Ponemos el vídeo a 0 por si el jugador sale al menú principal y vuelve a entrar al juego
    //Paramos el temporizador que controla cuando se ha terminado el vídeo tutorial para empezar 
    // el juego automáticamente
    //Iniciamos el estado Juego
	click.play();
	video.currentTime = 0;
	video.stop();
    clearTimeout(timer);
    juego.state.start('play');
}

module.exports = Tutorial; 


},{"./play_scene.js":28}],3:[function(require,module,exports){
"use strict";

var enemy = require('./class_enemy');
var escena = require('./play_scene');
var HUD = require('./HUD');

var agarrador =  function(game, entradax, entraday, entradasprite, jugador, grabber){
  enemy.call(this, game, entradax, entraday, entradasprite, 1, 1, grabber, 1);

  this.agarrando = false;
  this.medAgarro = 50;
  this.jug = jugador;
  this.juego = game;
  this.espacio = this.juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  this.reescala_imagen(1.5,1.5);
  this.aleatorio = 0;
  this.animations.add('mueve',[0,1,2,3,4,5,6,7], 3, true);
  this.animations.add('stuned', [8,9,10,11,12,13,14,15], 3, true);
  this.animations.play('mueve');

}

agarrador.prototype = Object.create(enemy.prototype);
agarrador.prototype.constructor = agarrador;


agarrador.prototype.update = function(){
	//En el update el agarrador comprobará si está golpead, para estar de un color o de otro
	if (this.golpeado){
		this.stunt = true;
		this.animations.play('stuned');
		}
	
	else{
	this.stunt = false;
	this.animations.play('mueve');
	}

	//En el update registramos el input del espacio por si el jugador está agarrado e incrementamos el medidor de agarre.
	if(this.jug.agarrado === true && this.espacio.isDown && this.espacio.downDuration(50)){
		this.medAgarro += 10 / 4;
		HUD.cambiaGrabber(this.medAgarro);

	}

	//Si el medidor es mayor o igual a 100, agarrador soltará al jugador, si no, lo matará.
	if(this.medAgarro >= 100){
		this.aleatorio = this.juego.rnd.integerInRange(0,1);
		if(this.aleatorio === 0)
			this.aleatorio = -1;

		this.jug.cambia_pos(this.x + 200 * this.aleatorio, this.y);
		this.jug.agarrado = false;
		this.agarrando = false;
		this.medAgarro = 50;
		HUD.GrabberInvisible();
	}

	else if (this.medAgarro < 0 && this.jug.agarrado === true){
		this.jug.agarrado = false;
		this.agarrando = false;
		this.medAgarro = 50;
		HUD.GrabberInvisible();
		escena.estadosJugador.jugadorMuerte();
	}	
}

agarrador.prototype.agarra = function(jug){
	//Cuando el jugador es agarrado, llamamos a este método para que se muestre la barra de agarre
	var ag = this; 
	ag.medAgarro = 50;
	ag.agarrando = true;
	jug.agarrado = true;
	HUD.GrabberVisible(this.x, this.y);
	
	agarrador.prototype.cambiaAgarre(ag, jug);
}

agarrador.prototype.cambiaAgarre = function(ag, jug){

	//En este otro método, la barra de agarre se irá decrementando tras un tiempo (350 en este caso)
	HUD.cambiaGrabber(ag.medAgarro);
	ag.medAgarro -= 10;
	if(ag.jug.agarrado)
		setTimeout(function(){agarrador.prototype.cambiaAgarre(ag, jug);}, 350);

}

module.exports = agarrador;
},{"./HUD":1,"./class_enemy":8,"./play_scene":28}],4:[function(require,module,exports){
var PU = require('./class_powerUp');
var HUD = require('./HUD');	
var sound;

var alcohol = function(game, entradasprite){
	sound = game.add.audio('beer');
	this.orina = 5;
	PU.call(this, game, entradasprite, this.orina);
	this.reescala_imagen(0.9,0.9);	
}

alcohol.prototype = Object.create(PU.prototype);
alcohol.prototype.constructor = alcohol;

alcohol.prototype.efecto = function(jug){
	sound.play();
	jug.borracho = true;
	HUD.borracho();
	setTimeout(function(){jug.borracho = false; HUD.noBorracho();}, 5000);
}

module.exports = alcohol;
},{"./HUD":1,"./class_powerUp":17}],5:[function(require,module,exports){
var PU = require('./class_powerUp');	
var sound;

var batidoDeProteinas = function(game, entradasprite){
	sound = game.add.audio('prot');
	this.orina = 3;
	PU.call(this, game, entradasprite, this.orina);
	this.reescala_imagen(0.9,0.9);	
}

batidoDeProteinas.prototype = Object.create(PU.prototype);
batidoDeProteinas.prototype.constructor = batidoDeProteinas;

batidoDeProteinas.prototype.efecto = function(jug){
	sound.play();
	jug.invencible = true;
	jug.borracho = false;
	setTimeout(function(){jug.invencible = false}, 5000);

}

module.exports = batidoDeProteinas;
},{"./class_powerUp":17}],6:[function(require,module,exports){
var PU = require('./class_powerUp');	
var sound;

var bebidaEnergetica = function(game, entradasprite){
	sound = game.add.audio('energ');
	this.orina = 3;
	PU.call(this, game, entradasprite, this.orina);
	this.reescala_imagen(0.9,0.9);
	
}

bebidaEnergetica.prototype = Object.create(PU.prototype);
bebidaEnergetica.prototype.constructor = bebidaEnergetica;

bebidaEnergetica.prototype.efecto = function(jug){
	sound.play();
	jug.corriendo = true;
	setTimeout(function(){jug.corriendo = false}, 5000);

}

module.exports = bebidaEnergetica;
},{"./class_powerUp":17}],7:[function(require,module,exports){
"use strict";

var enemy = require('./class_enemy');

var crab =  function(game, entradax, entraday, entradasprite, dir, velx, grabber){
  enemy.call(this, game, entradax, entraday, entradasprite, dir, velx, grabber, 6);
  this.enfado = false;
  this.origVel = velx;
  this.reescala_imagen(1.2,1.2);
  this.animations.add('mueve',[0,1], 5, true);
  this.animations.add('enfado',[2,3]);
  this.animations.play('mueve');
}
crab.prototype = Object.create(enemy.prototype);
crab.prototype.constructor = crab;

crab.prototype.update = function(){
	//Si el enemigo no está enfadado y es golpeado, pasará a estar enfadado. Al siguiente toque, se pondrá estuneado
	if (this.golpeado && !this.enfado){
		this.enfado = true;
		this.golpeado = false;
	}
	else if (this.golpeado && this.enfado){
		this.stunt = true;
	}
	else{
		this.stunt = false;
	}

	if (this.enfado && !this.stunt){
		this.actualiza_pos(this.velocidad * 1.25 * this.cont);
		this.animations.play('enfado', 5, true);
	}
	else if (!this.enfado && !this.stunt){
		this.actualiza_pos(this.velocidad * this.cont);
		this.animations.play('mueve');
	}
	else
		this.actualiza_pos(0);

	if( this.body.velocity.x != 0 ||  this.body.velocity.y != 0){
         this.cambia_pos(this.x, this.y);
    }
	this.velocidad = this.origVel;
}


module.exports = crab;
},{"./class_enemy":8}],8:[function(require,module,exports){
'use strict';

var movible = require('./class_movibl');	

var enemigo = function(game, entradax, entraday, entradasprite, dir, velx, grabber, puntos){
	movible.call(this, game, entradax, entraday, entradasprite, dir, velx);
	this.juego = game;
	this.create();
	this.velocidad = velx;
	this.stunt = false;
	this.golpeado = false;
	this.cont = 1;
	this.grabber = grabber;
	this.puntos = puntos;
}

enemigo.prototype = Object.create(movible.prototype);
enemigo.prototype.constructor = enemigo;

enemigo.prototype.create = function (){
	this.juego.physics.arcade.enable(this);
 	this.body.gravity.y = 4000;
}

//Devolvemos los puntos que da cada enemigo por ser eliminado
enemigo.prototype.devuelvePuntos = function(){

	return this.puntos;
}
module.exports = enemigo;


},{"./class_movibl":13}],9:[function(require,module,exports){
//clase para los elementos del entorno (Plataformas sobre todo)

"use strict"; 
var GO = require('./class_object');

var entorno =  function(game, entradax, entraday, entradasprite){
  GO.call(this, game, entradax, entraday, entradasprite);
  game.physics.arcade.enable(this);
  this.body.immovable = true;
}
entorno.prototype = Object.create(GO.prototype);
entorno.prototype.constructor = entorno;

module.exports = entorno;
},{"./class_object":14}],10:[function(require,module,exports){
'use strict';

var movible = require('./class_movibl');	

var fireball = function(game, entradax, entraday, entradasprite, dir, velx){
	movible.call(this, game, entradax, entraday, entradasprite, dir, velx);
	this.juego = game;
	this.sale = false;
	this.escala = 1.1;
	this.create();
}

fireball.prototype = Object.create(movible.prototype);
fireball.prototype.constructor = fireball;

fireball.prototype.create = function (){
	this.juego.physics.arcade.enable(this);
 	this.body.gravity.y = 0;
 	this.reescala_imagen(this.escala, this.escala);
 	var bola = this;
  	setTimeout(function(){bola.sale = true;}, 250);
  	this.animations.add('mueve',[0,1], 5, true);
	this.animations.play('mueve');
}

fireball.prototype.update = function (){
	if (this.sale){
		this.actualiza_pos(this.velocidad);
	}
}

module.exports = fireball;
},{"./class_movibl":13}],11:[function(require,module,exports){
"use strict";

var enemigo = require('./class_enemy');

var fly =  function(game, entradax, entraday, entradasprite, dir, velx, grabber){
  enemigo.call(this, game, entradax, entraday, entradasprite, dir, velx, grabber,5);
  this.body.gravity.y = 1000;
  this.reescala_imagen(0.9,0.9);
  this.animations.add('mueve',[0,1,2,3, 4, 5], 5, true);
  this.animations.play('mueve');
}
fly.prototype = Object.create(enemigo.prototype);
fly.prototype.constructor = fly;

fly.prototype.update = function (){
if (this.golpeado){
	this.stunt = true;
}
else
	this.stunt = false;

if(!this.stunt){
	this.actualiza_pos(this.velocidad * (this.cont));
	if (this.body.onFloor() || this.body.touching.down){
		this.body.velocity.y = -250;
	}
}
else 
	this.actualiza_pos(0);
	if( this.body.velocity.x != 0 ||  this.body.velocity.y != 0){
         this.cambia_pos(this.x, this.y);
       }
}

module.exports = fly;
},{"./class_enemy":8}],12:[function(require,module,exports){
'use strict';

var fireball = require('./class_fireball');	

var greenfireball = function(game, entradax, entraday, entradasprite, dir, velx, vely){
	fireball.call(this, game, entradax, entraday, entradasprite, dir, velx);
	this.juego = game;
	this.velocidadY = vely;
	this.cont = 0;
	this.animations.add('mueve',[0,1,2,3,4,5], 7, true);
	this.animations.play('mueve');
}

greenfireball.prototype = Object.create(fireball.prototype);
greenfireball.prototype.constructor = greenfireball;

greenfireball.prototype.update = function (){
	if (this.sale){
		this.actualiza_pos(this.velocidad);
		this.y += ((Math.sin (this.cont))*6);
		this.cont += 0.25;
	}
}

module.exports = greenfireball;
},{"./class_fireball":10}],13:[function(require,module,exports){
//Scripta para objetos movibles

"use strict";

var GO = require('./class_object');

var movibl = function(game, entradax, entraday, entradasprite, dir, velx){
  GO.call(this, game, entradax, entraday, entradasprite);
  this.direction = dir;
  this.velocidad = velx;
  game.physics.arcade.enable(this);
}

movibl.prototype = Object.create(GO.prototype);
movibl.prototype.constructor = movibl;

movibl.prototype.actualiza_pos = function(vl){
  this.body.velocity.x = vl * this.direction;
};

movibl.prototype.cambia_dir = function(){
	///Al cambiar la direccion, tenemos que cambiar también la escala del personaje para que vaya
	//hacia el otro lado
	this.direction = this.direction * (-1);
	this.scale.x = this.scale.x * this.direction;
}

module.exports = movibl;
},{"./class_object":14}],14:[function(require,module,exports){
//Script general para todos los objetos, que contendrán una posición y un sprite

"use strict"; //Correción en modo estricto

var GO = function(game, entradax, entraday, entradasprite){
  Phaser.Sprite.call(this, game, entradax, entraday, entradasprite);
  game.add.existing(this);
}

GO.prototype = Object.create(Phaser.Sprite.prototype);
GO.prototype.constructor = GO;

GO.prototype.cambia_pos = function(newposx, newposy){
  this.x =  newposx % 1280; 
  if(this.x <0 )
    this.x = 1280; 
  this.y =  newposy % 720; 
  if(this.y <0)
    this.y = 720; 
};

//Método para reescalar cualquier sprite
GO.prototype.reescala_imagen = function (x, y){
  this.scale.setTo(x,y);
};

module.exports = GO;
},{}],15:[function(require,module,exports){
'use strict';

var entorno = require('./class_environment');



var plataforma = function(game, entradax, entraday, entradasprite, fuego, hielo){
	entorno.call(this, game, entradax, entraday, entradasprite);
	this.reescala_imagen(1, 0.3);
	this.tocada = false;
	this.arriba = false;
	this.iniPointY = entraday;
	this.temporizador = this.game.time.create(false);
	this.create();
	this.tipo;
	this.fuego = fuego;
	this.hielo = hielo;
	
}

plataforma.prototype = Object.create(entorno.prototype);
plataforma.prototype.constructor = plataforma;

plataforma.prototype.create = function (){
    this.animations.add('plat');
  	this.animations.play('plat', 4, true );

}

plataforma.prototype.cambia_tocada = function (){
	this.tocada = !this.tocada;
}

plataforma.prototype.jump = function(){
	if(this.arriba === false)
	{
	this.iniPointY = this.y;
	this.arriba = true;
	this.immovable = false;
	this.body.gravity.y = 400;
	this.body.velocity.y = -100

	//Utilizamos un temporizador de phaser para devolver la plataforma a su sitio original después de que esta caiga, 
	//ya que no siempre vuelve a quedarse en la posición original.
	this.temporizador.loop(500, vuelve, this);
  	this.temporizador.start();
}
	
}

//Sirve para apagar una plataforma de fuego
plataforma.prototype.cambiaSprite = function(){

	this.loadTexture('plat2', 0);

    this.animations.add('pla2');

    this.animations.play('plat2', 4, true);
}

function vuelve(){
	this.body.gravity.y = 0;
	this.body.velocity.y = 0;
	this.y = this.iniPointY;
	this.immovable = true;
	this.tocada = false;
	this.temporizador.stop();
	this.arriba = false;

}


module.exports = plataforma;
},{"./class_environment":9}],16:[function(require,module,exports){
'use strict';

var movible = require('./class_movibl');
var HUD = require('./HUD');	
var cols = require('./handleCollisions');
var cursors;
var jumpButton;
var escudo;
var daVida;
var facingRight;
var salta1; var salta2;
var hurt1; var hurt2; var hurt3; var pisSpound;

var Protagonista = function(game, entradax, entraday, entradasprite, dir, velx, vidas){
	movible.call(this, game, entradax, entraday, entradasprite, dir, velx);
	this.vidas = vidas;
	this.juego = game;
  //Todos los boleanos y variables de control que necesitamos para saber qué está haciendo el player en cada momento
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
  this.agarrado = false;
  this.atacando = false;
  this.haAtacado = false;
  this.pis;
  this.derecha = false;
  this.izquierda = false;
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
  this.reescala_imagen(1.4, 1.2);

  //Añadimos todas las animaciones del jugador
  this.animations.add('walk', [0,1,2,3]);
  this.animations.add('stay', [4,5], 6, true);
  this.animations.add('jump', [6,7,8,9,10,11,12,13,14]);
  this.animations.add('peeing', [15,16,17,18,19,20,21,22,23,24,25]);
  this.animations.add('attack1', [26]);
  this.animations.add('attack2', [27]);
  this.animations.add('attack3', [28, 29],2);
  this.animations.play('stay');

  //añadimos sonidos del player
  salta1 = this.juego.add.audio('jumpa1');
  salta2 = this.juego.add.audio('jumpa2');
  hurt1 = this.juego.add.audio('hurt1');
  hurt2 = this.juego.add.audio('hurt2');
  hurt3 = this.juego.add.audio('hurt3');
  pisSpound = this.juego.add.audio('pis');

  //Creamos el escudo del jugador, que siempre lo acompañará pero sólo estará activo cuando este beba batido de proteinas
  escudo = this.game.add.sprite(this.x ,this.y,'escudo');
  escudo.visible = false;
  escudo.width = 250;
  escudo.height = 250;

  //Hemos creado una nueva colisión invisible para la mecánica del pis.
  //Esta va con el jugador y se activa cuando este hace pis. 
  //Sirve para no utilizar el mismo collider del jugador ya que daba muchos fallos con las plataformas 
  //de los bordes y las de fuego.
  this.pis = this.game.add.sprite(this.x, this.y, 'enemigo');
  this.juego.physics.arcade.enable(this.pis);
  this.pis.visible = false;

}


Protagonista.prototype.update = function (){

if(this.juego.movil){
  if(this.juego.input.pointer1.isDown){
    if(this.game.input.pointer1.positionDown.x >= 650){
      this.derecha = true;
    }
   else if(this.game.input.pointer1.positionDown.x < 650){
      this.izquierda = true;
    }
  }
  else{
    this.derecha = false;
    this.izquierda = false;
  }
}
  //Si no hay inputs consideramos que el jugador está parado
	 this.body.velocity.x = 0;
   this.vel = this.origVel - (this.orina * 10);
   
	 if (this.corriendo)
	 	this.vel = 2*this.vel;

	 if (this.borracho){
	 	this.vel = -this.vel;
   }

   if(this.invencible){
    this.borracho = false;

    HUD.noBorracho();
    if(!this.atacando)
    	escudo.visible = true;
    escudo.x = this.x - 125;
    escudo.y = this.y - 120;
  }
   else 
    escudo.visible = false;

   if(this.orinando){
    this.vel = 0;
    this.body.touching.down = true;
  } 


  if(this.agarrado)
    this.vel = 0;

  if(!this.atacando){ //Si el protagonista no está atacando, puede moverse y saltar

    if (cursors.left.isDown || this.izquierda)
    {
        facingRight = false; //Servriá para saber a dónde está mirando el protagonista a la hora de hacer pis
        this.body.velocity.x = -this.vel;
        if(!this.borracho)
          this.scale.x = -this.escala;
        else this.scale.x = this.escala;
        if (this.body.touching.down && !this.orinando && !this.atacando)
           this.animations.play('walk', 6, true);
         if(this.orinando)
           this.pis.body.setSize(10,60, this.x - 270, this. y -620);
    }
    else if (cursors.right.isDown || this.derecha)
    {
        facingRight = true;
        this.body.velocity.x = this.vel;
        if(!this.borracho)
        this.scale.x = this.escala;
        else this.scale.x = -this.escala;
        if (this.body.touching.down && !this.orinando && !this.atacando)
           this.animations.play('walk', 6, true);
         if(this.orinando)
           this.pis.body.setSize(10,60, this.x - 150, this. y -620);

    }

    if (jumpButton.isDown && !this.agarrado && !this.orinando &&(this.body.onFloor() 
      || this.body.touching.down))

    {
      this.animations.play('jump', 10 , true);
      var n = this.juego.rnd.integerInRange(0,1); //Aleatorio para los dos sonidos distintos de salto
      if (n === 0)
        salta1.play();
      else
        salta2.play();

        this.body.velocity.y = -1000;
    }
}

    if(!this.body.touching.down) //Si no toca el suelo, está saltando. Servirá para hacer pis
             this.saltando = true;
    else this.saltando = false;

    if(cursors.up.isDown && !this.saltando && !this.atacando && this.orina >= 10)
        {
          this.borracho = false;
          HUD.noBorracho();
          this.animations.play('peeing', 6, false);
          pisSpound.play();
          this.orina = 0;
          HUD.cambiaPis(this.orina);
          this.orinando = true;

          //Primero apagamos la plataforma en la que estamos por si acaso estuviesemos en una
          //Esto se puede dar si el jugador está en invencible encima de una plataforma
          this.pis.body.setSize(10,60, this.x - 200, this.y - 620);
          //Después ya depende del movimiento del jugador apagar la de dercha o izda
          if(facingRight)
           this.pis.body.setSize(10,60, this.x - 150, this. y -620);
         else 
           this.pis.body.setSize(10,60, this.x - 270, this. y -620);
          var prota = this;
          
          setTimeout(function(){prota.orinando = false; prota.invencible = false;}, 
              2000);
        }
        
     //Aquí actualizamos la posición del objeto jugador en su clase si es que se ha movido
      if( this.body.velocity.x != 0 ||  this.body.velocity.y != 0){
         this.cambia_pos(this.x, this.y);
       }

       else if (this.body.velocity.x === 0 && !this.orinando && !this.atacando)
       	this.animations.play('stay');

       if (this.atacando){
        this.vel = 0;
        this.invencible = true;
    	this.body.touching.down = true;
       if (!this.haAtacado){
        //Seleccionamos un aleatorio para las 3 animaciones de ataque distintas que tenemos
        var num = this.juego.rnd.integerInRange(1,3);
        var prota = this;
        if (num === 1)
          hurt1.play();
        else if (num === 2)
          hurt2.play();
        else
          hurt3.play();
        prota.haAtacado = true;

        //Tras el tiempo de ataque, volvemos a poner al jugador en su estado anterior
       setTimeout(function(){prota.atacando = false;cols.reduceEnem(); prota.haAtacado = false; prota.invencible = false;}, 700);
     }
     this.animations.play('attack'+num,4,false); //finalmente hacemos la animación
      }
}

Protagonista.prototype.incrementaOrina = function (orina){

//Método que es llamado cuando el jugador toma una bebida para incrementar su orina
  this.orina = this.orina + orina;
  if(this.orina>10)
    this.orina = 10; 
  //actualizamos en el HUD el medidor de pis
  HUD.cambiaPis(this.orina);

}

function dejaDeAtacar(){


}
module.exports = Protagonista;
},{"./HUD":1,"./class_movibl":13,"./handleCollisions":23}],17:[function(require,module,exports){

"use strict";

var GO = require('./class_object');
var escena = require('./play_scene');

var powerUp = function(game, entradasprite, orina){
	this.Rx = game.rnd.integerInRange(0, 1200);
 	this.Ry = game.rnd.integerInRange(0, 500);
 	this.timer;
 	
  GO.call(this, game, this.Rx, this.Ry, entradasprite);
  this.orina = orina;
  game.physics.arcade.enable(this);
  this.body.gravity.y = 4000;
}

powerUp.prototype = Object.create(GO.prototype);
powerUp.prototype.constructor = powerUp;

module.exports = powerUp;
},{"./class_object":14,"./play_scene":28}],18:[function(require,module,exports){
"use strict";

var enemigo = require('./class_enemy');
var tortuguita =  function(game, entradax, entraday, entradasprite, dir, velx, grabber){
  enemigo.call(this, game, entradax, entraday, entradasprite, dir, velx, grabber, 2);
  this.create();
}
tortuguita.prototype = Object.create(enemigo.prototype);
tortuguita.prototype.constructor = tortuguita;

tortuguita.prototype.create = function () {
	this.reescala_imagen(1.2,1);
	this.body.gravity.y = 2000;
	this.animations.add('mueve',[0,1,2], 5, true);
	this.animations.play('mueve');
}

tortuguita.prototype.update = function (){
if (this.golpeado){
	this.stunt = true;
}
	
else
	this.stunt = false;

if(!this.stunt)
	this.actualiza_pos(this.velocidad * this.cont);
else 
	this.actualiza_pos(0);
	if( this.body.velocity.x != 0 ||  this.body.velocity.y != 0){
         this.cambia_pos(this.x, this.y);
       }
}



module.exports = tortuguita;
},{"./class_enemy":8}],19:[function(require,module,exports){
var PU = require('./class_powerUp');	
var sound;

var agua = function(game, entradasprite){
	sound = game.add.audio('water');
	this.orina = 2;
	PU.call(this, game, entradasprite, this.orina);
	this.reescala_imagen(0.9,0.9);	
	
}
	
agua.prototype = Object.create(PU.prototype);
agua.prototype.constructor = agua;

agua.prototype.efecto = function(jug){
	console.log('El agua no hace nada, pringado.'); //Easter Egg del juego (no estaba escrito este comentario en la entrega de marketing por razones obvias)
	sound.play();
}


module.exports = agua;
},{"./class_powerUp":17}],20:[function(require,module,exports){
'use strict'

var tort = require('./class_turtle');
var crab = require('./class_crab');
var fly = require('./class_fly');
var agarra = require('./class_agarrador');
var escena = require('./play_scene');

	
var enemigoRandom = {};
var enemies;

enemigoRandom.creaGrupo = function(juego){
	//Creamos un grupo de enemigos. Este será llamado en el create del playscene, por lo tanto sólo una vez por partida
  enemies = juego.add.physicsGroup();
}

enemigoRandom.creaEnemigoRandom = function(juego, nivel, auxRn, jugador) {

    //Vamos a esperar x tiempo antes de crear un nuevo enemigo para que no se generen 2 en el mismo punto
    setTimeout(function(){

    var aleatorioEnem = 0; 

    //Dependiendo del nivel, generaremos un tipo concreto de enemigo, por eso el aleatorio enem tiene unos valores concretos para algunos niveles
    if(nivel < 3) aleatorioEnem = 0;
    else if(nivel >= 3 && nivel < 5) aleatorioEnem = 1;
    else if(nivel === 5) aleatorioEnem = 2;
    else if(nivel === 6)
    {
      var p = juego.rnd.integerInRange(0,1);
      if(p === 0)
        aleatorioEnem = 0;
      else
        aleatorioEnem = 2; 
    }
    //después de esos niveles, será completamente aleatorio los enemigos que nos salgan
    else if(nivel >= 7) aleatorioEnem = juego.rnd.integerInRange(0,3);
      
    var x = 0;
    var y = 0;
    var xFly;
    var yFly;
    var xAG;
    var yAG;

    y = juego.rnd.integerInRange(0, 600);
    var ctrl = juego.rnd.integerInRange(0,2); //Variable para determinar la posición de salida de determiandos enemigos

    if(ctrl === 0){
      yFly = 0;
      yAG = 300;
      
    }
    else if( ctrl === 1){
      yFly = 300;
      yAG = 350;
      
    }
    else{
      yFly = 450;
      yAG = 350;
    
    }

    if(!auxRn){
      auxRn = true;
      x = juego.rnd.integerInRange(100,250);
      xFly = 100;
      xAG = 50;
    }
    else {
      auxRn = false;
      x = juego.rnd.integerInRange(950,1100);
      xFly = 1100;
      xAG = 1150;
    }

    //Dependiendo del aleatorioEnem, crearemos un tipo de enemigo u otro
    if (aleatorioEnem === 0){
      var enemigo = new tort(juego, x, 0, 'tortuguita', 1, 150, false);
    }

    else if (aleatorioEnem === 1){
      var enemigo = new fly(juego, xFly, yFly, 'fly', 1, 100, false);
      
    }
    else if (aleatorioEnem === 2){
      var enemigo = new crab(juego, x, 0, 'crabby', 1, 150, false);
    }

    else if(aleatorioEnem === 3 && escena.agarrador.devuelve() === false){
      var enemigo = new agarra(juego, xAG, yAG, 'enemigo', jugador, true);
      escena.agarrador.True();
    }

    else //Para curarnos de espanto, porque hay veces que las otras condiciones no se cumplen
      var enemigo = new tort(juego, x, 0, 'tortuguita', 1, 150);

    enemies.add(enemigo); //Añadimos el enemigo al grupo de enemigos

    if (x >= 950)
      enemigo.cambia_dir(); //Cambiamos la dirección del enemigo si este es creado en la parte derecha de la pantalla

    enemigo.velocidad = nivel * 3 + enemigo.velocidad; //Cada nivel los enemigos irán más rápido

     }, 1000);         
} 

  enemigoRandom.devuelveGrupo = function(){
  	
    return enemies;
  }


module.exports = enemigoRandom;
},{"./class_agarrador":3,"./class_crab":7,"./class_fly":11,"./class_turtle":18,"./play_scene":28}],21:[function(require,module,exports){
'use strict'
	
var creaMonedas = {};
var monedas;
var object = require('./class_object');

creaMonedas.creaGrupo = function(juego){
  monedas = juego.add.physicsGroup();
  return monedas;
}

creaMonedas.devuelveGrupo = function(juego, numMonedas){
  var n = numMonedas;
  //Bucle para crear las monedas de los niveles extra en el mapa
  for(var n = numMonedas; n > 0; n--){
    var aux = new object(juego, 0, 0, 'coin');
    aux.reescala_imagen(0.4, 0.4);
    if(n>=7)
      aux.cambia_pos(250*((numMonedas+1)-n),600);
    else if(n>=3)
      aux.cambia_pos(250*((numMonedas-3)-n),250);
    else
      aux.cambia_pos(400*(n),50);
    monedas.add(aux);
  }

  return monedas;
}

module.exports = creaMonedas;
},{"./class_object":14}],22:[function(require,module,exports){
'use strict'

var plat = require('./class_platform');
	
var plataforma = {};
var platforms;
var platformsIni;
var level;
var fug;

plataforma.creaPlataforma = function(juego, nivel) {

  level = nivel;
  var anchorx;
  var anchory;  
  var anchoPlat = 500;
  var largoPlat = 50;

  platforms = juego.add.physicsGroup();
  platformsIni = juego.add.physicsGroup();

  //Determinamos de forma aleatoria si nos encontramos ante un nivel de fuego o hielo
  var aleatorio = juego.rnd.integerInRange(0,1);
  if (aleatorio === 0)
    fug = false;
  else fug = true;


  //conjuntos de plataformas

  anchorx = 0; anchory = 0;
  for (var a = -1; a < 26; a++){
    plataforma.creaPlat(a, anchorx, anchory, juego, true, false);
  }
  anchorx = 0; anchory = 200;
  for (var a = 0; a < 8; a++){
    plataforma.creaPlat(a, anchorx, anchory, juego, false, false);
  }
  anchorx = 1280-anchoPlat; anchory = 200;
  for (var a = 0; a < 8; a++){
    plataforma.creaPlat(a, anchorx, anchory, juego, false, false);
  }
  anchorx = 350; anchory = 375;
  for (var a = 1; a < 8; a++){
    plataforma.creaPlat(a, anchorx, anchory, juego, false, false);
  }
  anchorx = 0; anchory = 400;
  for (var a = 0; a < 4; a++){
    plataforma.creaPlat(a, anchorx, anchory, juego, false, false);
  }
  anchorx = 1280 - 250; anchory = 400;
  for (var a = 0; a < 4; a++){
    plataforma.creaPlat(a, anchorx, anchory, juego, false, false);
  }
  anchorx = 0; anchory = 550;
  for (var a = 0; a < 8; a++){
    plataforma.creaPlat(a, anchorx, anchory, juego, false, false);
  }
  anchorx = 1280-anchoPlat; anchory = 550;
  for (var a = 0; a < 8; a++){
    plataforma.creaPlat(a, anchorx, anchory, juego, false, false);
  }
  anchorx = 0; anchory = 700;
  for (var a = -1; a < 26; a++){
    plataforma.creaPlat(a, anchorx, anchory, juego, false, false);
  }

  //Plataformas para cuando muera el jugador
   var anchorx = 510; var anchory = 100;
    for (var a = 0; a < 4; a++){
    plataforma.creaPlat(a, anchorx, anchory, juego, false, true);
  }   
    platformsIni.visible = false;
        
} 

    plataforma.creaPlat = function(a, anchorx, anchory, juego, superior, ini){

      var fuego = false; var hielo = false;

      //En cada nivel las plataformas son destruidas y vueltas a crear para que, a partir del nivel 6, podamos decidir qué tipo
      //de plataforma tenemos

    if(level >= 6 && !superior && !ini){
      var aleatorio = juego.rnd.integerInRange(0,100); //porcentaje para que una plataforma pueda ser de fuego o hielo
    

        if (aleatorio <= 95){ //Sólo será de fuegoo o hielo la plataforma si entra en el 5%

           var sprite = 'plat2';}

         else {

          if(!fug){

           var sprite = 'plat0';
           hielo = true;
           }

          else{
           var sprite = 'plat1';
           fuego = true;
          }
       }
  }
  

   else {
      var sprite = 'plat2';
    }
    
    var p = (new plat(juego, 0, 0, sprite, fuego, hielo));
    if(superior)
      p.reescala_imagen(1, 0.1);
    p.cambia_pos(anchorx + (a*p.width), anchory);
    if(!ini)
    platforms.add(p);
    else
    platformsIni.add(p);

  }

  plataforma.devuelvePlat = function(){

    return platforms;
  }

  plataforma.devuelveIni = function(){
    return platformsIni;
  }
  

module.exports = plataforma;
},{"./class_platform":15}],23:[function(require,module,exports){
'use strict'

var escena = require('./play_scene');
var plat = require('./crea_Plataformas');
var HUD = require('./HUD');
var colisiones = {};
var enemigosEnPantalla;
var juego ;
var coin;

colisiones.create = function(game){

  juego = game;
  coin = juego.add.audio('coin');
}

//Las siguientes clases manejan las colisiones detectadas en el playScene.

//Maneja colisiones entre jugador y PowerUp
colisiones.collisionHandlerPower = function(jug, pw){
  escena.puntos.suma(-3); //Restamos los puntos de los PU (todos restan 3, no como los enemigos)
	jug.incrementaOrina(pw.orina); //Incrementamos la orina del jugador con la que nos de cada PU
	pw.efecto(jug); //Aplicamos el efecto del PU al jugador
  escena.PU.eliminado(pw); //En la escena, manejamos el evento de eliminar PU's
}

//Maneja colisiones entre el jugador y las bolas de fuego
colisiones.collisionHandlerFireBall = function(jug, fb){

  //Si el jugador es invencible, destruimos la bola, sino, matamos al jugador
	if (jug.invencible){
		fb.kill();
		jug.invencible = false;
	}

	else{
		escena.estadosJugador.jugadorMuerte();
	}

}

//Colisiones entre jugador y monedas de niveles extra
colisiones.collisionHandlerMonedas = function(jug, mon){
  escena.puntos.suma(2); //Sumamos puntos por moneda
  coin.play(); //Emitimos un sonido al cogerla
  mon.kill(); //Eliminamos la moneda
  escena.stateMoneda.reduceMoneda(); //Reducimos el número de monedas de la escena

}

//Manejamso colisiones entre el pis del jugador y los enemigos
colisiones.collisionHandlerEnemPis = function(jug, enem){

  //Lo primero que vemos es si el enemigo contra el que chocamos es de tipo agarrador, para sacarlo de la escena.
    if(enem.grabber){
      escena.agarrador.False();      
    }
    //Después sumamos los puntos del enemigo en concreto, lo destruimos, reducimos el número de enemigos por pantalla de ese momento y el número
    //de enemigos totales del nivel
    escena.puntos.suma(enem.devuelvePuntos());
    enem.kill();
    escena.enemigos.reducePantalla();
    escena.enemigos.reduceNumero();
}

//Colisiones entre el jugador y todos los enemigos
colisiones.collisionHandlerEnem = function(jug, enem){

  //En este método detectamos varios casos, principalmente si el enemigo está stuneado (aturdido) o no lo está

  //Si el enemigo NO está aturdido:
	if(!enem.stunt){
    //Si el jugador no es invencible...
		if(!jug.invencible){

      //Si el enemigo es agarrador y el jugador no está agarrado, este lo agarrará
			if(enem.agarra != undefined && !jug.agarrado)
				  enem.agarra(jug);

        //Si no es agarrador y el jugador no está siendo agarrado, en la escena llamaremos al método que elimina al jugador
			else if(!jug.agarrado) escena.estadosJugador.jugadorMuerte();

  		}
      //Si el jugador SI es invencible
  		else if (jug.invencible) {
          //Si el enemigo es del tipo agarrador, lo sacamos de la escena
          if(enem.grabber){
            escena.agarrador.False();      
        }
          //Sea o no agarrador, sumamos la puntuacion que da el enemigo, lo eliminamos y hacemos que el jugador comience su animación de ataque definida en su clase
  				enem.kill();
  				colisiones.reduceEnem();
  				jug.invencible = false;
  			}

      }

      //Si el enemigo SI está aturdido
  else {

    //Si el enemigo es del tipo agarrador, lo sacamos de la escena
    if(enem.grabber){
      escena.agarrador.False();      
    }
    //Sea o no agarrador, sumamos la puntuacion que da el enemigo, lo eliminamos y hacemos que el jugador comience su animación de ataque definida en su clase
    escena.puntos.suma(enem.devuelvePuntos());
  	enem.kill();
    jug.atacando = true;
  	
  }
  }

  //Metodo para reducir el numero de enemigos por pantalla y el numero de enemigos total
  colisiones.reduceEnem = function(){
    escena.enemigos.reducePantalla();
    escena.enemigos.reduceNumero();
  }

  //Se encarga de controlar las colisiones entre el jugador y las plataformas
  colisiones.collisionHandlerJug = function(jug, plat){
    //Si toca la plataforma con la cabeza, esta cambiará su estado, explicado en la clase plataforma
  	if(jug.body.touching.up){
   		plat.cambia_tocada();
   		plat.jump();
  	}

    //Si la plataforma es de fuego y la toca con otra parte que no sea la cabeza, y el jugador no es invencible, morirá
    //(Que no la toque con la cabeza sirve para que no muera al saltar)
  	if(plat.fuego &&  !jug.body.touching.up && !jug.invencible){
      escena.estadosJugador.jugadorMuerte();
  		
    }
    //Igual que con las de fuego pasa con las de hielo
    else if (plat.hielo && !jug.body.touching.up){
      if(!jug.corriendo)
        jug.corriendo = true;
      //Tras un tiempo, el jugador dejará de "resbalarse"
      setTimeout(function(){jug.corriendo = false;}, 300);
    }

    //Si el jugador orina sobre una plat de fuego, cambiaremos el sprite y la "actitud" de esa plataforma (la apagaremos)
    if(jug.orinando && plat.fuego){
       plat.fuego = false;
           plat.cambiaSprite();
    }

  }

  //Controla colisiones entre los enemigos y las plataformas
  colisiones.collisionHandlerPlat = function(enem, plat){

    //Si el jugador toca la plataforma, esta estará en "tocada"
  	if(plat.tocada){
  		plat.cambia_tocada(); //Si es así, cambiará ella misma su estado a tocada
  		if (!enem.golpeado){ //Si el enemigo no ha sido previamente golpeado por una plataforma, se pondrá en golpeado
  			enem.golpeado = true;
  			enem.cont = enem.cont + 0.25;
  			if (enem.cont > 2) 
  				enem.cont = 2;
        //Si el enemigo es grabber, tardará 6 segundos en dejará de estar golpeado, mientras que los otros enemigos tardarán 3
        if(enem.grabber)
            setTimeout(function(){ enem.golpeado = false;}, 6000);
          else
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

  //Controla la colision entre el pis del jugador y las plataformas
  colisiones.collisionHandlerPis = function(jug, plat){
    //Si la plataforma es de fuego y el pis está activo, la cambiará 
       if(plat.fuego){
           plat.fuego = false;
           plat.cambiaSprite();
       }
  }

    //Las dead zones son lugares colocados para que o bien los enemigos al llegar, vuelvan a aparecer
    //o bien para destruir las bolas de fuego cuando salen de la pantalla.

    colisiones.DeadZone1 = function(dead, enem){
  	enem.kill();
  	setTimeout(function(){
  		enem.reset(1200,90);
  	},1000);
  }

  colisiones.DeadZone2 = function(dead, enem){
  	enem.kill();
  	setTimeout(function(){
  		enem.reset(0,90);
  	},100);
  }

  colisiones.DeadZoneF = function(dead, fb){
  	fb.kill();
  }



  module.exports = colisiones;

},{"./HUD":1,"./crea_Plataformas":22,"./play_scene":28}],24:[function(require,module,exports){
'use strict';

/*Esta clase maneja la respuesta del servidor y envia peticiones al mismo para cambiar
la puntuación del ranking global. Es una compilación de muchas páginas de internet para 
aprender como funciona y no habría sido posible gracias a muchísimas horas 
de trabajo y la ayuda de uno de los componentes de libreLab que nos dejó su servidor para "hostear" nuestro
archivo JSON y nos explicó cómo funcionan dichas peticiones.

Debido a no tener una base clara (ni ninguna), somos conscientes de cometer varios errores a la hora de formular dichas peticiones y
de tratar las respuestas.

Para entender el funcionamiento del mismo, en concreto el "mandaDatos", aconsejamos leer los métodos a los que se llamnan en su orden de llamada*/

var handleRequest = {};

var auxNombre;
	
  //A nuestro método de petición llegarán 2 booleanos de control.
  //Pinta -> Si queremos "imprimir" en el juego los datos que hemos recibido del servidor
  //MandaDatos -> Si queremos mandarle al servidor alguna información (nuevo jugador, eliminar jugador...)
  //Datos -> Si queremos mandar algo al servidor, estarán en un array llamado Datos, sino, llegará null

handleRequest.Peticion = function(juego, pinta, mandaDatos, Datos){
 
  var httpRequest; //creamos la variable para hacer la request
  var url = 'https://services.devpgsv.com/lent_xtreme/score.json'; //asignamos la url donde se encuentra el json a una variable
  var puntuacionAnterior = 0; //Asumimos que la puntuación que ha sacado el jugador anteriormente es la mínima

  //Haremos dos cosas distintas si mandamos los datos o solo recibimos información
  if(mandaDatos){
   auxNombre = Datos[0]; //Guardamos en una variable auxiliar el nombre de la persona que ha jugado para después comprobar si se encuentra en la lista del servidor
   makeRequest(auxNombre); //Hacemos la petición con el nombre de la persona ('GET') para que nos de la información y procesarla (Leer método antes de mandaInfo)
   setTimeout(function(){mandaInfo()}, 500); //Tras 0.5 segundos, mandaremos la información al servidor (con una nueva petición 'POST') después de haber procesado la respuesta anterior y haber comparado el nombre.
   //Somos conscientes de que este último método no es correcto, y que debería haber la comprobación el servidor. Pero ya que no está a nuestro alcance cambiar el mismo,
   //decidimos hacer este arreglo desde nuestro handleRequest. 
  }

  else //Si no mandamos datos, simplemente llamamos a "makeRequest" que recibe la información sin el parámetro de la persona
    makeRequest();
 
  function mandaInfo(){
    //El array de datos de la persona, que contiene en orden el nombre, la puntuación y el nivel al que ha llegado la persona
    var nombre = Datos[0];
    var punct = Datos[1];
    var nivel = Datos[2];
    
    //Si la puntuación actual es menor que la anterior, guardaremos la mayor puntuación de las dos y se lo diremos al jugador
    if(puntuacionAnterior > punct){
      alert("La puntuación que has conseguido (" +punct +") es menor que tu anterior puntuación " +nombre +"... (" +puntuacionAnterior +") \n\nSomos buenos y te guardamos la mejor ;)");
      punct = puntuacionAnterior;
    }

    var xhttp = new XMLHttpRequest(); //Crearemos las nueva petición
    xhttp.onreadystatechange = function() { //Tras hacer open y send, como en makeRequest, entraremos a procesar la información
      if (this.readyState == 4 && this.status == 200) { //Si se ha hecho la petición bien y el estado es correcto (XMLHttpRequest.DONE === 4 ---> código de estado)
        var data = JSON.parse(this.responseText); //Entonces parsearemos la información por si necesitasemos procesar algo más
        //Aquí podríamos avisar al usuario de que la respuesta ha sido registrada con éxito, que su respuesta ha sido guardada o si ha entrado o no al top 10 de jugadores
      }
    };
    xhttp.open("POST", "https://services.devpgsv.com/lent_xtreme/update.php", true); //Esta vez, la petición es del tipo 'POST' ya que vamos a escribir en el servidor
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded'); //Header para que funcione la petición
    xhttp.send("nombre="+nombre+"&punct="+punct+"&nivel="+nivel); //Mandamos al servidor los nuevos datos del usuario
  }

  function makeRequest(auxNombre) {

    httpRequest = new XMLHttpRequest(); //creamos la petición al servidor

    //Si la petición no se ha creado con éxito, crearemos un mensaje de error para avisar
    if (!httpRequest) {
      alert('Error: No se ha podido crear la instancia. \n Vuelva a intentarlo más tarde.');
      return false;
    }
    
    //Si la petición se ha creado correctamente, continuaremos

    //onreadystatechange se llamará DESPUÉS de haber hecho "open" y "send", por lo tanto será lo último que se haga (recomendamos leer open y send antes de continuar) 
    httpRequest.onreadystatechange = function(){
      //Después de haber hecho Open y Send, si se han realizado con éxito, pasaremos a procesar la petición

          if (httpRequest.readyState === XMLHttpRequest.DONE) { //Si la petición ha salido con éxito
            if (httpRequest.status === 200) { //Y el estado de la misma es correcto (200 === código de estados)

              //Entonces ha llegado la respuesta. Aquí podríamos avisar al usuario que se ha hecho con éxito, pero no es necesario
    var respuesta = JSON.parse(httpRequest.response); //Parseamos la respuesta que en este caso está en un archivo .JSON

    var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

    for(var i = 0; i < 10; i++){ //recorreremos los 10 primeros elementos de la lista
      var nombre;
      var punct;

      //Si no encontramos ningún dato en el JSON, diremos que está sin datos. Sino, asignaremos a nombre el del JSON
      if(respuesta.score[i] === undefined)
        nombre = "SIN DATOS";
      else 
        nombre = respuesta.score[i].nombre;

      //Mientras que si no existe la puntuación, la pondremos a 0, sino asignaremos a punct la del JSON correspondiente al nombre
      if(respuesta.score[i] === undefined)
        punct = "0";
      else 
        punct = respuesta.score[i].punct;
      
      //Si el booleano a la hora de llamar a handleRequest de pintar estaba a true, pintaremos en pantalla el resultado para todos 
      //los elementos que tengamos dentro del json en este caso hasta el número 10
      if (pinta){

        juego.add.text(300, 80 + i * 60, "NOMBRE: " + nombre, style);
        juego.add.text(710, 80 + i * 60, "PUNTUACION: " + punct, style);
      }

      //Vamos a ver si el nombre ya existe dentro del top 10 de puntuaciones. Si existe, guardamos su puntuación para despues
      //ver si pasamos los datos o no.
        if(mandaDatos && nombre === auxNombre){
          puntuacionAnterior = punct;
        }
      }
      }
        //Si la petición no se procesa con éxito, lanzaremos un error
       else {
        alert('Problema al procesar la petición.');
      }
    }
  }
    };

    httpRequest.open('GET', url, true); //Con la petición 'GET' pedimos al servidor, con la url dada y en modo asíncrono (true),
    //que nos devuelva lo que en ella haya (el archivo JSON) y lo abrimos
    httpRequest.send(); //Tras esto, enviamos al servidor la información que necesitemos enviar (si procede)
  }

module.exports = handleRequest;
},{}],25:[function(require,module,exports){
'use strict';

var Menu = require('./menu.js');

var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    //Aqui se cargaran las imagenes en el gh-pages
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
  },

  create: function () {
    this.game.state.start('preloader');
  }
};


var PreloaderScene = {
  preload: function () {

  	//Carga de la imagen de la barra de carga
    this.loadingBar = this.game.add.sprite(0, 500, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 5);
    this.load.setPreloadSprite(this.loadingBar);

	//Carga de imagenes para el juego

    //Fondo
    this.game.stage.backgroundColor = '#220A29'; 
    this.game.load.spritesheet('fondo', 'images/spacerun.png', 1280, 720, 9);
    this.game.load.spritesheet('fondocourse', 'images/spacecourse.png', 1280, 720, 7);
    this.game.load.image('Punct', 'images/Menus/fondoPuntuaciones.png');

	//Logo y jugador
    this.game.load.image('logo', 'images/phaser.png');
    this.game.load.image('escudo', 'images/Escudo.png');
    this.game.load.spritesheet('play', 'images/alientotal.png', 60, 57, 15);
    this.game.load.spritesheet('player', 'images/alientotal5.png', 64, 57, 29);
	  this.game.load.spritesheet('borracho', 'images/Borracho.png', 1280, 720, 4);

    //Plataformas
    this.game.load.spritesheet('plat0', 'images/plat0.png', 64, 64, 3);
    this.game.load.spritesheet('plat1', 'images/plat4.png', 64, 64, 3);
    this.game.load.spritesheet('plat2', 'images/plat2.png', 64, 64, 3);
    this.game.load.spritesheet('omitir', 'images/Menus/Omitir.png', 64, 64, 3);
    this.game.load.spritesheet('mute', 'images/Menus/mute.png', 64, 64, 3);
    this.game.load.spritesheet('PCompleta', 'images/PCompleta.png', 64,64,3);

    //HUD
    this.game.load.image('perder', 'images/lose.png');
    this.game.load.spritesheet('numeros', 'images/Numeros.png', 98.1,200,10);
    this.game.load.image('nivel', 'images/Nivel.png');
    this.game.load.image('interiorPis', 'images/InteriorPis.png');
    this.game.load.image('exteriorPis', 'images/ExteriorPis.png');
    this.game.load.spritesheet('vidas', 'images/Vidas.png');
    this.game.load.image('Pausa', 'images/Menus/pause.png');
    this.game.load.spritesheet('medPis', 'images/Pis.png', 64,64, 12);
    this.game.load.image('fondoRetrete', 'images/FondoRetrete.png');
    this.game.load.image('vidaExtra', 'images/vidaExtra.png');
    this.game.load.image('barraAgarrador', 'images/barraAgarrador.png');

    //Enemigos
    this.game.load.spritesheet('tortuguita', 'images/tortuguita.png', 64,64, 3);
    this.game.load.spritesheet('enemigo', 'images/Grabber.png', 64,64,16);
    this.game.load.spritesheet('crabby', 'images/crabby.png', 64, 57, 4);
    this.game.load.spritesheet('fly', 'images/fly.png', 64,64, 6);
    this.game.load.spritesheet('fireball', 'images/fireball.png', 64, 32, 2);
    this.game.load.spritesheet('greenfireball', 'images/greenfireball.png', 64, 64, 6);

    //Bebidas
    this.game.load.image('energetica', 'images/Energetica.png');
    this.game.load.image('agua', 'images/agua.png');
    this.game.load.image('alcohol', 'images/alcohol.png');
    this.game.load.image('proteinas', 'images/proteinas.png');

    //Monedas
    this.game.load.image('coin', 'images/coin.png');

    //Imagenes de fondo  de menu
    this.game.load.image('Potenciadores', 'images/Menus/Potenciadores.png');
    this.game.load.image('Enemigos', 'images/Menus/Enemigos.png');
    this.game.load.image('Plataformas', 'images/Menus/Plataformas.png');
    this.game.load.image('Menu', 'images/Menus/MenuPrincipal.png');
    this.game.load.image('Pis', 'images/Menus/Pis.png');
    this.game.load.image('Controles', 'images/Menus/Controles.png');
    this.game.load.spritesheet('button', 'images/Menus/boton.png', 64, 64, 3);
    this.game.load.spritesheet('button2', 'images/Menus/boton2.png', 64, 64, 3);
    this.game.load.image('fVideo', 'images/Menus/FondoVideo.png');

    //Carga de vídeos
    this.game.load.video('tuto', 'images/Menus/Tutorial.mp4');
    this.game.load.image('aux', 'images/FondoIndex.png');
    this.game.load.video('pis1', 'images/Menus/Pis1.mp4');
    this.game.load.video('pis2', 'images/Menus/Pis2.mp4');

    //Carda de los sfx
    this.game.load.audio('death', 'sfx/death.mp3');
    this.game.load.audio('jumpa1', 'sfx/jump1.mp3');
    this.game.load.audio('jumpa2', 'sfx/jump2.mp3');
    this.game.load.audio('hurt1', 'sfx/hurt1.mp3');
    this.game.load.audio('hurt2', 'sfx/hurt2.mp3');
    this.game.load.audio('hurt3', 'sfx/hurt3.mp3');
    this.game.load.audio('coin', 'sfx/coin2.mp3');
    this.game.load.audio('water', 'sfx/pu1.mp3');
    this.game.load.audio('energ', 'sfx/pu2.mp3');
    this.game.load.audio('beer', 'sfx/pu3.mp3');
    this.game.load.audio('prot', 'sfx/pu4.mp3');
    this.game.load.audio('drop', 'sfx/puDrop.mp3');
    this.game.load.audio('pause', 'sfx/pause.mp3');
    this.game.load.audio('click', 'sfx/click.mp3');
    this.game.load.audio('back', 'sfx/back.mp3');
    this.game.load.audio('pis', 'sfx/pis.mp3');
    this.game.load.audio('victory', 'sfx/victory.mp3');
    this.game.load.audio('game', 'sfx/Juego.mp3');
    this.game.load.audio('course', 'sfx/course.mp3');
    this.game.load.audio('menu', 'sfx/Menu.mp3');
  },

  create: function () {
  	var menuSound;
  	menuSound = this.game.add.audio('menu');
    menuSound.loopFull();
    this.game.state.start('menu');
  }
};


window.onload = function () {
    //Creamos el juego
  var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'game');

  game.movil = false;

  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('menu', Menu);

  game.state.start('boot');
};

},{"./menu.js":26}],26:[function(require,module,exports){
'use strict';

var tuto = require('./Tutorial.js');
var menuInformacion = require('./menuInformacion');
var Put = require('./puntuaciones');

var buttonJuego; var buttonInfo; var pantalla; var punt; var muteb;
var juego;
var click; var back; var gameSound;
var movil;

var menu = {

  create: function () {
    juego = this.game;

    juego.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT; //para que la pantalla completa se ajuste a los bordes
    //Añadimos estados al juego
    juego.state.add('info', menuInformacion);

    juego.state.add('tutorial', tuto); 

    juego.state.add('puntuation', Put);

    //Añadimos audios
    click = juego.add.audio('click');
    back = juego.add.audio('back');
    gameSound = juego.add.audio('game');

   juego.add.sprite(0,0,'Menu');

    //Boton que nos lleva al juego
    buttonJuego = juego.add.button(juego.world.centerX - 75, 275, 'button', actionOnClickJuego, this, 2,1,0);
    buttonJuego.animations.add('button');
    buttonJuego.animations.play('button', 4, true );
    buttonJuego.width = 150;
    buttonJuego.height = 60;

    //Boton para el menú de información
    buttonInfo = juego.add.button(juego.world.centerX - 75, 475, 'button', actionOnClickInfo, this, 2,1,0);
    buttonInfo.animations.add('button');
    buttonInfo.animations.play('button', 4, true );
    buttonInfo.width = 150;
    buttonInfo.height = 60;

    //Boton para fullscreen
    pantalla = juego.add.button(juego.world.centerX - 600, 600, 'PCompleta', fullscreen, this, 2,1,0);
    pantalla.animations.add('PCompleta');
    pantalla.animations.play('PCompleta', 4, true);
    pantalla.width = 150;
    pantalla.height = 80;

    //Boton para mutear audio
    muteb = juego.add.button(juego.world.centerX - 400, 600, 'mute', muteSound, this, 2,1,0);
    muteb.animations.add('static' [1]);
    muteb.animations.play('static', 4, true);
    muteb.width = 150;
    muteb.height = 80;

    //Boton para puntuaciones
    punt = juego.add.button(juego.world.centerX - 535, 300, 'button', actionOnClickPunt, this, 2,1,0);
    punt.animations.add('button');
    punt.animations.play('button', 4, true );
    punt.width = 150;
    punt.height = 60;

    //Boton para movil
    movil = juego.add.button(juego.world.centerX + 535, 300, 'button', movilClick, this, 2,1,0);
    movil.animations.add('button');
    movil.animations.play('button', 4, true );
    movil.width = 150;
    movil.height = 60;
 },
};

function movilClick(){
    juego.movil = true;
    movil.visible = false;
}

function actionOnClickPunt (){
    //Abrimos la ventana de puntuaciones (ranking) cambiando de estado
    click.play();
    juego.state.start('puntuation');
}

function actionOnClickJuego () {
    //Paramos el sonido de la musica del menú y arrancamos el estado de tutorial antes que el juego en sí
    juego.sound.stopAll();
    gameSound.loopFull();
    click.play();
    juego.state.start('tutorial');
}

function actionOnClickInfo(){
    //Estado de información
    click.play();
    juego.state.start('info');
}

function fullscreen(){
    //Botón para la pantalla completa
    if (this.game.scale.isFullScreen)
    {
        back.play();
        this.game.scale.stopFullScreen();
    }
    else
    {
        click.play();
        this.game.scale.startFullScreen(false);
    }
}

function muteSound(){
    //Boton para silenciar audio.
  this.game.sound.mute = !this.game.sound.mute;
  click.play();
}



module.exports = menu; 
},{"./Tutorial.js":2,"./menuInformacion":27,"./puntuaciones":29}],27:[function(require,module,exports){
'use strict';

var men = require('./menu.js');

var buttonInfoD; var buttonInfoI; var buttonInfoM;
var fondo;
var cont;
var juego;
var click; var back;
var video1; var video2;

var menuInformacion = {

	create: function(){
	juego = this.game;
	//Cargamos las imágenes del menú
	fondo = juego.add.sprite(0,0,'Potenciadores');

	//Añadimos sonidos
    click = juego.add.audio('click');
    back = juego.add.audio('back');

	cont = 0;

	cambiaImagenes();
	}
};


function vuelveAMenu(){

	//Para volver al estado de menú principal
	back.play();
	juego.state.start('menu');
}


function cambiainfoD(){
	//Pasamos a la pestaña dela derecha
	click.play();
	cont++;

	if (cont >= 5)
		cont = 0;

	cambiaImagenes(); //Llamamos al método que cambia las pestañas
}

function cambiainfoI(){
	//Pasamos a la pestaña de la izquierda
	back.play();
	cont--;

	if (cont < 0)
		cont = 4;

	cambiaImagenes(); //Llamamos al método que cambia las pestañas
}

function cambiaImagenes(){

	//En cada una de las diferentes pestañas tenemos que generar las imagenes y los botones de nuevo, 
	//así como en la pestaña del pis crear los vídeos, ponerlos al principio y reproducirlos.
	//Esto se debe a que no hemos encontrado ningún método para ocultar los vídeos (como .visible para los sprites)
	// y no hemos encontrado ninguna mejor forma de hacerlo.

	if(cont === 0){
		juego.add.sprite(0,0,'Potenciadores');
		creaBotones();
	}
	else if (cont === 1){
		juego.add.sprite(0,0,'Enemigos');
		creaBotones();		
	}

	else if(cont === 2){
		juego.add.sprite(0,0,'Plataformas');
		creaBotones();	
	}

	else if(cont === 3){
		juego.add.sprite(0,0,'Pis');
		creaBotones();
		video1 = juego.add.video('pis1');
		video2 = juego.add.video('pis2');
		video1.currentTime = 0;
		video2.currentTime = 0;
		video1.addToWorld(320, 400, 0.5, 0.5, 0.4, 0.4);
		video2.addToWorld(960, 400, 0.5, 0.5, 0.4, 0.4);
    	video1.play(true);
    	video2.play(true);

	}

	else if(cont === 4){
		juego.add.sprite(0,0,'Controles');
		creaBotones();		
	}


}

function creaBotones(){

	//Boton para cambiar entre la info Derecha
    buttonInfoD = juego.add.button(juego.world.centerX + 500, 650, 'button', cambiainfoD, this, 2,1,0);
    buttonInfoD.animations.add('button');
    buttonInfoD.animations.play('button', 4, true );
    buttonInfoD.width = 100;
    buttonInfoD.height = 50;

    //Boton para cambiar entre la info Izquierda
    buttonInfoI = juego.add.button(juego.world.centerX - 600, 650, 'button', cambiainfoI, this, 2,1,0);
    buttonInfoI.animations.add('button');
    buttonInfoI.animations.play('button', 4, true );
    buttonInfoI.width = 100;
    buttonInfoI.height = 50;

    //Boton para volver atrás desde la info
    buttonInfoM = juego.add.button(juego.world.centerX - 600 , 25, 'button2', vuelveAMenu, this, 2,1,0);
    buttonInfoM.animations.add('button2');
    buttonInfoM.animations.play('button2', 4, true );
    buttonInfoM.width = 100;
    buttonInfoM.height = 50;

}

module.exports = menuInformacion;
},{"./menu.js":26}],28:[function(require,module,exports){
'use strict';

/* Somos plenamente conscientes de que mucho de los métodos y módulos que se encuentran al final de este archivo deberían ir
en otras clases, como el que crea un nivel o el que hace perder al jugador. Hemos decidido dejar estos módulos en esta
clase por dos razones principales. 

La primera es falta de tiempo para moverlos todo, ya que supondría una restructuración bastante importante de código
y debido a otros exámenes y asignaturas nos encontraos sin tiempo para realizarlo.

La segunda es que son módulos que tienen bastante relación con esta clase principal (como la creación de bolas de fuego) y son, por lo general
bastante cortos. Otros módulos que antes se encontraban en esta clase, como el crea_plataformas, fueron movidos a una clase distinta ya que 
tenían bastante menos relacíón con esta y eran métodos de un tamaño mucho mayor.*/


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
var auxMute;
var deadZone1; var deadZone2; var deadZones;
var fireballs; var bolaCreada = false; var bolaGreenCreada = false;
var juego;
var perder;
var powerUps; var PUcreado; var po; var inMenu;
var auxRn;
var agarrador = {};
var agarro;
var course = false; var endCourse = false; var numMonedas = 0; 
var time = 0;
var pausa; var menu; var fullS; var mute;
var fondo; var fondocourse;
var datos; var puntuation; var punt;
var pause; var drop; var back;
var style; var letras;
var menuSound; var courseSound; var gameSound;
var victory; var tempExtra;
var menuP;
var muerte;
var debug = false;


var PlayScene = {

  create: function () {

  juego = this.game;
  inMenu = false;
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

  //Fondo del nivel extra
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
  menuSound = juego.add.audio('menu');
  courseSound = juego.add.audio('course');
  gameSound = juego.add.audio('game');
  victory = juego.add.audio('victory');

  //Finalmente, creamos el nivel
  nivel = 0; //Para el nivel 1
  nuevoNivel();

  //LISTENER PARA LA PAUSA
  pausa = juego.input.keyboard.addKey(Phaser.Keyboard.P);

  pausa.onDown.add(function () {

    if(juego.paused){
      juego.paused = false
      HUD.quitaPausa();
    };
    pause.play();
  },this);


  //LISTENER PARA EL MENU 
  menu = juego.input.keyboard.addKey(Phaser.Keyboard.M);
  menuP = false;

  menu.onDown.add(function () {
    back.play();
    if(juego.paused){
      juego.paused = false;
      HUD.Pausa();        
      juego.sound.stopAll();
      menuSound.loopFull();
      menuP = true;
      inMenu = true;
      juego.state.start('menu');
    }
  },this);

  //LISTENER PARA MUTE
  mute = juego.input.keyboard.addKey(Phaser.Keyboard.S);

  mute.onDown.add(function () { 
    if (juego.paused)
      juego.sound.mute = !juego.sound.mute;;
  },this);

  juego.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT; //Para que la pantalla completa se ajuste a los bordes

  //LISTENER PARA PANTALLA COMPLETA
  fullS = juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  fullS.onDown.add(function () {

    if(juego.paused){

        HUD.fullscreen()}
      
  },this);

    style = { font: "bold 32px Arial", fill: "#F7FE2E", boundsAlignH: "center", boundsAlignV: "middle"}; //Tipogragía para la puntiación
    letras = juego.add.text(300, 20, "PUNTUACION:  " + puntos.daPuntos(), style);  //Puntuación	
 },

  update: function (){

    //Para el menú de pausa
    if(pausa.isDown && !juego.paused){
      auxMute = juego.sound.mute; //necesario guardar en una variable auxiliar el estado del muteo porque el pausa lo cambia
      juego.paused = true;
      HUD.Pausa();
      juego.sound.mute = auxMute;
    }
    
    //Actualizamos la puntuación a cada vuelta de bucle ya que hay varias cosas que afectan a la misma
    letras.setText("PUNTUACIÓN:  " + puntos.daPuntos());

    //////COLISIONES\\\\\\\

    //Para que choque el personaje con las plataformas
    juego.physics.arcade.collide(jugador, platforms, cols.collisionHandlerJug);

    //Si el jugador está orinando, hay que detectar las colisiones del pis con las plataformas y los enemigos
    if(jugador.orinando){
      juego.physics.arcade.collide(jugador.pis, platforms, cols.collisionHandlerPis);
      juego.physics.arcade.collide(enem.devuelveGrupo(), jugador.pis, cols.collisionHandlerEnemPis);
    }

    //Si el jugador está reviviendo, hay que ver sus colisiones con las plataformas de comienzo de nivel
    if(jugador.revive)
    	juego.physics.arcade.collide(jugador, platformsIni);

    //Colisiones de los enemigos con las plataformas
    juego.physics.arcade.collide(enem.devuelveGrupo(), platforms, cols.collisionHandlerPlat);

    //Si el jugador no está ni agarrado ni atacando, se comprueba si choca con algún enemigo
    if(!jugador.agarrado && !jugador.atacando){
        	juego.physics.arcade.overlap(enem.devuelveGrupo(), jugador, cols.collisionHandlerEnem);
    }
    //Bolas de fuego con el jugador
    juego.physics.arcade.overlap(fireballs, jugador, cols.collisionHandlerFireBall);

    //Enemigos con las deadZones y bolas de fuego con las deadZones
    juego.physics.arcade.overlap(enem.devuelveGrupo(), deadZone1, cols.DeadZone1);
    juego.physics.arcade.overlap(enem.devuelveGrupo(), deadZone2, cols.DeadZone2);
    juego.physics.arcade.overlap(fireballs, deadZones, cols.DeadZoneF);

    //Colisiones de los PU con las plataformas y el jugador
    juego.physics.arcade.collide(powerUps, platforms);
    juego.physics.arcade.overlap(powerUps, jugador, cols.collisionHandlerPower); 

    //Colisiones de las monedas con el jugador
    juego.physics.arcade.overlap(monedas, jugador, cols.collisionHandlerMonedas);   

      //Si en cada nivel, los enemigos que hay en pantalla son menor de los que debería haber y quedan enemigos en total en el nivel, se creará uno nuevo
    	if(enemigosEnPantalla < enemigosPorNivel && numeroEnemigos > 0 && enemigosEnPantalla != numeroEnemigos){
    		enem.creaEnemigoRandom(juego, nivel, auxRn, jugador);
    		auxRn = !auxRn; //Esta variable auxiliar es para determinar si el enemigo ha salido en la parte izquierda o derecha de la pantalla
    		enemigosEnPantalla++; //Tras crearlo, aumentaremos el número de enemigos que tenemos en la pantalla
    	}

      //Si el número de enemigos es 0, es que hemos completado el nivel, por lo que pasamos al siguiente
    	if(numeroEnemigos <= 0 && !course){
    		jugador.kill();
    		nuevoNivel();
    	}

      //Creamos las bolas de fuego si estamos en el nivel 7 o superior y se quedan 2 o 4 enemigos en el nivel, como aviso de final de nivel
    	if (nivel >= 7 && numeroEnemigos === 2 && !bolaCreada && !course)
    		creaFireballs();
      
    	if (nivel >= 7 && !bolaGreenCreada && numeroEnemigos === 4 && !course)
    		creaGreenFireballs();

      //Si en un nivel extra el número de monedas es 0, es que hemos completado el nivel extra
    	if (numMonedas <= 0 && course){
    		course = false;

        if(jugador.vidas < 8){ //Si las vidas son menores que 8, sumaremos una nueva vida al jugador
    		 jugador.vidas++;
         HUD.cambiaExtra();
         HUD.actualizaVida(jugador);
         setTimeout(function(){HUD.cambiaExtra()}, 2000); //Quitamos después de 2 segundos el mensaje de vida extra
         }
    		
    		endCourse = false;
    	}

      //Si el tiempo es menor que 0, es que no hemos completado el nivel extra
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
        //eliminamos todas las monedas si no estamos en un nivel extra
    		for (var i = 0 ; i < monedas.children.length; i++){
  				monedas.children[i].kill();}
    	}

  },

  render: function(){
    //Renders auxiliares para el debug
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

//Función para quitar el menú de pausa
function vuelvePausa(event){

  if(game.paused)
   game.paused = false;
}

var puntos = {}
//metodo para sumar puntos
puntos.suma = function (numero) {
  punt += numero;
}

puntos.daPuntos = function(){

  return punt
}

module.exports.puntos = puntos;


//Método para crear un nuevo nivel 
function nuevoNivel(){

  nivel++; //Sumamos 1 al nivel
  puntos.suma(10); //10 puntos solamente por cambiar de nivel. Si es que somos un amor
  HUD.nivel(nivel); //Actualizamos el HUD para mostrar el nivel en el que estamos

  //Ponemos a 0 y reiniciamos todas las variables necesarias
  enemigosEnPantalla = 0; 
  bolaCreada = false;
  bolaGreenCreada = false;
  agarro = false;

 
  PU.creaPower(); //Creamos un nuevo PU

  //Si el nivel es mayor que 7, el número de enemigos por nivel crece, sino será el mismo que el del nivel
  if(nivel >= 7)
	 numeroEnemigos = nivel + juego.rnd.integerInRange(0,2);
  else
	numeroEnemigos = nivel;

  //Quitamos todos los efectos que pueda tener el jugador del nivel anterior
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

  //Para el número de enemigos que salen por pantalla. A más nivel, más enemigos en pantalla
	var porcentaje = juego.rnd.integerInRange(0,100);
	
  if(nivel > 25)
    enemigosPorNivel = 4;
  else if(nivel > 10)
    enemigosPorNivel = 3;
	else if(nivel > 2)
		enemigosPorNivel = 2;
	else
		enemigosPorNivel = 1;

  //En el nivel 1, el jugador sale abajo a la izquierda. En los niveles posteriores saldrá arriba en el centro sobre unas plataformas
  if(nivel != 1){
	jugador.reset(640,0); //Posición donde revive el jugador después de ser eliminado para pasar de nivel
	jugador.revive = true;
	platformsIni.visible = true;
    setTimeout(function(){ platformsIni.visible = false; jugador.revive = false;}, 3000);
}

if (nivel % 5 === 0) //Cada 5 niveles, tenemos una pantalla de bonificacion
  {
    //Cambiamos los sonidos, el fondo y comenzamos un contador de tiempo para terminar el nivel, así como creamos las monedas
    juego.sound.stopAll();
    courseSound.loopFull();
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

  else {
    //Si no, creamos el nivel normal
    juego.sound.stopAll();
    victory.play();
    gameSound.loopFull();
    HUD.ocultaTempLevel();
  }
}


//Metodos para devolver y cambiar la cualidad de agarrador, para controlar que solo haya uno por pantalla
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


//Metodos para reducir el número total de enemigos y los que estén en pantalla
var enemigos = {}

enemigos.reduceNumero = function () {
  numeroEnemigos--;
}

enemigos.reducePantalla = function(){
  enemigosEnPantalla--;
}

module.exports.enemigos = enemigos;


//Módulo para cuando el jugador se quede sin vidas y pierda la partida
var perd = {};

perd.Perder = function(){

	puntuation = puntos.daPuntos(); //guardamos la puntuacion que ha sacado el jugador

	perder.visible = true; //Texto de perder en visible

    setTimeout(function(){
      var nombre = "abcdefsgufjslh" //Nombre aleatorio con más de 12 caracteres para forzar la entrada al bucle
      var cont = 0;

      while(nombre.length > 12){
        if(cont < 3) //Avisamos, de buena manera, que el tamaño del nombre tiene que ser menor de 12
    	nombre = prompt("Introduce tu nombre para el ranking: \n (no introduzcas nada si no quieres guardar la puntuación,\nMáximo 12 caracteres <3)");
       else //Si hay alguien muy cabezota se lo recordamos después de tres intentos (una bromita hombre, no va a ser todo serio)
        nombre = prompt("Introduce tu nombre para el ranking: \n (¡MÁXIMO 12 CARACTERES!)");
      cont++;
    } 

    if(nombre != undefined && nombre != null) //Si el nombre no es vacío, básicamente. Hay métodos de javascript que detectan si el 
      //nombre está compuesto por espacios o vacío ('   '), pero no he podido hacer que funcionen
      
    if  (nombre.length != 0){ //Otra comprobación para ver que el nombre no es vacío
        
		datos = [nombre, puntuation.toString(), nivel.toString()]; //asignamos al array de datos las variables que hemos conseguido en la partida, 
    //y las parseamos a string ya que al hacer la petición necesitamos un string

		if(puntuation <= 0) //Comprobamos que la puntuación de la persona no es 0 ya que puede ser hasta negativa por los PowerUps
			alert("¡" + nombre + " Tu puntuación es 0!"  +"\n" + "(Mejor vuelve a intentarlo, que queda feo poner un 0)");
    
    	else
   		Put.mandaDatos(datos);} //Mandamos los datos al servidor
        }, 3000);

    //Si el nombre es vacío, nulo, blanco... o simplemente se le ha dado al botón de cancelar, 
    //pasamos directamente al menú principal
    //Cabe destacar que este temporizador de 6 segundos ha estado corriendo mientras el prompt estaba activo, por eso nos llevará casi
    //directamente al menú principal, sin esperar 6 segundos
    setTimeout(function(){ 
      juego.sound.stopAll();
      menuSound.loopFull();
      inMenu = true;
    juego.state.start('menu');
  }, 6000);
}

module.exports.perd = perd;

//Para los niveles extra, actualizaremos cada segundo el contador decreciente de tiempo
function actualizaCont(tiempo){

    time = tiempo;
     HUD.tempLevel(tiempo); 
     tiempo--;
     if(time >= 0 && !endCourse) {
      tempExtra = setTimeout(function(){actualizaCont(tiempo);}, 1000);
    }
}

//Este PU sirve para ser llamado desde la clase PowerUp. Creará un nuevo PU aleatorio
var PUcreado;
var PU = {};

PU.creaPower = function() {
			var aleatorio = juego.rnd.integerInRange(0, 3);
    		 
    		if(!PU.devuelve()){ //Si el PU no ha sido ya creado(es decir, si no hay uno ya en escena).
    			PU.creado();
setTimeout(function(){ 

			if(aleatorio === 0) po = new ener(juego,'energetica');

  			else if(aleatorio === 1) po = new alc(juego, 'alcohol');

  			else if(aleatorio === 2) po = new wat(juego, 'agua');

  			else if(aleatorio === 3) po = new prot(juego, 'proteinas');

        powerUps.add(po);
        drop.play();

        if(menuP === false)
          po.temp = setTimeout(function(){PU.eliminado(po); }, 6000); //Destruiremos el PU a los 6 segundos para crear uno nuevo

		}, 2000);
	 }
    		
}

PU.creado = function () {
  PUcreado = true;
}

PU.devuelve = function(){

  return PUcreado;
}

//Cuando eliminamos el PU, creamos uno nuevo si no estamos en el menú Principal
PU.eliminado = function(po){

  clearTimeout(po.temp); //Limpiaremos el temporizador
  po.kill(); //Destruiremos el PU
  powerUps.remove(po); //Lo eliminaremos del grupo
  PUcreado = false;
  if (!inMenu)
    PU.creaPower(); //Crearemos uno nuevo
}

module.exports.PU = PU;


//Diferentes estados en los que se puede encontrar el jugador. 
//esta es una de las clases de las que hablabamos en el "header" de esta clase. Debería ir en la clase player y somos conscientes de ello,
//pero al suponer una reestructuración bastante importante del código, no tener tiempo para ello y estar bastante relacionada con la escena, 
//hemos decidido dejarla aquí. Con más tiempo sería cambiada sin dificultad aparente a la clase player.
var estadosJugador = {};
  
  //Cuando el jugador muere
  estadosJugador.jugadorMuerte = function(jug){

        muerte.play(); //Sonido de muerte
        jugador.kill(); //eliminamos al jugador
        jugador.vidas--;  //le restamos una vida
        HUD.actualizaVida(jugador); //Actualizamos su HUD

        //Restauramos sus atributos
        jugador.vel = jugador.origVel;
        jugador.borracho = false;
        jugador.invencible = false;
        jugador.orinando = false;
        HUD.noBorracho();
        jugador.orina = 0;
        HUD.cambiaPis(jugador.orina);

        if(jugador.vidas > 0) //Si su vida es mayor que 0, revivimos al jugador con métodos ya vistos, si no perderá la partida
            setTimeout(function(){ estadosJugador.revive(jug); platformsIni.visible = true;}, 1000);
          else 
            {
              perd.Perder();
            }

  }

   estadosJugador.revive = function(jug, game){
    
    //Acabamos de eliminar al jugador y lo restablecemos en el centro de la pantalla arriba
    //Eliminamos las plataformas auxiliares de arriba a los 2 segundos
    jugador.muerto = true;
    jugador.revive = true;
    jugador.reset(640,0); 
    setTimeout(function(){ jugador.revive = false; platformsIni.visible = false; jugador.muerto = false;}, 2000);

   }

  module.exports.estadosJugador = estadosJugador;


//Creamos las bolas de fuego, tanto las rojas como las verdes
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

  //Creamos las deadZones para los personajes como para las bolas de fuego
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

  //Metodos para contabilizar las monedas
  var stateMoneda = {};
  stateMoneda.reduceMoneda = function(){
  	numMonedas--;
  }
  module.exports.stateMoneda = stateMoneda;

  function endedCourse(){
  	endCourse=true;
  }

module.exports = PlayScene;

},{"./HUD":1,"./class_alcohol":4,"./class_batidoDeProteinas":5,"./class_bebidaEnergetica":6,"./class_environment":9,"./class_fireball":10,"./class_greenFireBall":12,"./class_movibl":13,"./class_object":14,"./class_player":16,"./class_water":19,"./crea_Enemigos":20,"./crea_Monedas":21,"./crea_Plataformas":22,"./handleCollisions":23,"./puntuaciones":29}],29:[function(require,module,exports){
'use strict';

var men = require('./menu.js');
var handle = require('./handleRequest.js');

var juego;
var respuesta;
var buttonInfoM;
var back;

var puntuaciones = {

	create: function(){
	 juego = this.game;
  	 juego.add.sprite(0,0,'Punct');

  	//Boton para volver atrás desde la puntuaciones
    buttonInfoM = juego.add.button(juego.world.centerX - 600 , 25, 'button2', puntuaciones.vuelveAMenu, this, 2,1,0);
    buttonInfoM.animations.add('button2');
    buttonInfoM.animations.play('button2', 4, true );
    buttonInfoM.width = 100;
    buttonInfoM.height = 50;

    back = juego.add.audio('back');

    puntuaciones.ActualizaTabla(); //Actualizamos la tabla de puntuaciones nada más entrar
	}
}

puntuaciones.ActualizaTabla = function () {
	
	handle.Peticion(juego, true, false, null); //Llamamos a handle rquest con los parámetros de Pintar = true, MandaInfo = False y Datos = null
}

puntuaciones.mandaDatos = function(datos){
  
  //Este método será llamado desde fuera para mandar los datos al servidor a través de handleRequest
  handle.Peticion(juego, false, true, datos); //Lo llamaremos con Pintar = false, mandaInfo = true y Datos = datos
}

//Para volver al menú principal
puntuaciones.vuelveAMenu = function(){
  back.play();
	juego.state.start('menu');
}

module.exports = puntuaciones;
},{"./handleRequest.js":24,"./menu.js":26}]},{},[25]);
