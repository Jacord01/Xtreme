'use strict';


var handleRequest = {};
	
handleRequest.Peticion = function(juego, pinta, mandaDatos){
 //Script sacado de la recopilación de varios sitios web. Con varios quiero decir MUCHISIMO.
  var httpRequest;
  var tipo;
  if(!mandaDatos) tipo = 'GET';
  else if (mandaDatos) tipo = 'POST';
  makeRequest();

  function makeRequest() {
  	//console.log('Mensaje Enviado');
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert('No se puede crear la instancia.');
      return false;
    }
    var url = 'https://services.devpgsv.com/lent_xtreme/score.json';
    if(!mandaDatos){
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open(tipo, url, true);
    httpRequest.send();
    }

    else if(mandaDatos){
    var nombre = "Joaquina"; var punct = 50; var nivel = 10;
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open("POST", url, true);
    httpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    httpRequest.send("nombre="+nombre+"&punct="+punct+"&nivel="+nivel);
    }

  }
  function alertContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {

        //console.log('Ha llegado la respuesta.');
    var respuesta = JSON.parse(httpRequest.response);
    if(mandaDatos)
      console.log('Datos mandados con exito');

    if(pinta){
  	var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

    //  The Text is positioned at 0, 100
    for(var i = 0; i < 10; i++){
    
    	juego.add.text(300, 100 + i * 50, "NOMBRE:  " + respuesta.score[i].nombre, style);

    	juego.add.text(700, 100 + i * 50, "PUNTUACION:  " + respuesta.score[i].punct, style);
			}
		}
       else {
        alert('Problema con la petición.');
      }
    }
  }
}
}


module.exports = handleRequest;