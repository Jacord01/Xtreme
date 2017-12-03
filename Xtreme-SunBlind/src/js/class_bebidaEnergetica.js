var PU = require('./class_powerUp');	

var bebidaEnergetica = function(game, entradasprite, orina){

	PU.call(this, game, entradasprite, orina);
	this.reescala_imagen(0.1,0.1);
	this.incremento = 2;
	
}

bebidaEnergetica.prototype = Object.create(PU.prototype);
bebidaEnergetica.prototype.constructor = bebidaEnergetica;

bebidaEnergetica.prototype.efecto = function(jug){

	if(!jug.corriendo){
	var aux;
	jug.corriendo = true;
	aux = jug.vel;

	jug.vel = aux * this.incremento;
	
	setTimeout(function(){ jug.vel = aux; jug.corriendo = false}, 5000);
}
}

module.exports = bebidaEnergetica;