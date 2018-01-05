(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var HUD = {};
var vida1; var vida2; var vida3;
var punct1; var punct2; var nivel;
var pisDentro; var pisFuera;
var ebrio;
var Temp1; var Temp2; 
var AG; 
var PA;
var juego;
var fullscreen;

HUD.create = function(game){

	juego = game;
	//VidasPlayer
	
	vida1 =  game.add.sprite(10,10,'vidas');
	vida2 = game.add.sprite(74, 10, 'vidas');
	vida3 = game.add.sprite(138, 10, 'vidas');

	//Nivel

 	nivel = game.add.sprite(200,100, 'nivel');
 	nivel.width = 100;
 	nivel.height = 50;

	punct1 = game.add.sprite(300, 80, 'numeros');
 	punct1.width = 50;
 	punct1.height = 80;

 	punct2 = game.add.sprite(350,80, 'numeros');
 	punct2.width = 50;
 	punct2.height = 80;

 	//temporizador para los niveles extra
 	Temp1 = game.add.sprite(300, 80, 'numeros');
 	Temp1.width = 50;
 	Temp1.height = 80;
 	Temp1.visible = false;
 	Temp1.x = 600; Temp1.y = 20;

 	Temp2 = game.add.sprite(350,80, 'numeros');
 	Temp2.width = 50;
 	Temp2.height = 80;
 	Temp2.visible = false;
	Temp2.x = 645; Temp2.y = 20;


 	//Medidor de Pis

 	pisDentro = game.add.sprite(950,30, 'interiorPis');
 	pisDentro.height = 20;
 	pisDentro.width = 0;

 	pisFuera = game.add.sprite(950,30, 'exteriorPis');
 	pisFuera.height = 20;
 	pisFuera.width = 300; 	

 	//Jugador ebrio
 	 ebrio = game.add.sprite(0 ,0,'borracho');
 	 ebrio.visible = false;

 	 ebrio.animations.add('drunk', [0,1,2,3], 6, true);
 	 ebrio.play('drunk');

 	 //Medidor de agarre
 	 AG = game.add.sprite(950, 100, 'interiorPis');
 	 AG.height = 20;
 	 AG.width = 0;
 	 AG.visible = false;

 	 //Pausa
 	 PA = game.add.sprite(480,40, 'Pausa');
 	 PA.visible = false;

}

HUD.actualizaVida = function(jug){

	if(jug.vidas >= 3){
		vida1.visible = true;
		vida2.visible = true;
		vida3.visible = true;
	}

	else if(jug.vidas === 2){
		vida1.visible = true;
		vida2.visible = true;
		vida3.visible = false;
	}

	else if(jug.vidas === 1){
		vida1.visible = true;
		vida2.visible = false;
		vida3.visible = false;
	}	

	else {
		vida1.visible = false;
		vida2.visible = false;
		vida3.visible = false;
	}
}

HUD.nivel = function(lvl){

  punct1.visible = true; punct2.visible = true; nivel.visible = true;

  punct1.frame = Math.floor(lvl / 10);

  punct2.frame = lvl % 10;

  setTimeout(function(){punct1.visible = false; punct2.visible = false; nivel.visible = false;}, 3000);
}

HUD.tempLevel = function(temp){


 Temp1.frame = Math.floor(temp / 10);

 Temp2.frame = temp % 10;

}

HUD.ocultaTempLevel = function(){

	 Temp1.visible = false; Temp2.visible = false;

}

HUD.muestraTempLevel = function(){

	Temp1.visible = true; Temp2.visible = true;
}

HUD.cambiaPis = function(pis){

	 	pisDentro.width = pis * 30;
}

HUD.borracho = function(){

	 ebrio.visible = true;
}

HUD.noBorracho = function(){

	ebrio.visible = false;
}

HUD.cambiaGrabber = function(llega){

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

juego.world.bringToTop(PA);
PA.visible = true;

}

HUD.quitaPausa = function(){

	PA.visible = false;
}

HUD.fullscreen = function(){

    if (juego.scale.isFullScreen)
    {
        juego.scale.stopFullScreen();
    }
    else
    {
        juego.scale.startFullScreen(false);
    }
}

module.exports = HUD;
},{}],2:[function(require,module,exports){
"use strict";

var enemy = require('./class_enemy');
var escena = require('./play_scene');
var HUD = require('./HUD');

var agarrador =  function(game, entradax, entraday, entradasprite, jugador, grabber){
  enemy.call(this, game, entradax, entraday, entradasprite, 1, 1, grabber);

  this.agarrando = false;
  this.medAgarro = 50;
  this.jug = jugador;
  this.juego = game;
  this.espacio = this.juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  this.reescala_imagen(1.5,1.5);
  this.aleatorio = 0;
    this.animations.add('mueve',[0,1,2,3,4,5,6,7], 3, true);
  this.animations.play('mueve');

}

agarrador.prototype = Object.create(enemy.prototype);
agarrador.prototype.constructor = agarrador;

agarrador.prototype.update = function(){
	if(this.golpeado) this.stunt = true;
	//this.juego.debug.body(this);
	//this.juego.debug.text('POSICION: ' + this.x + 'Y: ' + this.y, this.x , this.y);
	//this.juego.debug.text('MEDIDOR AGARRADO: ' + this.medAgarro, 500, 70);
	//this.juego.debug.text('JUGADOR AGARRADO: ' + this.jug.agarrado, 500, 90);

	if(this.jug.agarrado === true && this.espacio.isDown && this.espacio.downDuration(50)){
		this.medAgarro += 10 / 4;
		HUD.cambiaGrabber(this.medAgarro);

	}
	
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
	var ag = this; //Cagon el this de las narices la de tiempo que he estado para esta bobada
	ag.medAgarro = 50;
	ag.agarrando = true;
	jug.agarrado = true;
	HUD.GrabberVisible(this.x, this.y);
	
	agarrador.prototype.cambiaAgarre(ag, jug);
}

agarrador.prototype.cambiaAgarre = function(ag, jug){

	HUD.cambiaGrabber(ag.medAgarro);
	ag.medAgarro -= 10;
	if(ag.jug.agarrado)
		setTimeout(function(){agarrador.prototype.cambiaAgarre(ag, jug);}, 350);

}


module.exports = agarrador;
},{"./HUD":1,"./class_enemy":7,"./play_scene":27}],3:[function(require,module,exports){
var PU = require('./class_powerUp');
var HUD = require('./HUD');	

var alcohol = function(game, entradasprite){

	this.orina = 5;
	PU.call(this, game, entradasprite, this.orina);
	this.reescala_imagen(0.9,0.9);
	
}

alcohol.prototype = Object.create(PU.prototype);
alcohol.prototype.constructor = alcohol;

alcohol.prototype.efecto = function(jug){
	jug.borracho = true;
	HUD.borracho();
	setTimeout(function(){jug.borracho = false; HUD.noBorracho();}, 5000);
}

module.exports = alcohol;
},{"./HUD":1,"./class_powerUp":16}],4:[function(require,module,exports){
var PU = require('./class_powerUp');	

var batidoDeProteinas = function(game, entradasprite){

	this.orina = 3;
	PU.call(this, game, entradasprite, this.orina);
	this.reescala_imagen(0.9,0.9);	
}

batidoDeProteinas.prototype = Object.create(PU.prototype);
batidoDeProteinas.prototype.constructor = batidoDeProteinas;

batidoDeProteinas.prototype.efecto = function(jug){
	jug.invencible = true;
	jug.borracho = false;
	setTimeout(function(){jug.invencible = false}, 5000);

}

module.exports = batidoDeProteinas;
},{"./class_powerUp":16}],5:[function(require,module,exports){
var PU = require('./class_powerUp');	

var bebidaEnergetica = function(game, entradasprite){

	this.orina = 3;
	PU.call(this, game, entradasprite, this.orina);
	this.reescala_imagen(0.07,0.07);
	
}

bebidaEnergetica.prototype = Object.create(PU.prototype);
bebidaEnergetica.prototype.constructor = bebidaEnergetica;

bebidaEnergetica.prototype.efecto = function(jug){
	jug.corriendo = true;
	setTimeout(function(){jug.corriendo = false}, 5000);

}

module.exports = bebidaEnergetica;
},{"./class_powerUp":16}],6:[function(require,module,exports){
"use strict";

var enemy = require('./class_enemy');

var crab =  function(game, entradax, entraday, entradasprite, dir, velx, grabber){
  enemy.call(this, game, entradax, entraday, entradasprite, dir, velx, grabber);
  this.enfado = false;
  this.origVel = velx;
  this.reescala_imagen(0.1,0.1);
}
crab.prototype = Object.create(enemy.prototype);
crab.prototype.constructor = crab;

crab.prototype.update = function(){
	if (this.golpeado && !this.enfado){
		this.enfado = true;
		this.golpeado = false;
	}
	else if (this.golpeado && this.enfado){
		this.stunt = true;
	}
	else
		this.stunt = false;

	if (this.enfado && !this.stunt)
		this.actualiza_pos(this.velocidad * 1.25 * this.cont);
	else if (!this.enfado && !this.stunt)
		this.actualiza_pos(this.velocidad * this.cont);
	else
		this.actualiza_pos(0);

	if( this.body.velocity.x != 0 ||  this.body.velocity.y != 0){
         this.cambia_pos(this.x, this.y);
    }
	this.velocidad = this.origVel;
}

module.exports = crab;
},{"./class_enemy":7}],7:[function(require,module,exports){
'use strict';

var movible = require('./class_movibl');	

var enemigo = function(game, entradax, entraday, entradasprite, dir, velx, grabber){
	movible.call(this, game, entradax, entraday, entradasprite, dir, velx);
	this.juego = game;
	this.create();
	this.velocidad = velx;
	this.stunt = false;
	this.golpeado = false;
	this.cont = 1;
	this.grabber = grabber;
}

enemigo.prototype = Object.create(movible.prototype);
enemigo.prototype.constructor = enemigo;

enemigo.prototype.create = function (){
	this.juego.physics.arcade.enable(this);
 	this.body.gravity.y = 4000;
}

enemigo.prototype.cambia_vel = function (vl){
	this.velocidad = vl;
}
module.exports = enemigo;


},{"./class_movibl":12}],8:[function(require,module,exports){
//clase para los elementos del entorno

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
},{"./class_object":13}],9:[function(require,module,exports){
'use strict';

var movible = require('./class_movibl');	

var fireball = function(game, entradax, entraday, entradasprite, dir, velx){
	movible.call(this, game, entradax, entraday, entradasprite, dir, velx);
	this.juego = game;
	this.sale = false;
	this.escala = 0.05;
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
}

fireball.prototype.update = function (){
	if (this.sale){
		this.actualiza_pos(this.velocidad);
	}
}

module.exports = fireball;
},{"./class_movibl":12}],10:[function(require,module,exports){
"use strict";

var enemigo = require('./class_enemy');

var fly =  function(game, entradax, entraday, entradasprite, dir, velx, grabber){
  enemigo.call(this, game, entradax, entraday, entradasprite, dir, velx, grabber);
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
},{"./class_enemy":7}],11:[function(require,module,exports){
'use strict';

var fireball = require('./class_fireball');	

var greenfireball = function(game, entradax, entraday, entradasprite, dir, velx, vely){
	fireball.call(this, game, entradax, entraday, entradasprite, dir, velx);
	this.juego = game;
	this.velocidadY = vely;
	this.cont = 0;
	this.reescala_imagen(0.075, 0.075);
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
},{"./class_fireball":9}],12:[function(require,module,exports){
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
	this.direction = this.direction * (-1);
	this.scale.x = this.scale.x * this.direction;
}

module.exports = movibl;
},{"./class_object":13}],13:[function(require,module,exports){
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

GO.prototype.reescala_imagen = function (x, y){
  this.scale.setTo(x,y);
};

module.exports = GO;
},{}],14:[function(require,module,exports){
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


	this.temporizador.loop(500, vuelve, this);
  	this.temporizador.start();
}
	
}

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
},{"./class_environment":8}],15:[function(require,module,exports){
'use strict';

var movible = require('./class_movibl');
var HUD = require('./HUD');	
var cursors;
var jumpButton;
var escudo;
var daVida;
var facingRight;

var Protagonista = function(game, entradax, entraday, entradasprite, dir, velx, vidas){
	movible.call(this, game, entradax, entraday, entradasprite, dir, velx);
	this.vidas = vidas;
	this.juego = game;
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
  this.pis;
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
  this.animations.add('walk', [0,1,2,3]);
  this.animations.add('stay', [4,5], 6, true);
  this.animations.add('jump', [6,7,8,9,10,11,12,13,14]);
  this.animations.add('peeing', [15,16,17,18,19,20,21,22,23,24,25]);
  this.animations.play('stay');
  escudo = this.game.add.sprite(this.x ,this.y,'escudo');
  escudo.visible = false;
  escudo.width = 250;
  escudo.height = 250;
  //this.body.setSize(20,60, 20, 0);
  this.pis = this.game.add.sprite(this.x, this.y, 'enemigo');
  this.juego.physics.arcade.enable(this.pis);
  this.pis.visible = false;
}

Protagonista.prototype.update = function (){

  //Si no hay inputs consideramos que el jugador está parado
	 this.body.velocity.x = 0;
   
	 if (this.corriendo)
	 	this.vel = 2*this.vel;

	 if (this.borracho){
	 	this.vel = -this.vel;
   }

   if(this.invencible){
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

  //this.orina = 10;
  //this.juego.debug.body(this.pis);
	/* this.juego.debug.text('VELOCIDAD: ' + this.vel, 32, 70);
   this.juego.debug.text('SALTO: ' + this.saltando, 230, 70);
   this.juego.debug.text('ORINANDO: ' + this.orinando, 500, 50);*/
   //this.juego.debug.text('VIDA: ' + this.vidas, 500, 50);
   //this.invencible = true;
  // this.orina = 10;
    if (cursors.left.isDown)
    {
        facingRight = false;
        this.body.velocity.x = -this.vel;
        if(!this.borracho)
          this.scale.x = -this.escala;
        else this.scale.x = this.escala;
        if (this.body.touching.down && !this.orinando)
           this.animations.play('walk', 6, true);
         if(this.orinando)
           this.pis.body.setSize(10,60, this.x - 270, this. y -620);
    }
    else if (cursors.right.isDown)
    {
        facingRight = true;
        this.body.velocity.x = this.vel;
        if(!this.borracho)
        this.scale.x = this.escala;
        else this.scale.x = -this.escala;
        if (this.body.touching.down && !this.orinando)
           this.animations.play('walk', 6, true);
         if(this.orinando)
           this.pis.body.setSize(10,60, this.x - 150, this. y -620);

    }

    this.vel = this.origVel - (this.orina * 10);
    if (jumpButton.isDown && !this.agarrado && !this.orinando && (this.body.onFloor() 
      || this.body.touching.down))

    {

        this.body.velocity.y = -1000;
    }

    if(!this.body.touching.down) //Si no toca el suelo, está saltando. Servirá para hacer pis
             this.saltando = true;
    else this.saltando = false;

    if(cursors.up.isDown && !this.saltando  && this.orina >= 10)
        {
          this.animations.play('peeing', 6, false);
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

       if (!this.body.touching.down)
        this.animations.play('jump', 10 , true);

       else if (this.body.velocity.x === 0 && !this.orinando)
       	this.animations.play('stay');
}

Protagonista.prototype.incrementaOrina = function (orina){

  this.orina = this.orina + orina;
  if(this.orina>10)
    this.orina = 10; 
  HUD.cambiaPis(this.orina);

}

module.exports = Protagonista;
},{"./HUD":1,"./class_movibl":12}],16:[function(require,module,exports){

"use strict";

var GO = require('./class_object');
var escena = require('./play_scene');
//module.Modulo.creaPower

var powerUp = function(game, entradasprite, orina){
	this.Rx = game.rnd.integerInRange(0, 1200);
 	this.Ry = game.rnd.integerInRange(0, 500);
 	this.timer;
 	this.llama();
 	
  GO.call(this, game, this.Rx, this.Ry, entradasprite);
  this.orina = orina;
  game.physics.arcade.enable(this);
  this.body.gravity.y = 4000;
}

powerUp.prototype = Object.create(GO.prototype);
powerUp.prototype.constructor = powerUp;


powerUp.prototype.llama = function(){
	var objeto = this;
	this.timer = setTimeout(function(){objeto.kill(); escena.PU.creaPower(); //Aqui tenemos que llamar a crear un nuevo PU
	}, 6000);

}

powerUp.prototype.limpia = function(){

	clearTimeout(this.timer);
}

module.exports = powerUp;
},{"./class_object":13,"./play_scene":27}],17:[function(require,module,exports){
"use strict";

var enemigo = require('./class_enemy');

var tortuguita =  function(game, entradax, entraday, entradasprite, dir, velx, grabber){
  enemigo.call(this, game, entradax, entraday, entradasprite, dir, velx, grabber);
  
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
},{"./class_enemy":7}],18:[function(require,module,exports){
var PU = require('./class_powerUp');	

var agua = function(game, entradasprite){

	this.orina = 2;
	PU.call(this, game, entradasprite, this.orina);
	this.reescala_imagen(0.1,0.1);
	
}
	
agua.prototype = Object.create(PU.prototype);
agua.prototype.constructor = agua;

agua.prototype.efecto = function(jug){
	console.log('El agua no hace nada, pringado.');
}


module.exports = agua;
},{"./class_powerUp":16}],19:[function(require,module,exports){
'use strict'

var tort = require('./class_turtle');
var crab = require('./class_crab');
var fly = require('./class_fly');
var agarra = require('./class_agarrador');
var escena = require('./play_scene');

	
var enemigoRandom = {};
var enemies;

enemigoRandom.creaGrupo = function(juego){

  enemies = juego.add.physicsGroup();
}

enemigoRandom.creaEnemigoRandom = function(juego, nivel, auxRn, jugador) {

    //Vamos a esperar x tiempo antes de crear un nuevo enemigo para que no se generen 2 en el mismo punto
    setTimeout(function(){

    var aleatorioEnem = juego.rnd.integerInRange(0,3);

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

    else if(nivel >= 7) aleatorioEnem = juego.rnd.integerInRange(0,3);
      
    var x = 0;
    var y = 0;
    var xFly;
    var yFly;
    var xAG;
    var yAG;

    y = juego.rnd.integerInRange(0, 600);
    var ctrl = juego.rnd.integerInRange(0,2);

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

    enemies.add(enemigo);

    if (x >= 950)
      enemigo.cambia_dir();

    enemigo.velocidad = nivel * 3 + enemigo.velocidad; //Cada nivel los enemigos irán más rápido

     }, 1000);         
} 

  enemigoRandom.devuelveGrupo = function(){

    return enemies;
  }


module.exports = enemigoRandom;
},{"./class_agarrador":2,"./class_crab":6,"./class_fly":10,"./class_turtle":17,"./play_scene":27}],20:[function(require,module,exports){
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

  while (n > 0){
    var aux = new object(juego, 0, 0, 'coin');
    aux.reescala_imagen(0.4, 0.4);
    if(n>=7)
      aux.cambia_pos(250*((numMonedas+1)-n),600);
    else if(n>=3)
      aux.cambia_pos(250*((numMonedas-3)-n),250);
    else
      aux.cambia_pos(400*(n),50);
    monedas.add(aux);

    n--;
  }

  return monedas;
}

module.exports = creaMonedas;
},{"./class_object":13}],21:[function(require,module,exports){
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

    if(level >= 6 && !superior && !ini){
      var aleatorio = juego.rnd.integerInRange(0,100);
    

        if (aleatorio <= 95){

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
},{"./class_platform":14}],22:[function(require,module,exports){
'use strict'

var escena = require('./play_scene');
var plat = require('./crea_Plataformas');
var HUD = require('./HUD');
var colisiones = {};
var enemigosEnPantalla;
var juego ;

colisiones.create = function(game){

  juego = game;

}

colisiones.collisionHandlerPower = function(jug, pw){

	jug.incrementaOrina(pw.orina);
	pw.efecto(jug);
	pw.limpia();
	pw.kill();
	escena.PU.creaPower(); 

}

colisiones.collisionHandlerFireBall = function(jug, fb){
	if (jug.invencible){
		fb.kill();
		jug.invencible = false;
	}

	else{
		escena.estadosJugador.jugadorMuerte();
	}

}

colisiones.collisionHandlerMonedas = function(jug, mon){
  mon.kill();
  escena.stateMoneda.reduceMoneda();

}

colisiones.collisionHandlerEnemPis = function(jug, enem){

    if(enem.grabber){
      //Aqui es donde peta el agarrador
      escena.agarrador.False();      
    }

    enem.kill();
    escena.enemigos.reducePantalla();
    escena.enemigos.reduceNumero();
}

colisiones.collisionHandlerEnem = function(jug, enem){
	if(!enem.stunt){
		if(!jug.invencible){

			if(enem.agarra != undefined && !jug.agarrado)
				  enem.agarra(jug);

			else if(!jug.agarrado) escena.estadosJugador.jugadorMuerte();

  		}
  			else if (jug.invencible) {

          if(enem.grabber){
            escena.agarrador.False();      
        }
  				enem.kill();
  				escena.enemigos.reducePantalla();
  				escena.enemigos.reduceNumero();
  				jug.invencible = false;
  			}

      }
  else {
    if(enem.grabber){
      //Aqui es donde peta el agarrador
      escena.agarrador.False();      
    }

  	enem.kill();
  	escena.enemigos.reducePantalla();
  	escena.enemigos.reduceNumero();
  }
  }

  colisiones.collisionHandlerJug = function(jug, plat){
  	if(jug.body.touching.up){
   		plat.cambia_tocada();
   		plat.jump();
  	}

  	if(plat.fuego &&  !jug.body.touching.up && !jug.invencible){
      escena.estadosJugador.jugadorMuerte();
  		
    }

    else if (plat.hielo){
      if(!jug.corriendo)
        jug.corriendo = true;
      setTimeout(function(){jug.corriendo = false;}, 300);
    }

    if(jug.orinando && plat.fuego){
       plat.fuego = false;
           plat.cambiaSprite();
    }

  }

  colisiones.collisionHandlerPlat = function(enem, plat){
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

  colisiones.collisionHandlerPis = function(jug, plat){

       if(plat.fuego){
           plat.fuego = false;
           plat.cambiaSprite();
       }
  }

  module.exports = colisiones;

},{"./HUD":1,"./crea_Plataformas":21,"./play_scene":27}],23:[function(require,module,exports){
'use strict';


var handleRequest = {};
	
handleRequest.Peticion = function(juego, pinta, mandaDatos){
 //Script sacado de la recopilación de varios sitios web. Con varios quiero decir MUCHISIMO.
  var httpRequest;
  //var httpRequest2;
 // if(!mandaDatos)
  makeRequest();
 // else if(mandaDatos)
   // makeRequest2();

  function makeRequest() {
  	//console.log('Mensaje Enviado');
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert('No se puede crear la instancia.');
      return false;
    }
    var url = 'https://jacord01.github.io/Xtreme/Xtreme-SunBlind/src/scores.json';
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('GET', url);

    httpRequest.send();

  }

  /* function makeRequest2() {
    //console.log('Mensaje Enviado');
    httpRequest2 = new XMLHttpRequest();

    if (!httpRequest2) {
      alert('No se puede crear la instancia.');
      return false;
    }
    var url = 'https://jacord01.github.io/Xtreme/Xtreme-SunBlind/src/scores.json';
    httpRequest2.open('POST', url);
    httpRequest2.setRequestHeader("Content-type", "application/json");
    httpRequest2.onreadystatechange = alertContents2;
    httpRequest2.send();
  }*/

  function alertContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {

        //console.log('Ha llegado la respuesta.');
    var respuesta = JSON.parse(httpRequest.response);
    if(pinta){
  	var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

    //  The Text is positioned at 0, 100

    for(var i = 0; i < 10; i++){
    	juego.add.text(300, 100 + i * 50, "NOMBRE:  " + respuesta.score[i].nombre, style);
    	juego.add.text(700, 100 + i * 50, "PUNTUACION:  " + respuesta.score[i].punct, style);
			}
		}
  		/*console.log("Visitas a la pagina: " + respuesta.Visitas)
        console.log(respuesta.score[1].nombre);
        console.log(respuesta.score[1].punct);*/

      } else {
        alert('Problema con la petición.');
      }
    }
  }

   /* function alertContents2() {
      console.log('Aqui llegamos');
    if (httpRequest2.readyState === XMLHttpRequest.DONE) {
      if (httpRequest2.status === 200) {

        //console.log('Ha llegado la respuesta.');
      var respuesta = JSON.parse(httpRequest2.response);
      respuesta.score[2].nombre = "PEPITO";

      console.log("llega2");
      httpRequest2.send( JSON.stringify(respuesta));
    

      } else {
        alert('Problema con la petición.');
      }
    }
  }*/
}


module.exports = handleRequest;
},{}],24:[function(require,module,exports){
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
    this.game.load.spritesheet('player', 'images/alientotal3.png', 64, 57, 26);
	  this.game.load.spritesheet('borracho', 'images/Borracho.png', 1280, 720, 4);

    //Plataformas
    this.game.load.spritesheet('plat0', 'images/plat0.png', 64, 64, 3);
    this.game.load.spritesheet('plat1', 'images/plat1.png', 64, 64, 3);
    this.game.load.spritesheet('plat2', 'images/plat2.png', 64, 64, 3);
    this.game.load.spritesheet('PCompleta', 'images/PCompleta.png', 64,64,3);

    //HUD
    this.game.load.image('perder', 'images/lose.png');
    this.game.load.spritesheet('numeros', 'images/Numeros.png', 98.1,200,10);
    this.game.load.image('nivel', 'images/Nivel.png');
    this.game.load.image('interiorPis', 'images/InteriorPis.png');
    this.game.load.image('exteriorPis', 'images/ExteriorPis.png');
    this.game.load.spritesheet('vidas', 'images/Vidas.png');
    this.game.load.image('Pausa', 'images/Menus/pause.png');

    //Enemigos
    this.game.load.spritesheet('tortuguita', 'images/tortuguita.png', 64,64, 3);
    this.game.load.spritesheet('enemigo', 'images/Grabber.png', 64,64,8);
    this.game.load.image('crabby', 'images/crab.png');
    this.game.load.spritesheet('fly', 'images/fly.png', 64,64, 6);
    this.game.load.image('fireball', 'images/fireball.png');
    this.game.load.image('greenfireball', 'images/greenfireball.png');

    //Bebidas
    this.game.load.image('energetica', 'images/Energetica.png');
    this.game.load.image('agua', 'images/agua.png');
    this.game.load.image('alcohol', 'images/alcohol.png');
    this.game.load.image('proteinas', 'images/proteinas.png');

    //Monedas
    this.game.load.image('coin', 'images/coin.png');

    //Imagenes de fondo  de menu
    this.game.load.image('Potenciadores', 'images/Menus/Potenciadores2.png');
    this.game.load.image('Enemigos', 'images/Menus/Enemigos2.png');
    this.game.load.image('Plataformas', 'images/Menus/Plataformas2.png');
    this.game.load.image('Menu', 'images/Menus/MenuPrincipal2.png');
    this.game.load.image('Pis', 'images/Menus/Pis2.png');
    this.game.load.image('Controles', 'images/Menus/Controles2.png');
    this.game.load.spritesheet('button', 'images/Menus/boton.png', 64, 64, 3);
    this.game.load.spritesheet('button2', 'images/Menus/boton2.png', 64, 64, 3);

  },

  create: function () {
    this.game.state.start('menu');
  }
};


window.onload = function () {
  var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'game');

  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('menu', Menu);
  //game.state.add('play', PlayScene);

  game.state.start('boot');
};

},{"./menu.js":25}],25:[function(require,module,exports){
'use strict';

var PlayScene = require('./play_scene.js');
var menuInformacion = require('./menuInformacion');
var Put = require('./puntuaciones');

var buttonJuego; var buttonInfo; var pantalla; var punt;
var juego;

var menu = {

  create: function () {
    juego = this.game;

    juego.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    juego.state.add('info', menuInformacion);

    juego.state.add('play', PlayScene); 

    juego.state.add('puntuation', Put);

   juego.add.sprite(0,0,'Menu');

    //Boton que nos lleva al juego
    buttonJuego = juego.add.button(juego.world.centerX - 75, 275, 'plat0', actionOnClickJuego, this, 2,1,0);
    buttonJuego.animations.add('plat0');
    buttonJuego.animations.play('plat0', 4, true );
    buttonJuego.width = 150;
    buttonJuego.height = 60;

    //Boton para el menú de información
    buttonInfo = juego.add.button(juego.world.centerX - 75, 475, 'plat0', actionOnClickInfo, this, 2,1,0);
    buttonInfo.animations.add('plat0');
    buttonInfo.animations.play('plat0', 4, true );
    buttonInfo.width = 150;
    buttonInfo.height = 60;

    //Boton para fullscreen
    pantalla = juego.add.button(juego.world.centerX - 600, 600, 'PCompleta', fullscreen, this, 2,1,0);
    pantalla.animations.add('PCompleta');
    pantalla.animations.play('PCompleta', 4, true );
    pantalla.width = 150;
    pantalla.height = 80;

    //Boton para puntuaciones
    punt = juego.add.button(juego.world.centerX - 600, 300, 'plat0', actionOnClickPunt, this, 2,1,0);
    punt.animations.add('plat0');
    punt.animations.play('plat0', 4, true );
    punt.width = 150;
    punt.height = 60;
 },
};

function actionOnClickPunt (){

    juego.state.start('puntuation');
}

function actionOnClickJuego () {

  
    juego.state.start('play');
}

function actionOnClickInfo(){

    juego.state.start('info');
}

function fullscreen(){

    if (this.game.scale.isFullScreen)
    {
        this.game.scale.stopFullScreen();
    }
    else
    {
        this.game.scale.startFullScreen(false);
    }
}



module.exports = menu; 
},{"./menuInformacion":26,"./play_scene.js":27,"./puntuaciones":28}],26:[function(require,module,exports){
'use strict';

var men = require('./menu.js');

var buttonInfoD; var buttonInfoI;
var Pot; var Enem; var Plat; var Pis; var Ctrl;
var cont;
var juego;

var menuInformacion = {

	create: function(){
	juego = this.game;
	//Cargamos las imágenes del menú
	Pot = juego.add.sprite(0,0,'Potenciadores');
    Pot.visible = false;
    Enem = juego.add.sprite(0,0,'Enemigos');
    Enem.visible = false;
    Plat = juego.add.sprite(0,0, 'Plataformas');
    Plat.visible = false;
    Pis = juego.add.sprite(0,0, 'Pis');
    Pis.visible = false;
    Ctrl = juego.add.sprite(0,0,'Controles');
    Ctrl.visible = false;

	cont = 0;

	cambiaImagenes();

	

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
    buttonInfoI = juego.add.button(juego.world.centerX - 600 , 25, 'button2', vuelveAMenu, this, 2,1,0);
    buttonInfoI.animations.add('button2');
    buttonInfoI.animations.play('button2', 4, true );
    buttonInfoI.width = 100;
    buttonInfoI.height = 50;

	}
};


function vuelveAMenu(){

	juego.state.start('menu');
}


function cambiainfoD(){

	cont++;

	if (cont >= 5)
		cont = 0;

	cambiaImagenes();
}

function cambiainfoI(){

	cont--;

	if (cont < 0)
		cont = 4;

	cambiaImagenes();
}

function cambiaImagenes(){

	if(cont === 0){
		Pot.visible = true;
		Enem.visible = false;
		Plat.visible = false;
		Pis.visible = false;
		Ctrl.visible = false;
	}
	else if (cont === 1){
		Enem.visible = true;
		Pot.visible = false;
		Plat.visible = false;
		Pis.visible = false;
		Ctrl.visible = false;
	}

	else if(cont === 2){
		Plat.visible = true;
		Pot.visible = false;
		Enem.visible = false;
		Pis.visible = false;
		Ctrl.visible = false;
	}

	else if(cont === 3){
		Plat.visible = false;
		Pot.visible = false;
		Enem.visible = false;
		Pis.visible = true;
		Ctrl.visible = false;
	}

	else if(cont === 4){
		Plat.visible = false;
		Pot.visible = false;
		Enem.visible = false;
		Pis.visible = false;
		Ctrl.visible = true;
	}


}

module.exports = menuInformacion;
},{"./menu.js":25}],27:[function(require,module,exports){
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

var jugador; var nivel;
var platforms; var platformsIni;
var enemies; var numeroEnemigos; var enemigosPorNivel; var enemigosEnPantalla;
var monedas;
var deadZone1; var deadZone2; var deadZones;
var fireballs; var bolaCreada = false; var bolaGreenCreada = false;
var juego;
var perder;
var powerUps; 
var auxRn;
var agarrador = {};
var agarro;
var course = false; var endCourse = false; var numMonedas = 0; 
var time = 0;
var pausa; var menu; var fullS;
var fondo; var fondocourse;

var PlayScene = {

  create: function () {

  juego = this.game;
  //Activamos la física del juego
  juego.physics.startSystem(Phaser.Physics.ARCADE);

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
  //fondo.animations.play('runcourse');

  //Imagen de perder
  perder = new go(juego, 500,0, 'perder');
  perder.reescala_imagen(0.2,0.2);
  perder.visible = false;


  //Creamos primer PowerUp
  powerUps = juego.add.physicsGroup();
  PU.creaPower();

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

  //Finalmente, creamos el nivel
  nivel = 0; //Para el nivel 1
  nuevoNivel();

  pausa = juego.input.keyboard.addKey(Phaser.Keyboard.P);

  pausa.onDown.add(function () {
    if(juego.paused){juego.paused = false
      HUD.quitaPausa();
      
    };
  },this);

  menu = juego.input.keyboard.addKey(Phaser.Keyboard.M);

  menu.onDown.add(function () {

    if(juego.paused){
      juego.paused = false;
      HUD.Pausa();
                for (var i = 0 ; i < powerUps.children.length; i++){
      powerUps.children[i].limpia();
      powerUps.children[i].kill();
              }
               
      juego.state.start('menu');
    }
  },this);

  juego.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

  fullS = juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

  fullS.onDown.add(function () {

    if(juego.paused){

        HUD.fullscreen()}
      
  },this);
  	
 },

  update: function (){

    //Para el menú de pausa
    if(pausa.isDown && !juego.paused){
      juego.paused = true;
      HUD.Pausa();
    }

    //Para que choque el personaje con las plataformas
    juego.physics.arcade.collide(jugador, platforms, cols.collisionHandlerJug);

    if(jugador.orinando){
      juego.physics.arcade.collide(jugador.pis, platforms, cols.collisionHandlerPis);
      juego.physics.arcade.collide(enem.devuelveGrupo(), jugador.pis, cols.collisionHandlerEnemPis);
    }

    if(jugador.revive)
    	juego.physics.arcade.collide(jugador, platformsIni);

    juego.physics.arcade.collide(enem.devuelveGrupo(), platforms, cols.collisionHandlerPlat);

    if(!jugador.agarrado){
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
    juego.debug.body(jugador);
  	/*juego.debug.text('VIDAS: ' + jugador.vidas, 32, 50);
  	juego.debug.text('ORINA: ' + jugador.orina, 32, 30);
  	juego.debug.text('NUM ENEMIGOS: ' + numeroEnemigos, 32, 70);
  	juego.debug.text('NIVEL: ' + nivel, 232, 30);
  	juego.debug.text('ENEMIGOS EN PANTALLA: ' + enemigosPorNivel, 232, 50);
  	juego.debug.text('INVENCIBLE: ' + jugador.invencible, 232, 70);
  	juego.debug.text('BORRACHO: ' + jugador.borracho, 500, 30);*/
  	/*if(nivel % 5 === 0)
  		juego.debug.text('TIME: ' + time, 500, 70);*/
      //juego.debug.text('agarro: ' + agarro, 500, 30);
  }
};

function vuelvePausa(event){

  if(game.paused)
   game.paused = false;
}

function nuevoNivel(){

  nivel++;

  HUD.nivel(nivel);

  enemigosEnPantalla = 0;
  bolaCreada = false;
  bolaGreenCreada = false;
  agarro = false;


  if(nivel >= 7)
	 numeroEnemigos = nivel + juego.rnd.integerInRange(0,2);
  else
	numeroEnemigos = nivel;

  jugador.borracho = false;
  HUD.noBorracho();
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
	
  if(nivel > 10)
    enemigosPorNivel = 3
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
    /*for (var i = 0 ; i < powerUps.children.length; i++){
      powerUps.children[i].limpia();
      powerUps.children[i].kill();
              }*/
               

  	fondocourse.animations.play('runcourse');
  	fondocourse.visible = true;
  	time = 15;
  	/*var timer = juego.time.create(true);
  	myloop = juego.time.events.loop(time, endedCourse, this);
  	timer.start();*/
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

	/*enem.creaEnemigoRandom(juego, nivel, auxRn, agarrador, jugador);
	agarrador = enem.devuelveAgarre();
	auxRn = !auxRn;
	enemigosEnPantalla++;*/
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

    perder.visible = true; 
    for (var i = 0 ; i < powerUps.children.length; i++){
      powerUps.children[i].limpia();
      powerUps.children[i].kill();
              }
    setTimeout(function(){juego.state.start('menu');}, 3000);
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


var estadosJugador = {};

  estadosJugador.jugadorMuerte = function(jug){
  		console.log(jug);
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

},{"./HUD":1,"./class_alcohol":3,"./class_batidoDeProteinas":4,"./class_bebidaEnergetica":5,"./class_environment":8,"./class_fireball":9,"./class_greenFireBall":11,"./class_movibl":12,"./class_object":13,"./class_player":15,"./class_water":18,"./crea_Enemigos":19,"./crea_Monedas":20,"./crea_Plataformas":21,"./handleCollisions":22}],28:[function(require,module,exports){
'use strict';

var men = require('./menu.js');
var handle = require('./handleRequest.js');

var juego;
var respuesta;
var buttonInfoM;

var puntuaciones = {

	create: function(){
	 juego = this.game;
  	 juego.add.sprite(0,0,'Punct');

  	//Boton para volver atrás desde la puntuaciones
    buttonInfoM = juego.add.button(juego.world.centerX - 600 , 25, 'plat2', puntuaciones.vuelveAMenu, this, 2,1,0);
    buttonInfoM.animations.add('plat2');
    buttonInfoM.animations.play('plat2', 4, true );
    buttonInfoM.width = 100;
    buttonInfoM.height = 50;

    puntuaciones.ActualizaTabla();
	}
}

puntuaciones.ActualizaTabla = function () {
	//handle.Peticion(juego, false, true);
	handle.Peticion(juego, true, false);
}

puntuaciones.vuelveAMenu = function(){

	juego.state.start('menu');
}

module.exports = puntuaciones;
},{"./handleRequest.js":23,"./menu.js":25}]},{},[24]);
