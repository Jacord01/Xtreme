'use strict';

var PlayScene = require('./play_scene.js');

var button;
var juego;
var boton;

var menu = {

  create: function () {
    juego = this.game;

    juego.state.add('play', PlayScene); 

    button = juego.add.button(juego.world.centerX - 100, 300, 'plat1', actionOnClick, this, 2,1,0);

    button.animations.add('plat1');
    button.animations.play('plat1', 4, true );
    button.width = 200;
    button.height = 100;
    

 },
};

function actionOnClick () {

  
    juego.state.start('play');
}

module.exports = menu; 