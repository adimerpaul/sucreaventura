<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller{
    function index(Request $request){
        $user = $request->user();
        if($user->sucursal == 'Ayacucho'){
            return Producto::orderBy('nombre')
                ->with('productoCombo')
                ->where('agencia', $user->sucursal)
                ->get();
        }
        if($user->sucursal == 'Oquendo'){
            return Producto::orderBy('nombre')
                ->with('productoCombo')
                ->where('agencia', $user->sucursal)
                ->get();
        }

    }
    function store(Request $request){
        $producto = new Producto();
        $producto->nombre = $request->nombre;
        $producto->precio = $request->precio;
        $producto->stock = $request->stock;
        $producto->save();
        return $producto;
    }
    function update(Request $request, Producto $producto){
        $producto->nombre = $request->nombre;
        $producto->precio = $request->precio;
        $producto->stock = $request->stock;
        $producto->save();
        return $producto;
    }
    function destroy(Producto $producto){
        $count = $producto->ventas()->count();
        if($count > 0){
            return response()->json(['message' => 'No se puede eliminar el producto porque tiene ventas asociadas'], 400);
        }
        $producto->delete();
        return $producto;
    }
}
