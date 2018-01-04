'use strict';

var Menu = require('./menu.js');

var BootScene = {
  preload: function () {
    // load here assets required for the loading screen
    //Aqui se cargaran las imagenes en el gh-pages
    this.game.load.image('preloader_bar', 'images/preloader_bar.png');
  },

  create: function () {
    this.game.state.start('preloader');
  }
};


var PreloaderScene = {
  preload: function () {

  	//Carga de la imagen de la barra de carga
    this.loadingBar = this.game.add.sprite(0, 500, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 5);
    this.load.setPreloadSprite(this.loadingBar);

	//Carga de imagenes para el juego

  //Fondo
    this.game.stage.backgroundColor = '#220A29'; 
    this.game.load.spritesheet('fondo', 'images/spacerun.png', 1280, 720, 9);
    this.game.load.spritesheet('fondocourse', 'images/spacecourse.png', 1280, 720, 7);

	//Logo y jugador
    this.game.load.image('logo', 'images/phaser.png');
    this.game.load.image('escudo', 'images/Escudo.png');
    this.game.load.spritesheet('play', 'images/alientotal.png', 60, 57, 15);
    this.game.load.spritesheet('player', 'images/alientotal3.png', 64, 57, 26);
	  this.game.load.spritesheet('borracho', 'images/Borracho.png', 1280, 720, 4);

    //Plataformas
    this.game.load.spritesheet('plat0', 'images/plat0.png', 64, 64, 3);
    this.game.load.spritesheet('plat1', 'images/plat1.png', 64, 64, 3);
    this.game.load.spritesheet('plat2', 'images/plat2.png', 64, 64, 3);
    this.game.load.spritesheet('PCompleta', 'images/PCompleta.png', 64,64,3);

    //HUD
    this.game.load.image('perder', 'images/lose.png');
    this.game.load.spritesheet('numeros', 'images/Numeros.png', 98.1,200,10);
    this.game.load.image('nivel', 'images/Nivel.png');
    this.game.load.image('interiorPis', 'images/InteriorPis.png');
    this.game.load.image('exteriorPis', 'images/ExteriorPis.png');
    this.game.load.spritesheet('vidas', 'images/Vidas.png');
    this.game.load.image('Pausa', 'images/Menus/Pausa.png');

    //Enemigos
    this.game.load.spritesheet('tortuguita', 'images/tortuguita.png', 64,64, 3);
    this.game.load.spritesheet('enemigo', 'images/Grabber.png', 64,64,8);
    this.game.load.image('crabby', 'images/crab.png');
    this.game.load.spritesheet('fly', 'images/fly.png', 64,64, 6);
    this.game.load.image('fireball', 'images/fireball.png');
    this.game.load.image('greenfireball', 'images/greenfireball.png');

    //Bebidas
    this.game.load.image('energetica', 'images/Energetica.png');
    this.game.load.image('agua', 'images/agua.png');
    this.game.load.image('alcohol', 'images/alcohol.png');
    this.game.load.image('proteinas', 'images/proteinas.png');

    //Monedas
    this.game.load.image('coin', 'images/coin.png');

    //Imagenes de fondo  de menu
    this.game.load.image('Potenciadores', 'images/Menus/Potenciadores2.png');
    this.game.load.image('Enemigos', 'images/Menus/Enemigos2.png');
    this.game.load.image('Plataformas', 'images/Menus/Plataformas2.png');
    this.game.load.image('Menu', 'images/Menus/MenuPrincipal2.png');
    this.game.load.image('Pis', 'images/Menus/Pis2.png');
    this.game.load.image('Controles', 'images/Menus/Controles2.png');
    this.game.load.spritesheet('button', 'images/Menus/boton.png', 64, 64, 3);
    this.game.load.spritesheet('button2', 'images/Menus/boton2.png', 64, 64, 3);

  },

  create: function () {
    this.game.state.start('menu');
  }
};


window.onload = function () {
  var game = new Phaser.Game(1280, 720, Phaser.AUTO, 'game');

  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('menu', Menu);
  //game.state.add('play', PlayScene);

  game.state.start('boot');
};
