'use strict';

var movible = require('./class_movible');	

var Protagonista = function(){

	movible.call();

}

Protagonista.prototype = Object.create(movible.prototype);
Protagonista.prototype.constructor = Protagonista;

module.exports.Protagonista = Protagonista;