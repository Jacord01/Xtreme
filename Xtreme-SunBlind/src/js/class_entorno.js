//clase para los elementos del entorno

"use strict"; //Correción en modo estricto


var GO = require('./class_objeto');
var juego = require('./main');
//****************CLASS ENTORNO******************\\

var entorno =  function(img){
  GO.call(this, 0, 0, img);
  juego.game.physics.arcade.enable(this.fisica);
  this.fisica.body.immovable = true;
}
entorno.prototype = Object.create(GO.prototype);
entorno.prototype.constructor = entorno;


module.exports = entorno;