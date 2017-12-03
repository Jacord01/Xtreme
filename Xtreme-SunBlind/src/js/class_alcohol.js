var PU = require('./class_powerUp');	

var alcohol = function(game, entradasprite){

	this.orina = 3;
	PU.call(this, game, entradasprite, this.orina);
	this.reescala_imagen(0.1,0.1);
	
}

alcohol.prototype = Object.create(PU.prototype);
alcohol.prototype.constructor = alcohol;

alcohol.prototype.efecto = function(jug){
	jug.borracho = true;
	setTimeout(function(){jug.borracho = false;}, 5000);
}

module.exports = alcohol;