<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use Illuminate\Http\Request;

class ProductoController extends Controller{
    private function normalizarAgencia(?string $agencia): ?string
    {
        if (!$agencia) {
            return null;
        }
        if ($agencia === 'Ayacucho') {
            return 'Central';
        }
        if ($agencia === 'Oquendo') {
            return 'Ricardo';
        }
        return $agencia;
    }

    function index(Request $request){
        $user = $request->user();
        $agencia = $this->normalizarAgencia($request->agencia) ?? $this->normalizarAgencia($user->sucursal);
        if (!$agencia || !in_array($agencia, ['Central', 'Ricardo'])) {
            return response()->json(['message' => 'Agencia inválida'], 422);
        }
        return Producto::orderBy('nombre')
            ->with('productoCombo')
            ->where('agencia', $agencia)
            ->get();
    }
    function store(Request $request){
        $user = $request->user();
        $agencia = $user->role === 'Admin'
            ? ($this->normalizarAgencia($request->agencia) ?? $this->normalizarAgencia($user->sucursal))
            : $this->normalizarAgencia($user->sucursal);
        if (!$agencia || !in_array($agencia, ['Central', 'Ricardo'])) {
            return response()->json(['message' => 'Agencia inválida'], 422);
        }
        $producto = new Producto();
        $producto->nombre = $request->nombre;
        $producto->precio = $request->precio;
        $producto->stock = $request->stock;
        $producto->agencia = $agencia;
        $producto->save();
        return $producto;
    }
    function update(Request $request, Producto $producto){
        $user = $request->user();
        $agencia = $user->role === 'Admin'
            ? ($this->normalizarAgencia($request->agencia) ?? $this->normalizarAgencia($user->sucursal))
            : $this->normalizarAgencia($user->sucursal);
        if (!$agencia || !in_array($agencia, ['Central', 'Ricardo'])) {
            return response()->json(['message' => 'Agencia inválida'], 422);
        }
        if ($user->role !== 'Admin' && $producto->agencia !== $user->sucursal) {
            return response()->json(['message' => 'No autorizado para modificar productos de otra agencia'], 403);
        }
        $producto->nombre = $request->nombre;
        $producto->precio = $request->precio;
        $producto->stock = $request->stock;
        $producto->agencia = $agencia;
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
