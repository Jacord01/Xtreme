'use strict';


var handleRequest = {};
	
handleRequest.Peticion = function(juego, pinta, mandaDatos){
 //Script sacado de la recopilación de varios sitios web. Con varios quiero decir MUCHISIMO.
 
  var httpRequest;
  makeRequest();

  function makeRequest() {
  	//console.log('Mensaje Enviado');
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert('No se puede crear la instancia.');
      return false;
    }
    var url = 'https://services.devpgsv.com/lent_xtreme/score.json';
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open('GET', url, true);
    httpRequest.send();

  }

  function alertContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {

        //console.log('Ha llegado la respuesta.');
    var respuesta = JSON.parse(httpRequest.response);
    if(pinta){
  	var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

    for(var i = 0; i < 10; i++){
      var nombre;
      var punct;
      if(respuesta.score[i] === undefined)
        nombre = "SIN DATOS";
      else 
        nombre = respuesta.score[i].nombre;
    	juego.add.text(300, 100 + i * 50, "NOMBRE:  " + nombre, style);

      if(respuesta.score[i] === undefined)
        punct = "0";
      else 
        punct = respuesta.score[i].punct;
    	juego.add.text(700, 100 + i * 50, "PUNTUACION:  " + punct, style);
			}
		}

      } else {
        alert('Problema con la petición.');
      }
    }
  }

}


module.exports = handleRequest;