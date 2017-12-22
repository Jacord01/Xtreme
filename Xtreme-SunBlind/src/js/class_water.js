var PU = require('./class_powerUp');	

var agua = function(game, entradasprite){

	this.orina = 2;
	PU.call(this, game, entradasprite, this.orina);
	this.reescala_imagen(0.1,0.1);
	
}
	
agua.prototype = Object.create(PU.prototype);
agua.prototype.constructor = agua;

agua.prototype.efecto = function(jug){
	console.log('El agua no hace nada, pringado.');
}


module.exports = agua;