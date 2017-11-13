//Script general para todos los objetos, que contendrán una posición y un sprite

"use strict"; //Pone el módulo en modo estricto 


///Constructro del objeto\\\
function objeto(entradax, entraday, entradasprite){

	this.posicion = {x: entradax, y: entraday};
	this.sprite = entradasprite;

}


//Metodo para cambiar la posicion del objeto
objeto.prototype.cambia_pos = function(newposx, newposy){
	
	this.posicion.x = newposx;
	this.posicion.y = newposy;
};

//Metodo para cambiar el sprite del objeto
objeto.prototype.cambia_sprite = function (newsprite) {

	this.sprite = newsprite;
};

module.exports.objeto = objeto;