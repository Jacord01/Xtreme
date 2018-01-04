'use strict';

var men = require('./menu.js');
var handle = require('./handleRequest.js');

var juego;
var respuesta;
var buttonInfoM;

var puntuaciones = {

	create: function(){
	 juego = this.game;
  	 juego.add.sprite(0,0,'Punct');

  	//Boton para volver atrás desde la puntuaciones
    buttonInfoM = juego.add.button(juego.world.centerX - 600 , 25, 'plat2', puntuaciones.vuelveAMenu, this, 2,1,0);
    buttonInfoM.animations.add('plat2');
    buttonInfoM.animations.play('plat2', 4, true );
    buttonInfoM.width = 100;
    buttonInfoM.height = 50;

    puntuaciones.ActualizaTabla();

    puntuaciones.creaTabla();
	}


}

puntuaciones.ActualizaTabla = function () {
	handle.Peticion(juego);
}

puntuaciones.vuelveAMenu = function(){

	juego.state.start('menu');
}

puntuaciones.creaTabla = function(){

	var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

    for(var i = 0; i < 10; i++){
    	juego.add.text(300, 100 + i * 50, "NOMBRE:  " + respuesta.score[i].nombre, style);
    	juego.add.text(700, 100 + i * 50, "PUNTUACION:  " + respuesta.score[i].punct, style);

		}
}

puntuaciones.recibeDatos = function(answer){
	respuesta = answer;
}

module.exports = puntuaciones;