
"use strict";

var enemigo = require('./class_enemigo');

//*************CLASS MOVIBLE**************************\\
var tortuguita =  function(){
  enemigo.call(this);
}
tortuguita.prototype = Object.create(enemigo.prototype);
tortuguita.prototype.constructor = tortuguita;

module.exports = tortuguita;