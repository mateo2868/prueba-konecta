<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\User;


class UserController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(["users" => User::all(), "rol" => auth()->user()->rol]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if(auth()->user()->rol === 3 ) {
            return response()->json(["message"=>"El usuario no tiene permisos para registrar"], 400);
        }
        // En la prueba no decia que campos eran obligatorios, asi que puse el campo direccion como no obligatorio
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'document' => 'required|string',
            'mail' => 'required|string|email|unique:users',
            'direction' => 'string',
            'rol'=> 'required|int',
            'password' => 'required|string'
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        if (($request->rol === 1 || $request->rol === 2) && auth()->user()->rol === 2 ) {
            return response()->json(["message"=> "Solo puede crear clientes"], 400);
        }

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
    public function show()
    {
        return response()->json(User::find(auth()->user()->id));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return response()->json(User::find($id));
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
        if(auth()->user()->rol === 3 ) {
            return response()->json(["message"=>"El usuario no tiene permisos para actualizar"], 400);
        }
        // En la prueba no decia que campos eran obligatorios, asi que puse el campo direccion como no obligatorio
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'document' => 'required|string',
            'mail' => 'required|string|email',
            'direction' => 'string',
            'rol'=> 'required|int',
        ]);

        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        if (($request->rol === 1 || $request->rol === 2) && auth()->user()->rol === 2 ) {
            return response()->json(["message"=> "Solo puede crear clientes"], 400);
        }

        $user = User::find($id);
        $user->name = $request->name;
        $user->document = $request->document;
        $user->mail = $request->mail;
        $user->direction = isset($request->direction) ? $request->direction: ''; // Si no existe direction retorna vacio;
        $user->rol = $request->rol;
        $user->save();

        return response()->json(["status"=>true, "message"=> "Se Actualizó correctamente"]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $user = User::find($id)->delete();
        return response()->json(["message" => "Le eliminó correctamente"]);
    }

    public function login()
    {

    }
}
