<?php

require_once 'modelojson.php';
/**
 *
 */
class ControllerJson
{
	#usuarios
	public function createUsuarioController($fullname, $username, $password, $secretpin){

		$datosController = array("fullname"=>$fullname,
			"username"=>$username,
			"password"=>$password,
			"secretpin"=>$secretpin
			);
		
		$datos = new Datos();
		$respuesta = $datos->createUsuarioModel($datosController, "users");
		return $respuesta;
	}

	public function readUsuariosController(){
		
		$datos = new Datos();
		$respuesta = $datos->readUsuarioModel("users");

		return $respuesta;
	}

	public function updateUsuariosController($id, $password){

		$datosController = array("id"=>$id, "password"=>$password);
		$respuesta = Datos::updateUsuarioModel($datosController, "users");
		return $respuesta;

	}

	public function deleteUsuariosController($id){

		//$respuesta = Datos::deleteUsuarioModel($id, "users");
		$datos = new Datos();
		$respuesta = $datos->deleteUsuarioModel($id, "users");
		return $respuesta;

	}

	public function loginUsuarioController($username, $password){

		$datosController = array("username" => $username,
			"password"=>$password);

		$datos = new Datos();
		$respuesta = $datos->loginUsuarioModel($datosController, "users");
		//$respuesta = Datos::loginUsuarioModel($datosController, "users");
		return $respuesta;
	}
}
?>