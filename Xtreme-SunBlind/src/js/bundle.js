(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var movible = require('./class_movibl');	

var enemigo = function(game, entradax, entraday, entradasprite, dir, velx){
	movible.call(this, game, entradax, entraday, entradasprite, dir, velx);
	this.juego = game;
	this.create();
	this.velocidad = 300;
	this.stunt = false;
}

enemigo.prototype = Object.create(movible.prototype);
enemigo.prototype.constructor = enemigo;

enemigo.prototype.create = function (){
	this.juego.physics.arcade.enable(this);
 	this.body.gravity.y = 4000;
    this.reescala_imagen(0.05,0.04);
}

enemigo.prototype.update = function (){
	if(!this.stunt)
	this.actualiza_pos(this.velocidad);
else 
	this.actualiza_pos(0);
	if( this.body.velocity.x != 0 ||  this.body.velocity.y != 0){
         this.cambia_pos(this.x, this.y);
       }
}

enemigo.prototype.cambia_vel = function (vl){

	this.velocidad = vl;
}
module.exports = enemigo;
},{"./class_movibl":3}],2:[function(require,module,exports){
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
},{"./class_object":4}],3:[function(require,module,exports){
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
}

module.exports = movibl;
},{"./class_object":4}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
'use strict';

var entorno = require('./class_environment');



var plataforma = function(game, entradax, entraday, entradasprite){
	entorno.call(this, game, entradax, entraday, entradasprite);
	this.reescala_imagen(0.1, 0.05);
	this.tocada = false;
	this.arriba = false;
	this.iniPointY = entraday;
	this.temporizador = this.game.time.create(false);
}

plataforma.prototype = Object.create(entorno.prototype);
plataforma.prototype.constructor = plataforma;

plataforma.prototype.cambia_tocada = function (){
	this.tocada = !this.tocada;
}



plataforma.prototype.jump = function(){
	if(this.arriba === false)
	{
	this.arriba = true;
	this.immovable = false;
	this.body.gravity.y = 400;
	this.body.velocity.y = -100

	this.temporizador.loop(500, vuelve, this);
  	this.temporizador.start();
}
	
}

function vuelve(){
	this.body.gravity.y = 0;
	this.body.velocity.y = 0;
	this.immovable = true;
	this.tocada = false;
	this.temporizador.stop();
	this.arriba = false;

}


module.exports = plataforma;
},{"./class_environment":2}],6:[function(require,module,exports){
'use strict';

var movible = require('./class_movibl');	
var cursors;
var jumpButton;

var Protagonista = function(game, entradax, entraday, entradasprite, dir, velx, vidas){
	movible.call(this, game, entradax, entraday, entradasprite, dir, velx);
	this.vidas = vidas;
	this.juego = game;
	this.create();
}

Protagonista.prototype = Object.create(movible.prototype);
Protagonista.prototype.constructor = Protagonista;

Protagonista.prototype.create = function (){
 	this.body.gravity.y = 4000;
 	cursors = this.juego.input.keyboard.createCursorKeys();
    jumpButton = this.juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.reescala_imagen(0.2,0.2);
}

Protagonista.prototype.update = function (){

  //Si no hay inputs consideramos que el jugador está parado
	 this.body.velocity.x = 0;
   
    if (cursors.left.isDown)
    {
        this.body.velocity.x = -1000;
    }
    else if (cursors.right.isDown)
    {
        this.body.velocity.x = 1000;
    }

    if (jumpButton.isDown && (this.body.onFloor() 
      || this.body.touching.down))

    {
        this.body.velocity.y = -1500;
    }

     //Aquí actualizamos la posición del objeto jugador en su clase si es que se ha movido
      if( this.body.velocity.x != 0 ||  this.body.velocity.y != 0){
         this.cambia_pos(this.x, this.y);
       }
}

module.exports = Protagonista;
},{"./class_movibl":3}],7:[function(require,module,exports){
"use strict";

var enemigo = require('./class_enemy');

var tortuguita =  function(game, entradax, entraday, entradasprite, dir, velx){
  enemigo.call(this, game, entradax, entraday, entradasprite, dir, velx);
}
tortuguita.prototype = Object.create(enemigo.prototype);
tortuguita.prototype.constructor = tortuguita;

module.exports = tortuguita;
},{"./class_enemy":1}],8:[function(require,module,exports){
'use strict';

var PlayScene = require('./play_scene.js');

var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
  },

  create: function () {
    this.game.state.start('preloader');
  }
};


var PreloaderScene = {
  preload: function () {
    this.loadingBar = this.game.add.sprite(0, 240, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 0.5);
    this.load.setPreloadSprite(this.loadingBar);

    // TODO: load here the assets for the game
    this.game.load.image('logo', 'images/phaser.png');
    this.game.stage.backgroundColor = '#1ff';
    this.game.load.image('player', 'images/original.png');
    this.game.load.image('tostadora', 'images/tostadora.png');
    this.game.load.image('fond', 'images/Olaya.png');
    this.game.load.image('enemigo', 'images/juen.png');
  },

  create: function () {
    this.game.state.start('play');
  }
};


window.onload = function () {
  var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'game');

  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('play', PlayScene);

  game.state.start('boot');
};

},{"./play_scene.js":9}],9:[function(require,module,exports){
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

},{"./class_environment":2,"./class_movibl":3,"./class_object":4,"./class_platform":5,"./class_player":6,"./class_turtle":7}]},{},[8]);
