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
    this.loadingBar = this.game.add.sprite(0, 500, 'preloader_bar');
    this.loadingBar.anchor.setTo(0, 5);
    this.load.setPreloadSprite(this.loadingBar);

    // TODO: load here the assets for the game
    this.game.load.image('logo', 'images/phaser.png');
    this.game.stage.backgroundColor = '#220A29';
    this.game.load.spritesheet('player', 'images/alientotal.png', 60, 57, 15);
    this.game.load.spritesheet('plat0', 'images/plat0.png', 64, 64, 3);
    this.game.load.spritesheet('plat1', 'images/plat1.png', 64, 64, 3);
    this.game.load.spritesheet('plat2', 'images/plat2.png', 64, 64, 3);
    this.game.load.image('fond', 'images/space.png');
    this.game.load.image('enemigo', 'images/juen.png');
    this.game.load.image('perder', 'images/lose.png');
    this.game.load.image('energetica', 'images/Energetica.png');
    this.game.load.image('alcohol', 'images/alcohol.png');
    this.game.load.image('agua', 'images/agua.png');
    this.game.load.image('proteinas', 'images/proteinas.png');
    this.game.load.image('crabby', 'images/crab.png');
    this.game.load.image('fly', 'images/fly.png');
    this.game.load.image('fireball', 'images/fireball.png');
    this.game.load.image('greenfireball', 'images/greenfireball.png');
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
