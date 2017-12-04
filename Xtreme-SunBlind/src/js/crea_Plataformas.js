'use strict'

var plat = require('./class_platform');
	

	
var plataformas = {};
plataformas.platforms;
plataformas.platformsIni;
plataformas.anchorx;
plataformas.anchory;
plataformas.anchoPlat = 500;
plataformas.largoPlat = 50;
	plataformas.crea_Plataformas = function(game){

	console.log('Aqui estamos');
  plataformas.platforms = game.add.physicsGroup();
  plataformas.platformsIni = game.add.physicsGroup();
 //conjuntos de plataformas

  anchorx = 0; anchory = 0;
  for (var a = -1; a < 26; a++){
  	creaPlat(a, anchorx, anchory, game, true, false, plataformas.platforms, plataformas.platformsIni);
  }
  anchorx = 0; anchory = 200;
  for (var a = 0; a < 8; a++){
  	creaPlat(a, anchorx, anchory, game, false, false, plataformas.platforms, plataformas.platformsIni);
  }
  anchorx = 1280-plataformas.anchoPlat; anchory = 200;
  for (var a = 0; a < 8; a++){
  	creaPlat(a, anchorx, anchory, game, false, false, plataformas.platforms, plataformas.platformsIni);
  }
  anchorx = 350; anchory = 375;
  for (var a = 1; a < 8; a++){
  	creaPlat(a, anchorx, anchory, game, false, false, plataformas.platforms, plataformas.platformsIni);
  }
  anchorx = 0; anchory = 400;
  for (var a = 0; a < 4; a++){
  	creaPlat(a, anchorx, anchory, game, false, false, plataformas.platforms, plataformas.platformsIni);
  }
  anchorx = 1280 - 250; anchory = 400;
  for (var a = 0; a < 4; a++){
  	creaPlat(a, anchorx, anchory, game, false, false, plataformas.platforms, plataformas.platformsIni);
  }
  anchorx = 0; anchory = 550;
  for (var a = 0; a < 8; a++){
  	creaPlat(a, anchorx, anchory, game, false, false, plataformas.platforms, plataformas.platformsIni);
  }
  anchorx = 1280-plataformas.anchoPlat; anchory = 550;
  for (var a = 0; a < 8; a++){
  	creaPlat(a, anchorx, anchory, game, false, false, plataformas.platforms, plataformas.platformsIni);
  }
  anchorx = 0; anchory = 700;
  for (var a = -1; a < 26; a++){
  	creaPlat(a, anchorx, anchory, game, false, false, plataformas.platforms, plataformas.platformsIni);
  }

  //Plataformas para cuando muera el jugador
   var anchorx = 510; var anchory = 100;
  	for (var a = 0; a < 4; a++){
  	creaPlat(a, anchorx, anchory, game, false, true, plataformas.platforms, plataformas.platformsIni);
  }		
   	plataformas.platformsIni.visible = false;

}
  function creaPlat(a, anchorx, anchory, juego, superior, ini, platforms, platformsIni){
  	var sprite = 'plat2';
  	var p = (new plat(juego, 0, 0, sprite));
  	if(superior)
  		p.reescala_imagen(1, 0.1);
  	p.cambia_pos(anchorx + (a*p.width), anchory);
  	if(!ini)
  	plataformas.platforms.add(p);
  	else
  	plataformas.platformsIni.add(p);
  }

  module.exports.plataformas = plataformas;