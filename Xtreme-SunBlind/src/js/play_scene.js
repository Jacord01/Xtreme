'use strict';

var patata;
var tostadora;
var cursors;
var jumpButton;

var PlayScene = {
  create: function () {
  	this.stage.backgroundColor = '#124184';
    patata = this.add.sprite(50, 0, 'patata');

    game.physics.enable(sprite, Phaser.Physics.ARCADE);

    //patata.body.collideWorldBounds = true;
    //patata.body.gravity.y = 50;
    patata.scale.setTo(0.5, 0.5);

    tostadora = this.add.physicsGroup();

    //tostadora.create(500, 150, 'tostadora');
    tostadora.create(0, 1000, 'tostadora');
    tostadora.create(400, 450, 'tostadora');

    tostadora.setAll('body.immovable', true);
    tostadora.scale.setTo(1, 0.5);

    cursors = this.input.keyboard.createCursorKeys();
    jumpButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    update();
	}
};

function update(){

	console.log('llega');
	/* game.physics.arcade.collide(player, platforms);

    patata.body.velocity.x = 0;

    if (cursors.left.isDown)
    {
        patata.body.velocity.x = -250;
    }
    else if (cursors.right.isDown)
    {
        patata.body.velocity.x = 250;
    }

    if (jumpButton.isDown && (patata.body.onFloor() || patata.body.touching.down))
    {
        patata.body.velocity.y = -400;
    }*/
 
}




module.exports = PlayScene;
