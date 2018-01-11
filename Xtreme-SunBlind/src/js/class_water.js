var PU = require('./class_powerUp');	
var sound;

var agua = function(game, entradasprite){
	sound = game.add.audio('water');
	this.orina = 2;
	PU.call(this, game, entradasprite, this.orina);
	this.reescala_imagen(0.9,0.9);
	
}
	
agua.prototype = Object.create(PU.prototype);
agua.prototype.constructor = agua;

agua.prototype.efecto = function(jug){
	console.log('El agua no hace nada, pringado.');
	sound.play();
}


module.exports = agua;