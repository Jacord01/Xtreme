//Script general para todos los objetos, que contendrán una posición y un sprite

"use strict"; //Pone el módulo en modo estricto 


//****************CLASS OBJETO******************\\

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

module.exports.GO = GO;