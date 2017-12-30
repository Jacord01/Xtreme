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