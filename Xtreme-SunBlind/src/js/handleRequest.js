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
      if(respuesta.score[i] === undefined)
        respuesta.score[i].nombre = "SIN DATOS";
    	juego.add.text(300, 100 + i * 50, "NOMBRE:  " + respuesta.score[i].nombre, style);
      if(respuesta.score[i] === undefined)
        respuesta.score[i] === "0";
    	juego.add.text(700, 100 + i * 50, "PUNTUACION:  " + respuesta.score[i].punct, style);
			}
		}

      } else {
        alert('Problema con la petición.');
      }
    }
  }

}


module.exports = handleRequest;