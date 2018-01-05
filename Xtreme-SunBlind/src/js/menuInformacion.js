'use strict';

var men = require('./menu.js');

var buttonInfoD; var buttonInfoI;
var Pot; var Enem; var Plat; var Pis; var Ctrl;
var cont;
var juego;

var menuInformacion = {

	create: function(){
	juego = this.game;
	//Cargamos las imágenes del menú
	Pot = juego.add.sprite(0,0,'Potenciadores');
    Pot.visible = false;
    Enem = juego.add.sprite(0,0,'Enemigos');
    Enem.visible = false;
    Plat = juego.add.sprite(0,0, 'Plataformas');
    Plat.visible = false;
    Pis = juego.add.sprite(0,0, 'Pis');
    Pis.visible = false;
    Ctrl = juego.add.sprite(0,0,'Controles');
    Ctrl.visible = false;

	cont = 0;

	cambiaImagenes();

	

	 //Boton para cambiar entre la info Derecha
    buttonInfoD = juego.add.button(juego.world.centerX + 500, 650, 'button', cambiainfoD, this, 2,1,0);
    buttonInfoD.animations.add('button');
    buttonInfoD.animations.play('button', 4, true );
    buttonInfoD.width = 100;
    buttonInfoD.height = 50;

    //Boton para cambiar entre la info Izquierda
    buttonInfoI = juego.add.button(juego.world.centerX - 600, 650, 'button', cambiainfoI, this, 2,1,0);
    buttonInfoI.animations.add('button');
    buttonInfoI.animations.play('button', 4, true );
    buttonInfoI.width = 100;
    buttonInfoI.height = 50;

    //Boton para volver atrás desde la info
    buttonInfoI = juego.add.button(juego.world.centerX - 600 , 25, 'button2', vuelveAMenu, this, 2,1,0);
    buttonInfoI.animations.add('button2');
    buttonInfoI.animations.play('button2', 4, true );
    buttonInfoI.width = 100;
    buttonInfoI.height = 50;

	}
};


function vuelveAMenu(){

	juego.state.start('menu');
}


function cambiainfoD(){

	cont++;

	if (cont >= 5)
		cont = 0;

	cambiaImagenes();
}

function cambiainfoI(){

	cont--;

	if (cont < 0)
		cont = 4;

	cambiaImagenes();
}

function cambiaImagenes(){

	if(cont === 0){
		Pot.visible = true;
		Enem.visible = false;
		Plat.visible = false;
		Pis.visible = false;
		Ctrl.visible = false;
	}
	else if (cont === 1){
		Enem.visible = true;
		Pot.visible = false;
		Plat.visible = false;
		Pis.visible = false;
		Ctrl.visible = false;
	}

	else if(cont === 2){
		Plat.visible = true;
		Pot.visible = false;
		Enem.visible = false;
		Pis.visible = false;
		Ctrl.visible = false;
	}

	else if(cont === 3){
		Plat.visible = false;
		Pot.visible = false;
		Enem.visible = false;
		Pis.visible = true;
		Ctrl.visible = false;
	}

	else if(cont === 4){
		Plat.visible = false;
		Pot.visible = false;
		Enem.visible = false;
		Pis.visible = false;
		Ctrl.visible = true;
	}


}

module.exports = menuInformacion;