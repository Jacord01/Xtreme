'use strict';

var HUD = {};
var vida1; var vida2; var vida3;

HUD.create = function(game){
	
	vida1 =  game.add.sprite(10,10,'vidas');
	vida2 = game.add.sprite(74, 10, 'vidas');
	vida3 = game.add.sprite(138, 10, 'vidas');
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

module.exports = HUD;