'use strict';

var HUD = {};
var vida1; var vida2; var vida3;
var punct1; var punct2; var nivel;
var pisDentro; var pisFuera;
var ebrio;
var Temp1; var Temp2;

HUD.create = function(game){

	//VidasPlayer
	
	vida1 =  game.add.sprite(10,10,'vidas');
	vida2 = game.add.sprite(74, 10, 'vidas');
	vida3 = game.add.sprite(138, 10, 'vidas');

	//Nivel

	punct1 = game.add.sprite(300, 80, 'numeros');
 	punct1.width = 50;
 	punct1.height = 80;

 	punct2 = game.add.sprite(350,80, 'numeros');
 	punct2.width = 50;
 	punct2.height = 80;

 	Temp1 = game.add.sprite(300, 80, 'numeros');
 	Temp1.width = 50;
 	Temp1.height = 80;
 	Temp1.visible = false;
 	Temp1.x = 600; Temp1.y = 20;

 	Temp2 = game.add.sprite(350,80, 'numeros');
 	Temp2.width = 50;
 	Temp2.height = 80;
 	Temp2.visible = false;
	Temp2.x = 645; Temp2.y = 20;

 	nivel = game.add.sprite(200,100, 'nivel');
 	nivel.width = 100;
 	nivel.height = 50;

 	//Medidor de Pis

 	pisDentro = game.add.sprite(950,30, 'interiorPis');
 	pisDentro.height = 20;
 	pisDentro.width = 0;

 	pisFuera = game.add.sprite(950,30, 'exteriorPis');
 	pisFuera.height = 20;
 	pisFuera.width = 300; 	

 	//Jugador ebrio
 	 ebrio = game.add.sprite(0 ,0,'borracho');
 	 ebrio.visible = false;

 	 ebrio.animations.add('drunk', [0,1,2,3], 6, true);
 	 ebrio.play('drunk');
}

HUD.restaVida = function(jug){

	if(jug.vidas >= 3){
		vida1.visible = true;
		vida2.visible = true;
		vida3.visible = true;
	}

	else if(jug.vidas === 2){
		vida1.visible = true;
		vida2.visible = true;
		vida3.visible = false;
	}

	else if(jug.vidas === 1){
		vida1.visible = true;
		vida2.visible = false;
		vida3.visible = false;
	}	

	else {
		vida1.visible = false;
		vida2.visible = false;
		vida3.visible = false;
	}
}

HUD.nivel = function(lvl){

  punct1.visible = true; punct2.visible = true; nivel.visible = true;

  punct1.frame = Math.floor(lvl / 10);

  punct2.frame = lvl % 10;

  setTimeout(function(){punct1.visible = false; punct2.visible = false; nivel.visible = false;}, 3000);
}

HUD.tempLevel = function(temp){


 Temp1.frame = Math.floor(temp / 10);

 Temp2.frame = temp % 10;

}

HUD.ocultaTempLevel = function(){

	 Temp1.visible = false; Temp2.visible = false;

}

HUD.muestraTempLevel = function(){

	Temp1.visible = true; Temp2.visible = true;
}

HUD.cambiaPis = function(pis){

	 	pisDentro.width = pis * 30;
}

HUD.borracho = function(){

	 ebrio.visible = true;
}

HUD.noBorracho = function(){

	ebrio.visible = false;
}

module.exports = HUD;