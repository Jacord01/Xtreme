'use strict';


var handleRequest = {};

var auxNombre;
	
handleRequest.Peticion = function(juego, pinta, mandaDatos, Datos){
 //Script sacado de la recopilación de varios sitios web. Con varios quiero decir MUCHISIMO.
 
  var httpRequest;
  var url = 'https://services.devpgsv.com/lent_xtreme/score.json';
  var puntuacionAnterior = 0;
  if(mandaDatos){
    //DATOS
    auxNombre = Datos[0];
    //console.log(auxNobre)
   makeRequest(auxNombre);
   setTimeout(function(){mandaInfo()}, 500);
  }

  else 
    makeRequest();
 
  function mandaInfo(){
    //El array de datos
    //console.log(daPuntos());
    var nombre = Datos[0];
    var punct = Datos[1];
    var nivel = Datos[2];
    //console.log(daPuntos());
    console.log(puntuacionAnterior);
    if(puntuacionAnterior > punct)
      punct = puntuacionAnterior;
    console.log (punct);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        var data = JSON.parse(this.responseText);
        console.log('Respuesta enviada con éxito');
        //location.reload();
      }
    };
    xhttp.open("POST", "https://services.devpgsv.com/lent_xtreme/update.php", true);
    xhttp.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhttp.send("nombre="+nombre+"&punct="+punct+"&nivel="+nivel);
  }

  function makeRequest(auxNombre) {
  	//console.log('Mensaje Enviado');
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert('No se puede crear la instancia.');
      return false;
    }
    
    httpRequest.onreadystatechange = function(){

          if (httpRequest.readyState === XMLHttpRequest.DONE) {
            if (httpRequest.status === 200) {

        //console.log('Ha llegado la respuesta.');
    var respuesta = JSON.parse(httpRequest.response);

    var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

    for(var i = 0; i < 10; i++){
      var nombre;
      var punct;
      if(respuesta.score[i] === undefined)
        nombre = "SIN DATOS";
      else 
        nombre = respuesta.score[i].nombre;

      if(respuesta.score[i] === undefined)
        punct = "0";
      else 
        punct = respuesta.score[i].punct;
      

      if (pinta){

        juego.add.text(300, 80 + i * 60, "NOMBRE:  " + nombre, style);
        juego.add.text(700, 80 + i * 60, "PUNTUACION:  " + punct, style);
      }

      //Vamos a ver si el nombre ya existe dentro del top 10 de puntuaciones. Si existe, guardamos su puntuación para despues
      //ver si pasamos los datos o no.
        if(mandaDatos && nombre === auxNombre){
          puntuacionAnterior = punct;
        }
      }
    

      } else {
        alert('Problema con la petición.');
      }
    }
  }
    };
    httpRequest.open('GET', url, true);
    httpRequest.send();

  }

module.exports = handleRequest;