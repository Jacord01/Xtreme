var PU = require('./class_powerUp');
var HUD = require('./HUD');	

var alcohol = function(game, entradasprite){

	this.orina = 3;
	PU.call(this, game, entradasprite, this.orina);
	this.reescala_imagen(0.025,0.025);
	
}

alcohol.prototype = Object.create(PU.prototype);
alcohol.prototype.constructor = alcohol;

alcohol.prototype.efecto = function(jug){
	jug.borracho = true;
	HUD.borracho();
	setTimeout(function(){jug.borracho = false; HUD.noBorracho();}, 5000);
}

module.exports = alcohol;