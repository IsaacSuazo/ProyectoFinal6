/*
*  Para cuando inicie la pagina.
*/
$(document).ready(function(){
  //llenamos los select.
  llenarSelects();
  //iniciamos el slider y el video.
  inicializarSlider();
  playVideoOnScroll();

  /*
  *   Funcion para las busqueda del furmulario.
  */
  $("#formulario").submit(function(event) {
    event.preventDefault();
    var ciudadaSelect = $("#formulario").find("#selectCiudad").val();
    var tipoSelect = $("#formulario").find("#selectTipo").val();
    var desde = $("#rangoPrecio").data("from");
    var hasta = $("#rangoPrecio").data("to");
    var residenciasFiltradasPrecio = [];
    var residenciasFiltradas = [];

    $.ajax({
      url: "php/residencias.php",
      type: 'POST',
      success: function(respuesta){
        //convertimos la respuesta en un objeto jJSON.
        var residencias = JSON.parse(respuesta);
        $("#contResidencias").html("");

        //filtramos por precios para la busqueda.
        for (var i = 0; i < residencias.length; i++) {
          var entero = residencias[i].Precio.replace("$", "").replace(",", "");
          if((entero >= desde)&&(entero <= hasta)){
            residenciasFiltradasPrecio.push(residencias[i]);
          }
        }

        //filtros para los precios.
        if ((ciudadaSelect==null)&&(tipoSelect==null)) {
          residenciasFiltradas = residenciasFiltradasPrecio;
          for (var i=0; i<residenciasFiltradas.length; i++) {
            $("#contResidencias").append('<div class="itemMostrado card"><img src="img/home.jpg" height="200px"><ul><li><b>ID: </b>'+ residenciasFiltradas[i].Id +'</li><li><b>Direccion: </b>'+ residenciasFiltradas[i].Direccion +'</li><li><b>Ciudad: </b>'+ residenciasFiltradas[i].Ciudad +'</li><li><b>Telefono: </b>'+ residenciasFiltradas[i].Telefono +'</li><li><b>Codigo postal: </b>'+ residenciasFiltradas[i].Codigo_Postal +'</li><li><b>Tipo: </b>'+ residenciasFiltradas[i].Tipo +'</li><li><b>Precio: </b>'+ residenciasFiltradas[i].Precio +'</li></ul></div>');
          }
        }

        //filtros para las ciudades.
        if ((ciudadaSelect!=null)&&(tipoSelect==null)) {
          for (var i=0; i<residenciasFiltradasPrecio.length; i++) {
            if(residenciasFiltradasPrecio[i].Ciudad==ciudadaSelect){
              residenciasFiltradas.push(residenciasFiltradasPrecio[i]);
            }
          }
          for (var i=0; i<residenciasFiltradas.length; i++) {
            $("#contResidencias").append('<div class="itemMostrado card"><img src="img/home.jpg" height="200px"><ul><li><b>ID: </b>'+ residenciasFiltradas[i].Id +'</li><li><b>Direccion: </b>'+ residenciasFiltradas[i].Direccion +'</li><li><b>Ciudad: </b>'+ residenciasFiltradas[i].Ciudad +'</li><li><b>Telefono: </b>'+ residenciasFiltradas[i].Telefono +'</li><li><b>Codigo postal: </b>'+ residenciasFiltradas[i].Codigo_Postal +'</li><li><b>Tipo: </b>'+ residenciasFiltradas[i].Tipo +'</li><li><b>Precio: </b>'+ residenciasFiltradas[i].Precio +'</li></ul></div>');
          }
        }
        //filtros para los tipos de residencias.
        if ((ciudadaSelect==null)&&(tipoSelect!=null)) {
          for (var i=0; i<residenciasFiltradasPrecio.length; i++) {
            if(residenciasFiltradasPrecio[i].Tipo==tipoSelect){
              residenciasFiltradas.push(residenciasFiltradasPrecio[i]);
            }
          }
          for (var i=0; i<residenciasFiltradas.length; i++) {
            $("#contResidencias").append('<div class="itemMostrado card"><img src="img/home.jpg" height="200px"><ul><li><b>ID: </b>'+ residenciasFiltradas[i].Id +'</li><li><b>Direccion: </b>'+ residenciasFiltradas[i].Direccion +'</li><li><b>Ciudad: </b>'+ residenciasFiltradas[i].Ciudad +'</li><li><b>Telefono: </b>'+ residenciasFiltradas[i].Telefono +'</li><li><b>Codigo postal: </b>'+ residenciasFiltradas[i].Codigo_Postal +'</li><li><b>Tipo: </b>'+ residenciasFiltradas[i].Tipo +'</li><li><b>Precio: </b>'+ residenciasFiltradas[i].Precio +'</li></ul></div>');
          }
        }
        //aqui hacemos los filtros para las ciudades y tipos de residencias.
        if ((ciudadaSelect!=null)&&(tipoSelect!=null)) {
          for (var i=0; i<residenciasFiltradasPrecio.length; i++) {
            if((residenciasFiltradasPrecio[i].Ciudad==ciudadaSelect)&&(residenciasFiltradasPrecio[i].Tipo==tipoSelect)){
              residenciasFiltradas.push(residenciasFiltradasPrecio[i]);
            }
          }
          for (var i=0; i<residenciasFiltradas.length; i++) {
            $("#contResidencias").append('<div class="itemMostrado card"><img src="img/home.jpg" height="200px"><ul><li><b>ID: </b>'+ residenciasFiltradas[i].Id +'</li><li><b>Direccion: </b>'+ residenciasFiltradas[i].Direccion +'</li><li><b>Ciudad: </b>'+ residenciasFiltradas[i].Ciudad +'</li><li><b>Telefono: </b>'+ residenciasFiltradas[i].Telefono +'</li><li><b>Codigo postal: </b>'+ residenciasFiltradas[i].Codigo_Postal +'</li><li><b>Tipo: </b>'+ residenciasFiltradas[i].Tipo +'</li><li><b>Precio: </b>'+ residenciasFiltradas[i].Precio +'</li></ul></div>');
          }
        }

      }
    });

  });
  /*
  *   Fin de la Funcion para las busqueda del furmulario.
  */

});//fin del onready.


/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $("#rangoPrecio").ionRangeSlider({
    type: "double",
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: "$"
  });
}
/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}

/*
*   Metodo para el boton mostrar todos.
*/
$("#mostrarTodos").click(function() {
  $.ajax({
    url: "php/residencias.php",
    type: 'POST',
    success: function(respuesta){
      /*
      *  Aqui manipulamos la respuesta json para crear las cards con el contenido.
      */
      //convertimos la respuesta en un objeto jJSON.
      var residencias = JSON.parse(respuesta);
      $("#contResidencias").html("");
      for (var i=0; i<residencias.length; i++) {
        $("#contResidencias").append('<div class="itemMostrado card"><img src="img/home.jpg" height="200px"><ul><li><b>ID: </b>'+ residencias[i].Id +'</li><li><b>Direccion: </b>'+ residencias[i].Direccion +'</li><li><b>Ciudad: </b>'+ residencias[i].Ciudad +'</li><li><b>Telefono: </b>'+ residencias[i].Telefono +'</li><li><b>Codigo postal: </b>'+ residencias[i].Codigo_Postal +'</li><li><b>Tipo: </b>'+ residencias[i].Tipo +'</li><li><b>Precio: </b>'+ residencias[i].Precio +'</li></ul></div>');
      }
    }
  });
});

/*
*   metodos para llenar los Select.
*/
function llenarSelects() {
  $.ajax({
    url: "php/residencias.php",
    type: 'POST',
    success: function(respuesta){
      /*
      *  Aqui manipulamos la respuesta json para crear las cards con el contenido.
      */
      //convertimos la respuesta en un objeto jJSON.
      var residencias = JSON.parse(respuesta);
      //variables para las cuidades y los tipos.
      var tipo = [];
      var ciudad = [];
      //para llenar los arreglos
      for (var i=0; i<residencias.length; i++) {
        tipo.push(residencias[i].Tipo);
      }
      for (var i=0; i<residencias.length; i++) {
        ciudad.push(residencias[i].Ciudad);
      }

      //para obtener las Ciudades de las residencias.
      $.ajax({
        url: "php/DLCiudad.php",
        type: 'POST',
        data: {arrCiudad: ciudad},
        success: function(respuesta){
          //convertimos la respuesta en un objeto jJSON.
          var ciudadJson = JSON.parse(respuesta);
          DLCiudad = [];
          DLCiudad[0] = ciudadJson[0];
          DLCiudad[1] = ciudadJson[1];
          DLCiudad[2] = ciudadJson[2];
          DLCiudad[3] = ciudadJson[4];
          DLCiudad[4] = ciudadJson[7];
          DLCiudad[5] = ciudadJson[10];
          //llenamos el select.
          llenarSelectCiudad(DLCiudad);
        }
      });

      //para obtener los Tipos de residencias.
      $.ajax({
        url: "php/DLTipo.php",
        type: 'POST',
        data: {arrTipo: tipo},
        success: function(respuesta){
          //convertimos la respuesta en un objeto jJSON.
          var tipoJson = JSON.parse(respuesta);
          DLTipo = [];
          DLTipo[0] = tipoJson[0];
          DLTipo[1] = tipoJson[1];
          DLTipo[2] = tipoJson[7];
          //llenamos el select.
          llenarSelectTipos(DLTipo);
        }
      });
    }
  });
}
function llenarSelectCiudad(arr) {
  for (var i = 0; i < arr.length; i++) {
    $("#selectCiudad").append("<option value='"+ arr[i] +"'>"+ arr[i] +"</option>");
  }
}
function llenarSelectTipos(arr) {
  for (var i = 0; i < arr.length; i++) {
    $("#selectTipo").append("<option value='"+ arr[i] +"'>"+ arr[i] +"</option>");
  }
}
