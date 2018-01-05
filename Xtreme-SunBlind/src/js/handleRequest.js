'use strict';


var handleRequest = {};
	
handleRequest.Peticion = function(juego, pinta, mandaDatos){
 //Script sacado de la recopilación de varios sitios web. Con varios quiero decir MUCHISIMO.
   var httpRequest;
   if(mandaDatos) updateUser();

   function updateUser() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        data = JSON.parse(this.responseText);
        console.log(data);
        location.reload();
      }
    };
    var nombre = "Joaquina"; var punct = "50"; var nivel = "10";
    xhttp.open("POST", "https://services.devpgsv.com/lent_xtreme/update.php", true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send("nombre="+nombre+"&punct="+punct+"&nivel="+nivel);
  }

 if(pinta || !mandaDatos)
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