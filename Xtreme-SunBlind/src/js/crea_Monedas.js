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
    var aux = new object(juego, 100*n, 30, 'logo');
    aux.reescala_imagen(0.2, 0.2);
    monedas.add(aux);

    n--;
  }

  return monedas;
}

module.exports = creaMonedas;