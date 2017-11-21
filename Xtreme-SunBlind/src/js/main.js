'use strict';

/**
 * Generated from the Phaser Sandbox
 *
 * //phaser.io/sandbox/ljYYfSmV
 *
 * This source requires Phaser 2.6.2
 */

var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });


function preload() {

    game.stage.backgroundColor = '#1ff';

   //game.load.baseURL = 'http://examples.phaser.io/assets/';
    //game.load.crossOrigin = 'anonymous';

    game.load.image('player', 'images/original.png');
    game.load.image('platform', 'images/tostadora.png');

}

var player;
var platforms;
var cursors;
var jumpButton;

function create() {

    player = game.add.sprite(250, 500, 'player');
    player.scale.setTo(0.2, 0.2) ;

    game.physics.arcade.enable(player);

    player.body.collideWorldBounds = true;
    player.body.gravity.y = 400;

    platforms = game.add.physicsGroup();
    platforms.scale.setTo(1, 0.1);

   
    platforms.create(-300, 4000, 'platform');
    platforms.create(600, 4000, 'platform');

   
    platforms.create(-450, 2800, 'platform');
    platforms.create(750, 2800, 'platform');

    platforms.create(150, 2500, 'platform');

    platforms.create(-150, 1000, 'platform');
    platforms.create(500, 1000, 'platform');

    platforms.create(0,5500, 'platform');
    platforms.create(500,5500, 'platform');


    platforms.setAll('body.immovable', true);

    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}

function update () {

  //console.log(player.position);
    game.physics.arcade.collide(player, platforms);

    player.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        player.body.velocity.x = -250;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 250;
    }

    if (jumpButton.isDown && (player.body.onFloor() || player.body.touching.down))
    {
        player.body.velocity.y = -400;
    }
}

function render () {

}




/*var PlayScene = require('./play_scene.js');


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

  }
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

module.exports = game;*/