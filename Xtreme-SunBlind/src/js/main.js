'use strict';
//rezando

var game = new Phaser.Game(1280, 720, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });


function preload() {

    //game.stage.backgroundColor = '#1ff';

    game.load.image('player', 'images/original.png');
    game.load.image('tostadora', 'images/tostadora.png');
    game.load.image('fond', 'images/Olaya.png');
}

var jugador;
var plats = []; plats.length = 7;
var plataformas; 

var enem = []; enem.length = 2;
var enemigos;

var colliderEnemigos;

var i = 0;
var objeto;
var herencia;
var back;
var temporizador;

function create() {

//Temporizador para el juego en general
temporizador = game.time.create(false);

//Imagen de fondo de pantalla
 back = new GO(0,0,'fond');
 back.reescala_imagen(1,1.2);


//Activamos la física del juego
  game.physics.startSystem(Phaser.Physics.ARCADE);


      //CREAMOS AL JUGADOR

    jugador = new movible();
    jugador.herencia.cambia_sprite('player');
    jugador.herencia.reescala_imagen(0.2,0.2);
    game.physics.enable(jugador.herencia.fisica, Phaser.Physics.ARCADE);
    jugador.herencia.fisica.body.gravity.y = 3000;
    jugador.herencia.cambia_pos(300,650);

      //Creamos las plataformas

      plataformas = game.add.group();

      for(var i = 0; i < 8; i++){
          plats[i] = new GO(0,0,'tostadora');
          plats[i].reescala_imagen(0.1,0.1);
          game.physics.enable(plats[i].fisica, Phaser.Physics.ARCADE);
          plats[i].fisica.body.immovable = true;
          plataformas.add(plats[i].fisica);
      }

      //Tenemos que colocar ahora cada una de las 7 plataformas en su posición
      plats[0].cambia_pos(0,150);
      plats[0].reescala_imagen(1.1,0.1);

      plats[1].cambia_pos(700,150);
      plats[1].reescala_imagen(1.2,0.1);
      
      plats[2].cambia_pos(390,300);
      plats[2].reescala_imagen(1,0.1);

      plats[3].cambia_pos(0,340);
      plats[3].reescala_imagen(0.5,0.1);

      plats[4].cambia_pos(1030,340);
      plats[4].reescala_imagen(0.5,0.1);

      plats[5].cambia_pos(0,500);
      plats[5].reescala_imagen(1,0.1);

      plats[6].cambia_pos(780,500);
      plats[6].reescala_imagen(1,0.1);

      plats[7].cambia_pos(0,700);
      plats[7].reescala_imagen(2.6,0.1);


      //Creamos enemigos

        enemigos = game.add.group();

        for(var i = 0; i < 2; i++){
          enem[i] = new movible();
          enem[i].herencia.cambia_sprite('tostadora');
          enem[i].herencia.reescala_imagen(0.1,0.1);
          game.physics.enable(enem[i].herencia.fisica, Phaser.Physics.ARCADE);
          enem[i].herencia.fisica.body.gravity.y = 2000;
          enemigos.add(enem[i].herencia.fisica);
      }     

      //Colliders para que enemigos vuelvan a su sitio

      colliderEnemigos = new GO(0,600, 'tostadora');
      colliderEnemigos.reescala_imagen(0.1,0.2);
      game.physics.enable(colliderEnemigos, Phaser.Physics.ARCADE);
      colliderEnemigos.fisica.body.immovable = true;
} 

function update () {

  //Para que choce el personaje con las plataformas
 
    game.physics.arcade.collide(jugador.herencia.fisica, plataformas);
    game.physics.arcade.collide(plataformas, enemigos);
    game.physics.arcade.collide(jugador.herencia.fisica, enemigos, collisionHandler);
    game.physics.arcade.collide(jugador.herencia.fisica, colliderEnemigos.fisica);
  //Si no hay in put, es que estamos quietos jejeje
     jugador.herencia.fisica.body.velocity.x = 0;


     //***INPUTS***\\
    if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
        jugador.herencia.fisica.body.velocity.x = -1000;
      }

    else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
      jugador.herencia.fisica.body.velocity.x = 1000;
     

    }

     if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && (
      jugador.herencia.fisica.body.onFloor() || jugador.herencia.fisica.body.touching.down)){
       jugador.herencia.fisica.body.velocity.y = -1300;
     
       
      }

      //Aquí actualizamos la posición del objeto jugador en su clase si es que se ha movido
      if( jugador.herencia.fisica.body.velocity.x != 0 ||  jugador.herencia.fisica.body.velocity.y != 0){
         jugador.herencia.cambia_pos(jugador.herencia.fisica.x, jugador.herencia.fisica.y);
       }



       for(var i = 0; i < 2; i++){
        if(enem[i].herencia.fisica.body.velocity.x != 0 || enem[i].herencia.fisica.body.velocity.y != 0){
          enem[i].herencia.cambia_pos(enem[i].herencia.fisica.x, enem[i].herencia.fisica.y)
          }


      }

        enem[0].actualiza_pos(5, 0);
        enem[1].actualiza_pos(-5,0);
 
}

function render () {

  game.debug.body(colliderEnemigos.fisica);
  game.debug.body(jugador.herencia.fisica);
  for(var i = 0; i<2; i++)
  game.debug.body(enem[i].herencia.fisica);

}


function collisionHandler(){

//Esta parte de aquí mata al jugador y a los enemigos cuando chocan entre si

  jugador.herencia.fisica.kill();

  for(var i = 0; i<2; i++)
  enem[i].herencia.fisica.kill();

  temporizador.loop(2000, revive, this);
  temporizador.start();
  
}


function revive(){
  jugador.herencia.fisica.reset(300,650);
  for(var i = 0; i<2; i++)
    enem[i].herencia.fisica.reset(0,0);

  enem[0].herencia.cambia_pos(0,0);
  enem[1].herencia.cambia_pos(1200,0);
  temporizador.stop();
}


//****************CLASS OBJETO******************\\


function GO(entradax, entraday, entradasprite){


  this.posicion = {x: entradax, y: entraday};
  this.sprite = entradasprite;
  this.fisica = game.add.sprite(this.posicion.x,this.posicion.y,this.sprite);
  
}

//Metodo para cambiar la posicion del objeto
GO.prototype.cambia_pos = function(newposx, newposy){
  
       this.fisica.x =  newposx % 1280; 
  if(this.fisica.x <0 )
    this.fisica.x = 1280;
  //this.objeto.x = newposx; 
  this.fisica.y = newposy;
  this.posicion.x =  newposx;
  this.posicion.y = newposy;
 
};

//Metodo para cambiar el sprite del objeto
GO.prototype.cambia_sprite = function (newsprite) {

  //this.objeto = game.remove.sprite(this.posicion.x,this.posicion.y,this.sprite);
  this.sprite = newsprite;
  this.fisica = game.add.sprite(this.posicion.x,this.posicion.y,this.sprite);
};

//Metodo para reescalar la imagen que queramos
GO.prototype.reescala_imagen = function (x, y){

  this.fisica.scale.setTo(x,y);
}


//*************CLASS MOVIBLE**************************\\
function movible(){

  this.herencia = new GO(0,0, '');
  //this.herencia.cambia_sprite('tostadora');
  this.velocity = {vx: 0, vy: 0};
  this.direction = 0;
}

//Metodo para aplicar la velocidad
movible.prototype.actualiza_pos = function(vx, vy){

  this.herencia.cambia_pos(this.herencia.posicion.x += vx,   this.herencia.posicion.y += vy);

};

//***************************************************************\\

