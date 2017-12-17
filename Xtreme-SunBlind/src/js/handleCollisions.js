'use strict'

var escena = require('./play_scene');
var plat = require('./crea_Plataformas');
var colisiones = {};
var enemigosEnPantalla;

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
		jug.kill();
		jug.vidas--;
		jug.vel = jug.origVel;
		jug.borracho = false;
  		jug.invencible = false;
  		if(jug.vidas > 0)
  			setTimeout(function(){ escena.estadosJugador.revive( plat.devuelveIni()); plat.devuelveIni().visible = true; jug.orina = 0; jug.vel = jug.origVel;}, 1000);
  		else 
  			escena.perd.Perder();
	}

}

colisiones.collisionHandlerEnem = function(jug, enem){

	if(!enem.stunt){
		if(!jug.invencible){

			if(enem.agarra != undefined)
				  enem.agarra(jug);

			else escena.estadosJugador.jugadorMuerte();

  		}
  			else if (jug.invencible) {
  				enem.kill();
  				escena.enemigos.reducePantalla();
  				escena.enemigos.reduceNumero();
  				jug.invencible = false;
  			}

}
  else {
  	enem.kill();
  	escena.enemigos.reducePantalla();
  	escena.enemigos.reduceNumero();
    if(enem.agarra != undefined)
    	//Va a llegar un momento en el que aquí va a petar, sólo hay que hacer que agarrador pase al MAIN, pero HAY QUE HACERLO Y ES MUY TARDE YA
      agarrador = false;
  }
  }

  colisiones.collisionHandlerJug = function(jug, plat){
  	if(jug.body.touching.up === true){
   		plat.cambia_tocada();
   		plat.jump();
  	}

  	if(plat.fuego){
      jugMuerte(jug);
  		
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

  module.exports = colisiones;