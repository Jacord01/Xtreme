'use strict';

var tuto = require('./Tutorial.js');
var menuInformacion = require('./menuInformacion');
var Put = require('./puntuaciones');

var buttonJuego; var buttonInfo; var pantalla; var punt;
var juego;
var click; var back;

var menu = {

  create: function () {
    juego = this.game;

    juego.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    juego.state.add('info', menuInformacion);

    juego.state.add('tutorial', tuto); 

    juego.state.add('puntuation', Put);

    click = juego.add.audio('click');
    

   juego.add.sprite(0,0,'Menu');

    //Boton que nos lleva al juego
    buttonJuego = juego.add.button(juego.world.centerX - 75, 275, 'button', actionOnClickJuego, this, 2,1,0);
    buttonJuego.animations.add('button');
    buttonJuego.animations.play('button', 4, true );
    buttonJuego.width = 150;
    buttonJuego.height = 60;

    //Boton para el menú de información
    buttonInfo = juego.add.button(juego.world.centerX - 75, 475, 'button', actionOnClickInfo, this, 2,1,0);
    buttonInfo.animations.add('button');
    buttonInfo.animations.play('button', 4, true );
    buttonInfo.width = 150;
    buttonInfo.height = 60;

    //Boton para fullscreen
    pantalla = juego.add.button(juego.world.centerX - 600, 600, 'PCompleta', fullscreen, this, 2,1,0);
    pantalla.animations.add('PCompleta');
    pantalla.animations.play('PCompleta', 4, true );
    pantalla.width = 150;
    pantalla.height = 80;

    //Boton para puntuaciones
    punt = juego.add.button(juego.world.centerX - 535, 300, 'button', actionOnClickPunt, this, 2,1,0);
    punt.animations.add('button');
    punt.animations.play('button', 4, true );
    punt.width = 150;
    punt.height = 60;
 },
};

function actionOnClickPunt (){
    click.play();
    juego.state.start('puntuation');
}

function actionOnClickJuego () {
    click.play();
    juego.state.start('tutorial');
}

function actionOnClickInfo(){
    click.play();
    juego.state.start('info');
}

function fullscreen(){

    if (this.game.scale.isFullScreen)
    {
        this.game.scale.stopFullScreen();
    }
    else
    {
        this.game.scale.startFullScreen(false);
    }
}



module.exports = menu; 