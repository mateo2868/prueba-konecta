<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;


class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(["users" => User::all()]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        // En la prueba no decia que campos eran obligatorios, asi que puse el campo direccion como no obligatorio 
        $request->validate([       
            'name' => 'required|string',
            'document' => 'required|string',
            'mail' => 'required|string',
            'direction' => 'string',
            'rol'=> 'required|int',
            'password' => 'required|string'
        ]);

        $user = new User();
        $user->name = $request->name;
        $user->document = $request->document;
        $user->mail = $request->mail;
        $user->direction = isset($request->direction) ? $request->direction: ''; // Si no existe direction retorna vacio;
        $user->rol = $request->rol;
        $user->password = bcrypt($request->password);
        $user->save();

        return response()->json(["status"=>true, "message"=> "Se registró correctamente"]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return json retorna un usuario
     */
    public function show($id)
    {
        return response()->json(["user" => User::find($id)]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return response()->json(["user" => User::find($id)]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::find($id);

        $user->nombre = $request->nombre;
        $user->documento = $request->documento;
        $user->correo = $request->correo;
        $user->direccion = isset($request->direccion) ? $request->direccion: '';
        $user->contrasena = $request->contrasena;

        $user->update();
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function login()
    {

    }
}
