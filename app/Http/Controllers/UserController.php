<?php

namespace App\Http\Controllers;

use App\Models\user;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {

        // Si no es una solicitud AJAX, renderizar la vista Blade con los usuarios
        return view('users.index');
    }

    public function getUsersJson(Request $request)
    {
        // Obtener la búsqueda del parámetro
        $search = $request->input('search');

        // Obtener los usuarios filtrados por búsqueda y paginados
        $users = User::when($search, function ($query) use ($search) {
            $query->where('name', 'like', '%' . $search . '%')
                ->orWhere('email', 'like', '%' . $search . '%');
        })->paginate(10);

        // Devolver los usuarios en formato JSON
        return response()->json($users);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        /* responder por json si los campos se repiten */

        if (User::where('email', $request->email)->exists()) {
            return response()->json([
                'error' => 'El email ya existe'
            ]);
        }

        // Crear un nuevo usuario
        $user = new User();

        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);

        $user->assignRole($request->role);

        $user->save();

        return response()->json([
            'message' => 'successfully'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(user $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(user $user)
    {

        return response()->json($user);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, user $user)
    {

        // Actualizar el usuario
        $user = User::find($user->id);


        //validar que no sea duplique el email con otro usuario pero que si lo deje pasar si es del mismo usuario

        if (User::where('email', $request->email)->where('id', '!=', $user->id)->exists()) {
            return response()->json([
                'error' => 'El email ya existe'
            ]);
        }

        $user->name = $request->name;
        $user->email = $request->email;



        $user->save();

        return response()->json([
            'message' => 'successfully'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(user $user)
    {

        // Eliminar el usuario
        $user = User::find($user->id);

        $user->delete();

        return response()->json([
            'message' => 'successfully'
        ]);
    }
}
