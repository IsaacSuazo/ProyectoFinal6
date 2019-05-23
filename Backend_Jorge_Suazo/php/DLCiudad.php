<?php

  //capturamos el post.
  $valor = $_POST['arrCiudad'];
  //eliminamos los valores duplicados.
  $arrCiudad = array_unique($valor);
  //convertimos en arreglo a json.
  $arrjson = json_encode($arrCiudad);
  //retornamos la respuesta.
  echo $arrjson;

 ?>
