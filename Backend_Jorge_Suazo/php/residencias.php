<?php

  //invocamos el archivo json.
  $archivo = file_get_contents("../data-1.json");
  //convertimos el json a un arreglo.
  $arreglo = json_decode($archivo);
  //convertimos en arreglo a json.
  $arrjson = json_encode($arreglo);
  //enviamos el archivo json como respuesta.
  echo $arrjson;

 ?>
