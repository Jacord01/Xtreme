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
  escena.puntos.suma(-3);
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
  escena.puntos.suma(2);
  mon.kill();
  escena.stateMoneda.reduceMoneda();

}

colisiones.collisionHandlerEnemPis = function(jug, enem){

    if(enem.grabber){
      //Aqui es donde peta el agarrador
      escena.agarrador.False();      
    }

    escena.puntos.suma(enem.devuelvePuntos());
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
    escena.puntos.suma(enem.devuelvePuntos());
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
