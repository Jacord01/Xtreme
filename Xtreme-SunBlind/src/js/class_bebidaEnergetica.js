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