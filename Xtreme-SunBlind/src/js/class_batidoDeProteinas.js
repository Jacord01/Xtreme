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
	//setTimeout(function(){jug.invencible = false}, 5000);

}

module.exports = batidoDeProteinas;