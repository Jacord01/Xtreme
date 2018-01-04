'use strict';

var men = require('./menu.js');
var handle = require('./handleRequest.js');

var puntuaciones = {}

puntuaciones.ActualizaTabla = function () {
	handle.Peticion();
}

module.exports = puntuaciones;