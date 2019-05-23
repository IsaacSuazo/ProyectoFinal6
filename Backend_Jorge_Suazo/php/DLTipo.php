<?php

  //capturamos el post.
  $valor = $_POST['arrTipo'];
  //eliminamos los valores duplicados.
  $arrTipo = array_unique($valor);
  //convertimos en arreglo a json.
  $arrjson = json_encode($arrTipo);
  //retornamos la respuesta.
  echo $arrjson;

 ?>
