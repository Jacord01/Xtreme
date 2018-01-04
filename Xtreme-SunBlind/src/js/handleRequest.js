'use strict';


var handleRequest = {};
	
handleRequest.Peticion = function(juego, pinta, mandaDatos){
 //Script sacado de la recopilación de varios sitios web. Con varios quiero decir MUCHISIMO.
  var httpRequest;
  var httpRequest2;
  if(!mandaDatos)
  makeRequest1();
  else if(mandaDatos)
    makeRequest2();

  function makeRequest1() {
  	//console.log('Mensaje Enviado');
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert('No se puede crear la instancia.');
      return false;
    }
    var url = 'https://jacord01.github.io/Xtreme/Xtreme-SunBlind/src/scores.json';
    httpRequest.onreadystatechange = alertContents1;
    httpRequest.open('GET', url);

    httpRequest.send();

  }

   function makeRequest2() {
    //console.log('Mensaje Enviado');
    httpRequest2 = new XMLHttpRequest();

    if (!httpRequest2) {
      alert('No se puede crear la instancia.');
      return false;
    }
    var url = 'https://jacord01.github.io/Xtreme/Xtreme-SunBlind/src/scores.json';
    httpRequest2.open('GET', url);
    httpRequest2.setRequestHeader("Content-type", "application/json");
    httpRequest2.onreadystatechange = 
    function () {
    if (httpRequest2.readyState === XMLHttpRequest.DONE) {
      if (httpRequest2.status === 200) {

        //console.log('Ha llegado la respuesta.');
      var respuesta = JSON.parse(httpRequest2.response);
      respuesta.score[2].nombre = "PEPITO";

      console.log("llega2");
      httpRequest2.send( JSON.stringify(respuesta));
    

      } else {
        alert('Problema con la petición.');
      }
    }
  }
    //httpRequest.send();
  }

  function alertContents1() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {

        //console.log('Ha llegado la respuesta.');
    var respuesta = JSON.parse(httpRequest.response);
    if(pinta){
  	var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

    //  The Text is positioned at 0, 100

    for(var i = 0; i < 10; i++){
    	juego.add.text(300, 100 + i * 50, "NOMBRE:  " + respuesta.score[i].nombre, style);
    	juego.add.text(700, 100 + i * 50, "PUNTUACION:  " + respuesta.score[i].punct, style);
			}
		}
  		/*console.log("Visitas a la pagina: " + respuesta.Visitas)
        console.log(respuesta.score[1].nombre);
        console.log(respuesta.score[1].punct);*/

      } else {
        alert('Problema con la petición.');
      }
    }
  }

}


module.exports = handleRequest;