'use strict';

var game = new Phaser.Game(1280, 720, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });


function preload() {

    game.stage.backgroundColor = '#1ff';

    game.load.image('player', 'images/original.png');
    game.load.image('tostadora', 'images/tostadora.png');

}

var jugador;
var plats = []; plats.length = 7;
var enemigo;
var plataformas; 
var i = 0;
var objeto;
var herencia;
function create() {

  objeto = new GO(0,0,'');

    game.physics.startSystem(Phaser.Physics.ARCADE);


      //CREAMOS AL JUGADOR
    jugador = new GO(0,0,'player');
    game.physics.enable(jugador.objeto, Phaser.Physics.ARCADE);
    jugador.reescala_imagen(0.2, 0.2);
    
    jugador.objeto.body.collideWorldBounds = false;

    jugador.objeto.body.gravity.y = 3000;

      //Creamos las plataformas

      plataformas = game.add.group();

      for(var i = 0; i < 8; i++){
          plats[i] = new GO(0,0,'tostadora');
          plats[i].reescala_imagen(0.1,0.1);
          game.physics.enable(plats[i].objeto, Phaser.Physics.ARCADE);
          plats[i].objeto.body.immovable = true;
          plataformas.add(plats[i].objeto);
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
      //Creamos un enemigo para probar

      enemigo = new movible();
      game.physics.enable(enemigo.herencia.objeto, Phaser.Physics.ARCADE);
      enemigo.herencia.reescala_imagen(0.2,0.2);
      enemigo.herencia.objeto.body.gravity.y = 2000;
      

} 

function update () {

  //Para que choce el personaje con las plataformas
 
    game.physics.arcade.collide(jugador.objeto, plataformas);
    game.physics.arcade.collide(plataformas, enemigo.herencia.objeto);

  //Si no hay in put, es que estamos quietos jejeje
     jugador.objeto.body.velocity.x = 0;


     //***INPUTS***\\
    if(game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
        jugador.objeto.body.velocity.x = -1000;
      }

    else if(game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
      jugador.objeto.body.velocity.x = 1000;
     

    }

     if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR) && (
      jugador.objeto.body.onFloor() || jugador.objeto.body.touching.down)){
       jugador.objeto.body.velocity.y = -1300;
     
       
      }

      //Aquí actualizamos la posición del objeto jugador en su clase si es que se ha movido
      if( jugador.objeto.body.velocity.x != 0 ||  jugador.objeto.body.velocity.y != 0){
         jugador.cambia_pos(jugador.objeto.x, jugador.objeto.y);
       }



        if(enemigo.herencia.objeto.body.velocity.x != 0 || enemigo.herencia.objeto.body.velocity.y != 0){
        enemigo.herencia.cambia_pos(enemigo.herencia.objeto.x, enemigo.herencia.objeto.y)
}
        enemigo.actualiza_pos(5, 0);
}

function render () {

}


//****************FUNCION OBJETO******************\\


function GO(entradax, entraday, entradasprite){


  this.posicion = {x: entradax, y: entraday};
  this.sprite = entradasprite;
  this.objeto = game.add.sprite(this.posicion.x,this.posicion.y,this.sprite);
  
}

//Metodo para cambiar la posicion del objeto
GO.prototype.cambia_pos = function(newposx, newposy){
  
       this.objeto.x =  newposx % 1280; 
  if(this.objeto.x <0 )
    this.objeto.x = 1280;
  //this.objeto.x = newposx; 
  this.objeto.y = newposy;
  this.posicion.x =  newposx;
  this.posicion.y = newposy;
 
};

//Metodo para cambiar el sprite del objeto
GO.prototype.cambia_sprite = function (newsprite) {

  //this.objeto = game.remove.sprite(this.posicion.x,this.posicion.y,this.sprite);
  this.sprite = newsprite;
  this.objeto = game.add.sprite(this.posicion.x,this.posicion.y,this.sprite);
};

//Metodo para reescalar la imagen que queramos
GO.prototype.reescala_imagen = function (x, y){

  this.objeto.scale.setTo(x,y);
}


//*************FUNCION MOVIBLE**************************\\
function movible(){

  this.herencia = Object.create(objeto);
  this.herencia.cambia_sprite('tostadora');
  this.velocity = {vx: 0, vy: 0};
  this.direction = 0;
}

//Metodo para aplicar la velocidad
movible.prototype.actualiza_pos = function(vx, vy){

  this.herencia.cambia_pos(this.herencia.posicion.x += vx,   this.herencia.posicion.y += vy);

};

//***************************************************************\\

