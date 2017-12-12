(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var enemy = require('./class_enemy');

var agarrador =  function(game, entradax, entraday, entradasprite, jugador){
  enemy.call(this, game, entradax, entraday, entradasprite, 0, 0);
  this.agarrando = false;
  this.medAgarro = 50;
  this.jug = jugador;
  this.juego = game;
  this.espacio = this.juego.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  this.reescala_imagen(0.075,0.075);
  this.aleatorio = 0;

}

agarrador.prototype = Object.create(enemy.prototype);
agarrador.prototype.constructor = agarrador;

agarrador.prototype.update = function(){
	if(this.golpeado) this.stunt = true;

	this.juego.debug.text('MEDIDOR AGARRADO: ' + this.medAgarro, 500, 70);
	this.juego.debug.text('JUGADOR AGARRADO: ' + this.jug.agarrado, 500, 90);

	if(this.jug.agarrado == true && this.espacio.isDown && this.espacio.downDuration(50))
		this.medAgarro += 10 / 4;

	if(this.medAgarro >= 100){
		this.aleatorio = this.juego.rnd.integerInRange(0,1);
		if(this.aleatorio === 0)
			this.aleatorio = -1;

		this.jug.cambia_pos(this.x + 200 * this.aleatorio, this.y);
		this.jug.agarrado = false;
		this.agarrando = false;
		this.medAgarro = 50;
	}


}

agarrador.prototype.agarra = function(jug){
	var ag = this; //Cagon el this de las narices la de tiempo que he estado para esta bobada
	ag.medAgarro = 50;
	ag.agarrando = true;
	jug.agarrado = true;
	
	agarrador.prototype.cambiaAgarre(ag, jug);
}

agarrador.prototype.cambiaAgarre = function(ag, jug){

	ag.medAgarro = ag.medAgarro - 10;
	if(jug.agarrado)
		setTimeout(function(){agarrador.prototype.cambiaAgarre(ag, jug);}, 350);

}


module.exports = agarrador;
},{"./class_enemy":6}],2:[function(require,module,exports){
var PU = require('./class_powerUp');	

var alcohol = function(game, entradasprite){

	this.orina = 3;
	PU.call(this, game, entradasprite, this.orina);
	this.reescala_imagen(0.04,0.04);
	
}

alcohol.prototype = Object.create(PU.prototype);
alcohol.prototype.constructor = alcohol;

alcohol.prototype.efecto = function(jug){
	jug.borracho = true;
	setTimeout(function(){jug.borracho = false;}, 5000);
}

module.exports = alcohol;
},{"./class_powerUp":15}],3:[function(require,module,exports){
var PU = require('./class_powerUp');	

var batidoDeProteinas = function(game, entradasprite){

	this.orina = 2;
	PU.call(this, game, entradasprite, this.orina);
	this.reescala_imagen(0.07,0.07);	
}

batidoDeProteinas.prototype = Object.create(PU.prototype);
batidoDeProteinas.prototype.constructor = batidoDeProteinas;

batidoDeProteinas.prototype.efecto = function(jug){
	jug.invencible = true;
	jug.borracho = false;
	setTimeout(function(){jug.invencible = false}, 5000);

}

module.exports = batidoDeProteinas;
},{"./class_powerUp":15}],4:[function(require,module,exports){
var PU = require('./class_powerUp');	

var bebidaEnergetica = function(game, entradasprite){

	this.orina = 2;
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
},{"./class_powerUp":15}],5:[function(require,module,exports){
"use strict";

var enemy = require('./class_enemy');

var crab =  function(game, entradax, entraday, entradasprite, dir, velx){
  enemy.call(this, game, entradax, entraday, entradasprite, dir, velx);
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
},{"./class_enemy":6}],6:[function(require,module,exports){
'use strict';

var movible = require('./class_movibl');	

var enemigo = function(game, entradax, entraday, entradasprite, dir, velx){
	movible.call(this, game, entradax, entraday, entradasprite, dir, velx);
	this.juego = game;
	this.create();
	this.velocidad = velx;
	this.stunt = false;
	this.golpeado = false;
	this.cont = 1;
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


},{"./class_movibl":11}],7:[function(require,module,exports){
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
},{"./class_object":12}],8:[function(require,module,exports){
'use strict';

var movible = require('./class_movibl');	

var fireball = function(game, entradax, entraday, entradasprite, dir, velx){
	movible.call(this, game, entradax, entraday, entradasprite, dir, velx);
	this.juego = game;
	this.sale = false;
	this.create();
}

fireball.prototype = Object.create(movible.prototype);
fireball.prototype.constructor = fireball;

fireball.prototype.create = function (){
	this.juego.physics.arcade.enable(this);
 	this.body.gravity.y = 0;
 	this.reescala_imagen(0.05, 0.02);
 	var bola = this;
  	setTimeout(function(){bola.sale = true;}, 250);
}

fireball.prototype.update = function (){
	if (this.sale){
		this.actualiza_pos(this.velocidad);
	}
}

module.exports = fireball;
},{"./class_movibl":11}],9:[function(require,module,exports){
"use strict";

var enemigo = require('./class_enemy');

var fly =  function(game, entradax, entraday, entradasprite, dir, velx){
  enemigo.call(this, game, entradax, entraday, entradasprite, dir, velx);
  this.body.gravity.y = 1000;
  this.reescala_imagen(0.08,0.08);
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
},{"./class_enemy":6}],10:[function(require,module,exports){
'use strict';

var fireball = require('./class_fireball');	

var greenfireball = function(game, entradax, entraday, entradasprite, dir, velx, vely){
	fireball.call(this, game, entradax, entraday, entradasprite, dir, velx);
	this.juego = game;
	this.velocidadY = vely;
	this.cont = 0;
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
},{"./class_fireball":8}],11:[function(require,module,exports){
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
},{"./class_object":12}],12:[function(require,module,exports){
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
},{}],13:[function(require,module,exports){
'use strict';

var entorno = require('./class_environment');



var plataforma = function(game, entradax, entraday, entradasprite){
	entorno.call(this, game, entradax, entraday, entradasprite);
	this.reescala_imagen(1, 0.5 );
	this.tocada = false;
	this.arriba = false;
	this.iniPointY = entraday;
	this.temporizador = this.game.time.create(false);
	this.create();
	
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
},{"./class_environment":7}],14:[function(require,module,exports){
'use strict';

var movible = require('./class_movibl');	
var cursors;
var jumpButton;

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
    this.reescala_imagen(1.45,1.15);
    this.animations.add('walk', [0,1,2,3]);
  this.animations.add('stay', [4,5], 6, true);
  this.animations.add('jump', [6,7,8,9,10,11,12,13,14]);
  this.animations.play('stay');
}

Protagonista.prototype.update = function (){

  //Si no hay inputs consideramos que el jugador está parado
	 this.body.velocity.x = 0;

	 if (this.corriendo)
	 	this.vel = 2*this.vel;

	 if (this.borracho){
	 	this.vel = -this.vel;
   }

   if(this.orinando || this.agarrado)
    this.vel = 0;

	 this.juego.debug.text('VELOCIDAD: ' + this.vel, 32, 70);
   this.juego.debug.text('SALTO: ' + this.saltando, 230, 70);
   this.juego.debug.text('ORINANDO: ' + this.orinando, 500, 50);
   
    if (cursors.left.isDown)
    {
        this.body.velocity.x = -this.vel;
        if(!this.borracho)
          this.scale.x = -this.escala;
        else this.scale.x = this.escala;
        if (this.body.touching.down)
           this.animations.play('walk', 6, true);
    }
    else if (cursors.right.isDown)
    {
        this.body.velocity.x = this.vel;
        if(!this.borracho)
        this.scale.x = this.escala;
        else this.scale.x = -this.escala;
        if (this.body.touching.down)
           this.animations.play('walk', 6, true);
    }

    this.vel = this.origVel - (this.orina * 20);
    if (jumpButton.isDown && !this.agarrado && (this.body.onFloor() 
      || this.body.touching.down))

    {

        this.body.velocity.y = -1000;
    }

    if(!this.body.touching.down) //Si no toca el suelo, está saltando. Servirá para hacer pis
             this.saltando = true;
    else this.saltando = false;

    if(cursors.up.isDown && !this.saltando  && this.orina >= 10)
        {
          this.orina = 0;
          this.orinando = true;
          var prota = this;
          
          setTimeout(function(){prota.orinando = false;}, 2000);
        }


     //Aquí actualizamos la posición del objeto jugador en su clase si es que se ha movido
      if( this.body.velocity.x != 0 ||  this.body.velocity.y != 0){
         this.cambia_pos(this.x, this.y);
       }

       if (!this.body.touching.down)
        this.animations.play('jump', 10 , true);

       else if (this.body.velocity.x === 0)
       	this.animations.play('stay');
}

Protagonista.prototype.incrementaOrina = function (orina){

  this.orina = this.orina + orina;
  if(this.orina>10)
    this.orina = 10; 
}

module.exports = Protagonista;
},{"./class_movibl":11}],15:[function(require,module,exports){

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
},{"./class_object":12,"./play_scene":20}],16:[function(require,module,exports){
"use strict";

var enemigo = require('./class_enemy');

var tortuguita =  function(game, entradax, entraday, entradasprite, dir, velx){
  enemigo.call(this, game, entradax, entraday, entradasprite, dir, velx);
  this.reescala_imagen(0.05,0.02);
}
tortuguita.prototype = Object.create(enemigo.prototype);
tortuguita.prototype.constructor = tortuguita;

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
},{"./class_enemy":6}],17:[function(require,module,exports){
var PU = require('./class_powerUp');	

var agua = function(game, entradasprite){

	this.orina = 1;
	PU.call(this, game, entradasprite, this.orina);
	this.reescala_imagen(0.07,0.07);
	
}
	
agua.prototype = Object.create(PU.prototype);
agua.prototype.constructor = agua;

agua.prototype.efecto = function(jug){
	console.log('El agua no hace nada, pringado.');
}


module.exports = agua;
},{"./class_powerUp":15}],18:[function(require,module,exports){
'use strict'

var plat = require('./class_platform');
	
var plataforma = {};
var platforms;
var platformsIni;

plataforma.creaPlataforma = function(juego) {

  var anchorx;
  var anchory;  
  var anchoPlat = 500;
  var largoPlat = 50;

  platforms = juego.add.physicsGroup();
  platformsIni = juego.add.physicsGroup();

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

  plataforma.devuelvePlat = function(){

    return platforms;
  }

  plataforma.devuelveIni = function(){
    return platformsIni;
  }
  

module.exports = plataforma;
},{"./class_platform":13}],19:[function(require,module,exports){
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
    this.loadingBar.anchor.setTo(0, 5);
    this.load.setPreloadSprite(this.loadingBar);

    // TODO: load here the assets for the game
    this.game.load.image('logo', 'images/phaser.png');
    this.game.stage.backgroundColor = '#f1f';
    this.game.load.spritesheet('player', 'images/alientotal.png', 60, 57, 15);
    this.game.load.spritesheet('plat0', 'images/plat0.png', 64, 64, 3);
    this.game.load.spritesheet('plat1', 'images/plat1.png', 64, 64, 3);
    this.game.load.spritesheet('plat2', 'images/plat2.png', 64, 64, 3);
    this.game.load.image('fond', 'images/space.png');
    this.game.load.image('enemigo', 'images/juen.png');
    this.game.load.image('perder', 'images/lose.png');
    this.game.load.image('energetica', 'images/Energetica.png');
    this.game.load.image('alcohol', 'images/alcohol.png');
    this.game.load.image('agua', 'images/agua.png');
    this.game.load.image('proteinas', 'images/proteinas.png');
    this.game.load.image('crabby', 'images/crab.png');
    this.game.load.image('fly', 'images/fly.png');
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

},{"./play_scene.js":20}],20:[function(require,module,exports){
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
var greenfireball = require('./class_greenFireBall');

var jugador; var nivel;
var platforms; var platformsIni;
var enemies; var numeroEnemigos; var enemigosPorNivel; var enemigosEnPantalla;
var deadZone1; var deadZone2; var deadZone3; var deadZone4;
var fireballs; var bolaCreada = false; var bolaGreenCreada = false;
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
    	if (!bolaGreenCreada)
    		creaGreenFireballs();

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

    function creaGreenFireballs (){
  	var x; var y; var r; var time;
  	bolaGreenCreada = true;
  	x = 1210; y = 270;
  	var fb = new greenfireball (juego, x, y, 'enemigo', 1, 200, 500);
  	if (x >= 550)
  		fb.cambia_dir();
  	fireballs.add(fb);

  	x = 20; y = 270;
  	var fb2 = new greenfireball (juego, x, y, 'enemigo', 1, 200, 500);
  	if (x >= 550)
  		fb2.cambia_dir();
  	fireballs.add(fb2);
  }


module.exports = PlayScene;



},{"./class_agarrador":1,"./class_alcohol":2,"./class_batidoDeProteinas":3,"./class_bebidaEnergetica":4,"./class_crab":5,"./class_environment":7,"./class_fireball":8,"./class_fly":9,"./class_greenFireBall":10,"./class_movibl":11,"./class_object":12,"./class_player":14,"./class_turtle":16,"./class_water":17,"./crea_Plataformas":18}]},{},[19]);
