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

enemigoRandom.creaEnemigoRandom = function(juego, nivel, auxRn, agarrador, jugador) {

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
      yAG = 300;
      
    }
    else{
      yFly = 500;
      yAG = 473;
    
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
      xAG = 1000;
    }

    if (aleatorioEnem === 0){
      var enemigo = new tort(juego, x, 0, 'tortuguita', 1, 150);
    }

    else if (aleatorioEnem === 1){
      var enemigo = new fly(juego, xFly, yFly, 'fly', 1, 100);
      
    }
    else if (aleatorioEnem === 2){
      var enemigo = new crab(juego, x, 0, 'crabby', 1, 150);
    }

    else if(aleatorioEnem === 3 && !agarrador){
      var enemigo = new agarra(juego, xAG, yAG, 'enemigo', jugador);
      escena.agarrador.cambia();
      console.log('creado');
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