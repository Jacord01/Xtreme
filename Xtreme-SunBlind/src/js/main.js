'use strict';

var PlayScene = require('./play_scene.js');


var BootScene = {
  preload: function () {
    // Hacemos las cosas necesarias para la primera pantalla de carga
    //Ahora mismo está vacío porque no tenemos nada que hacer en la pantalla de carga
   
  },
    //Aquí vamos a llamar a la siguiente función, la de carga anterior al juego
  create: function () {
    this.game.state.start('preloader');
  }
};


var PreloaderScene = {
  preload: function () {
    //Color de fondo
    //game.stage.backgroundColor = '#f0ff';

    //Carga assets?
     //game.load.baseURL = 'http://examples.phaser.io/assets/';
     //game.load.crossOrigin = 'anonymous';

    //carganos una imagen
      this.game.load.image('patata','images/original.png' );
      this.game.load.image('tostadora', 'images/tostadora.png');
      console.log('Todo bien');
  },

//Cuando ya hemos cargado todo lo necesario, inciamos el juego en "play_scene.js"
  create: function () {
    this.game.state.start('play');
  }
};


window.onload = function () {

  console.log('primero');
  //Cuando carga la ventana: Crea la variable juego
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

  //Añadimos los estados que vamos a necesitar, en este caso el arranque,
  //que es para la pantalla de carga, el Preload que es la carga anterior al juego
  //y finalmente el juego en sí.
  game.state.add('boot', BootScene);
  game.state.add('preloader', PreloaderScene);
  game.state.add('play', PlayScene);

  //Después de crearlas, llamamos al boot

  game.state.start('boot');
};

module.exports = game;