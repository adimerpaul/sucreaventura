<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Route::get('/user', function (Request $request) {
//    return $request->user();
//})->middleware('auth:sanctum');
Route::post('/login', [App\Http\Controllers\UserController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [App\Http\Controllers\UserController::class, 'logout']);
    Route::get('/me', [App\Http\Controllers\UserController::class, 'me']);


    Route::get('/users', [App\Http\Controllers\UserController::class, 'index']);
    Route::post('/users', [App\Http\Controllers\UserController::class, 'store']);
    Route::put('/users/{user}', [App\Http\Controllers\UserController::class, 'update']);
    Route::delete('/users/{user}', [App\Http\Controllers\UserController::class, 'destroy']);
    Route::put('/updatePassword/{user}', [App\Http\Controllers\UserController::class, 'updatePassword']);
    Route::get('/usersSucursal', [App\Http\Controllers\UserController::class, 'usersSucursal']);

    Route::get('/reservas', [App\Http\Controllers\ReservaController::class, 'index']);
    Route::post('/reservas', [App\Http\Controllers\ReservaController::class, 'store']);
    Route::get('/reservasAll', [App\Http\Controllers\ReservaController::class, 'reservasAll']);
    Route::post('/reservasAnular', [App\Http\Controllers\ReservaController::class, 'anular']);
    Route::post('/reservasConfirmar', [App\Http\Controllers\ReservaController::class, 'confirmar']);


    Route::get('/productos', [App\Http\Controllers\ProductoController::class, 'index']);
    Route::post('/productos', [App\Http\Controllers\ProductoController::class, 'store']);
    Route::put('/productos/{producto}', [App\Http\Controllers\ProductoController::class, 'update']);
    Route::delete('/productos/{producto}', [App\Http\Controllers\ProductoController::class, 'destroy']);

    Route::get('/ventas', [App\Http\Controllers\VentaController::class, 'index']);
    Route::post('/ventas', [App\Http\Controllers\VentaController::class, 'store']);
    Route::put('/ventas/{venta}/anular', [App\Http\Controllers\VentaController::class, 'anular']);


    Route::post('/cajas', [App\Http\Controllers\CajaController::class, 'store']);
    Route::get('/verificarCaja', [App\Http\Controllers\CajaController::class, 'verificarCaja']);
    Route::post('/ventas/imprimir', [App\Http\Controllers\VentaController::class, 'imprimir']);

    Route::get('/metricas', [App\Http\Controllers\CajaController::class, 'metricas']);
});
