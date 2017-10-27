//Script general para todos los objetos, que contendrán una posición y un sprite

"use strict"; //Pone el módulo en modo estricto (Para export)


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


/*var personaje = new objeto(0, 1, 'sprite1');

console.log(personaje.posicion.x);
console.log(personaje.posicion.y);
console.log(personaje.sprite);

personaje.cambia_pos(1, 2);
personaje.cambia_sprite('sprite2');

console.log(personaje.posicion.x);
console.log(personaje.posicion.y);
console.log(personaje.sprite);*/

module.exports.objeto = objeto;