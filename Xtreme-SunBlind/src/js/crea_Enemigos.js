'use strict'

var tort = require('./class_turtle');
var crab = require('./class_crab');
var fly = require('./class_fly');
	
var enemigoRandom = {};
var enemies;
var ag;

enemigoRandom.creaGrupo = function(juego){

  enemies = juego.add.physicsGroup();
}

enemigoRandom.creaEnemigoRandom = function(juego, nivel, auxRn, agarrador) {

    
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
      var enemigo = new tort(juego, x, 0, 'tortuguita', 1, 300);
    }

    else if (aleatorioEnem === 1){
      var enemigo = new fly(juego, x, 90, 'fly', 1, 200);
      
    }
    else if (aleatorioEnem === 2){
      var enemigo = new crab(juego, x, 0, 'crabby', 1, 300);
    }

    else if(nivel > 4 && aleatorioEnem === 0 && !agarrador){
      var enemigo = new ag (juego, x, y - 200, 'enemigo', jugador);
      agarrador = true;
    }

    else //Para curarnos de espanto, porque hay veces que las otras condiciones no se cumplen
      var enemigo = new tort(juego, x, 0, 'tortuguita', 1, 300);


    enemies.add(enemigo);
    
    ag = agarrador;

    if (x >= 950)
      enemigo.cambia_dir();

    enemigo.velocidad = nivel * 7 + enemigo.velocidad; //Cada nivel los enemigos irán más rápido

     }, 1000);         
} 

  enemigoRandom.devuelveGrupo = function(){

    return enemies;
  }

  enemigoRandom.devuelveAgarre = function(){
  	return ag;
  }
  

module.exports = enemigoRandom;