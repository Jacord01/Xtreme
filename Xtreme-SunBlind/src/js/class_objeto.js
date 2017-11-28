//Script general para todos los objetos, que contendrán una posición y un sprite

"use strict"; //Correción en modo estricto


var juego = require('./main');
//****************CLASS OBJETO******************\\
var GO = 
function(entradax, entraday, entradasprite){
  this.posicion = {x: entradax, y: entraday};
  this.sprite = entradasprite;
  this.fisica = juego.game.add.sprite(this.posicion.x,this.posicion.y,this.sprite);
}
//Metodo para cambiar la posicion del objeto
GO.prototype.cambia_pos = function(newposx, newposy){
  this.fisica.x =  newposx % 1280; 
  if(this.fisica.x <0 )
  
    this.fisica.x = 1280; 
  this.fisica.y =  newposy % 720; 
  if(this.fisica.y <0 )
    this.fisica.y = 720; 
  this.posicion.x =  newposx;
  this.posicion.y = newposy;
};

//Metodo para cambiar el sprite del objeto
GO.prototype.cambia_sprite = function (newsprite) {
  //this.objeto = game.remove.sprite(this.posicion.x,this.posicion.y,this.sprite);
  this.sprite = newsprite;
  this.fisica = juego.game.add.sprite(this.posicion.x,this.posicion.y,this.sprite);
};

//Metodo para reescalar la imagen que queramos
GO.prototype.reescala_imagen = function (x, y){
  this.fisica.scale.setTo(x,y);
};


module.exports = GO;