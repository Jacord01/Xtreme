"use strict";

var enemigo = require('./class_enemy');

var tortuguita =  function(game, entradax, entraday, entradasprite, dir, velx){
  enemigo.call(this, game, entradax, entraday, entradasprite, dir, velx);
}
tortuguita.prototype = Object.create(enemigo.prototype);
tortuguita.prototype.constructor = tortuguita;

module.exports = tortuguita;