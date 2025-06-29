<?php

namespace App\Http\Controllers;

use App\Models\Caja;
use App\Models\Detalle;
use App\Models\Producto;
use App\Models\ProductoCombo;
use App\Models\Reserva;
use App\Models\Venta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class VentaController extends Controller{
    function imprimir(Request $request){
        $user = $request->user();
        $agencia = $user->sucursal;
        $user_id = $request->user_id;
        $fechaInicio = $request->fechaInicio;
        $fechaFin = $request->fechaFin;
        $reporte = $request->reporte;
        if ($reporte == 'CAJA'){
            $ventasSum = Venta::whereDate('fecha', '>=', $fechaInicio)
                ->whereDate('fecha', '<=', $fechaFin)
                ->where('user_id', $user_id)
                ->where('anulada', 0)
                ->sum('total');
            $reservasSumAdelanto = Reserva::whereDate('fecha', '>=', $fechaInicio)
                ->whereDate('fecha', '<=', $fechaFin)
                ->where('user_id', $user_id)
                ->whereRaw("(estado = 'Finalizado' OR estado = 'Reservado')")
                ->sum('adelanto');
            $reservasSumSaldo = Reserva::whereDate('fecha', '>=', $fechaInicio)
                ->whereDate('fecha', '<=', $fechaFin)
                ->where('user_confirmado_id', $user_id)
                ->whereRaw('(estado = "Finalizado" OR estado = "Reservado")')
                ->sum('saldo');
            $cajas = Caja::whereDate('fecha_cierre', '>=', $fechaInicio)
                ->whereDate('fecha_cierre', '<=', $fechaFin)
                ->where('user_id', $user_id)
                ->get();
            $reservasSum = $reservasSumAdelanto + $reservasSumSaldo;

            return response()->json(['ventas' => $ventasSum, 'reservas' => $reservasSum, 'cajas' => $cajas]);

        }else if ($reporte == 'PRODUCTOS'){

            $productos = Producto::join('detalles', 'productos.id', '=', 'detalles.producto_id')
                ->join('ventas', 'detalles.venta_id', '=', 'ventas.id')
                ->whereDate('ventas.fecha', '>=', $fechaInicio)
                ->whereDate('ventas.fecha', '<=', $fechaFin)
                ->where('ventas.user_id', $user_id)
                ->where('ventas.anulada', 0)
                ->select('productos.id','productos.nombre', 'productos.precio', DB::raw('SUM(detalles.cantidad) as cantidad_total'))
                ->groupBy('productos.id','productos.nombre', 'productos.precio')
                ->get();

            if ($agencia == 'Ayacucho'){
                $gaseosa_id = 3;
                $pipoca_id = 14;
                $frappe_id = 30;
            }
            if ($agencia == 'Oquendo'){
                $gaseosa_id = 98;
                $pipoca_id = 109;
                $frappe_id = 125;
            }

            $productosComboRes = [];

            $productosGaseosaRes = [];
            $productosPipocaRes = [];
            $productosFrapeRes = [];
            for ($i = 0; $i < count($productos); $i++){
                $productoCombo = ProductoCombo::where('producto_padre_id', $productos[$i]->id)->get();
                if(count($productoCombo) > 0){
                    foreach ($productoCombo as $productoHijo){
                        $productoHijoFind = Producto::find($productoHijo->producto_hijo_id);
                        $productosComboRes[] = [
                            'id' => $productoHijoFind->id,
                            'nombre' => $productoHijoFind->nombre.' ('.$productos[$i]->nombre.')',
//                            'precio' => $productos[$i]->precio,
                            'precio' => 0,
                            'cantidad_total' => $productos[$i]->cantidad_total * $productoHijo->cantidad
                        ];
                        if ($productoHijoFind->id == $gaseosa_id){
                            $productosGaseosaRes[] = [
                                'id' => $productoHijoFind->id,
                                'nombre' => $productoHijoFind->nombre.' ('.$productos[$i]->nombre.')',
                                'precio' => 0,
                                'cantidad_total' => $productos[$i]->cantidad_total * $productoHijo->cantidad
                            ];
                        }
                        if ($productoHijoFind->id == $pipoca_id) {
                            $productosPipocaRes[] = [
                                'id' => $productoHijoFind->id,
                                'nombre' => $productoHijoFind->nombre . ' (' . $productos[$i]->nombre . ')',
                                'precio' => 0,
                                'cantidad_total' => $productos[$i]->cantidad_total * $productoHijo->cantidad
                            ];
                        }
                        if ($productoHijoFind->id == $frappe_id) {
                            $productosFrapeRes[] = [
                                'id' => $productoHijoFind->id,
                                'nombre' => $productoHijoFind->nombre . ' (' . $productos[$i]->nombre . ')',
                                'precio' => 0,
                                'cantidad_total' => $productos[$i]->cantidad_total * $productoHijo->cantidad
                            ];
                        }
                    }
                }
                else{
//                    $productosComboRes[] = $productos[$i];
                    if ($productos[$i]->id == $gaseosa_id){
                        $productosGaseosaRes[] = $productos[$i];
                    }
                    if ($productos[$i]->id == $pipoca_id) {
                        $productosPipocaRes[] = $productos[$i];
                    }
                    if ($productos[$i]->id == $frappe_id) {
                        $productosFrapeRes[] = $productos[$i];
                    }
                }
            }

            return [
                'productos' => $productos,
                'productosCombo' => $productosComboRes,
                'productosGaseosa' => $productosGaseosaRes,
                'productosPipoca' => $productosPipocaRes,
                'productosFrape' => $productosFrapeRes
            ];
        }else if ($reporte == 'SALA'){
//            $ventas = Reserva::whereDate('fecha', '>=', $fechaInicio)
//                ->whereDate('fecha', '<=', $fechaFin)
//                ->where('user_id', $user_id)
//                ->whereRaw("(estado = 'Finalizado' OR estado = 'Reservado')")
//                ->get();
//            return $ventas;
            $reservasAdelanto = Reserva::whereDate('fecha', '>=', $fechaInicio)
                ->whereDate('fecha', '<=', $fechaFin)
                ->where('user_id', $user_id)
                ->whereRaw("(estado = 'Finalizado' OR estado = 'Reservado')")
                ->get();
            error_log(json_encode($reservasAdelanto));
            $reservasSaldo = Reserva::whereDate('fecha', '>=', $fechaInicio)
                ->whereDate('fecha', '<=', $fechaFin)
                ->where('user_confirmado_id', $user_id)
                ->whereRaw('(estado = "Finalizado" OR estado = "Reservado")')
                ->get();
            error_log(json_encode($reservasSaldo));

//            agrupar array de reservas
            $reservasTotal = [];
            foreach ($reservasAdelanto as $reserva){
                $reservasTotal[] = [
                    'nombre' => $reserva['nombre'],
                    'sala' => $reserva['sala'],
                    'horario' => $reserva['horario'],
                    'estado' => $reserva['estado'],
                    'total' => $reserva['adelanto'],
                ];
            }
            foreach ($reservasSaldo as $reserva){
                $reservasTotal[] = [
                    'nombre' => $reserva['nombre'],
                    'sala' => $reserva['sala'],
                    'horario' => $reserva['horario'],
                    'estado' => $reserva['estado'],
                    'total' => $reserva['saldo'],
                ];
            }
            return $reservasTotal;
        }
    }
    function index(Request $request)
    {
        $fechaInicio = $request->fechaInicio;
        $fechaFin = $request->fechaFin;
        $user_id = $request->user_id;
        $fechaInicio = $fechaInicio.' 00:00:00';
        $fechaFin = $fechaFin.' 23:59:59';

        $user = $request->user();
        error_log('agencia: '.$user->sucursal);

        if ($user->sucursal == 'Ayacucho') {
            $query = Venta::whereBetween('fecha', [$fechaInicio, $fechaFin])
                ->with('detalles', 'user')
                ->where('agencia', $user->sucursal)
                ->orderBy('id', 'desc');
        } else if ($user->sucursal == 'Oquendo') {
            $query = Venta::whereBetween('fecha', [$fechaInicio, $fechaFin])
                ->with('detalles', 'user')
                ->where('agencia', $user->sucursal)
                ->orderBy('id', 'desc');
        }

//        $query = Venta::whereBetween('fecha', [$fechaInicio, $fechaFin])
//            ->with('detalles', 'user')
//            ->orderBy('id', 'desc');

        if ($user->role !== 'Admin' || $user_id) {
            $query->where('user_id', $user_id ?? $user->id);
        }

        if ($user->role === 'Admin') {
            return $query->get();
        }else{
            return [];
        }

//        return $query->get();
    }
    function store(Request $request){
        $hoy = date('Y-m-d');
        $user = $request->user();

        $verificar = Caja::whereDate('fecha_cierre', $hoy)->where('user_id', $user->id)->first();
        if($verificar){
            return response()->json(['message' => 'Ya se ha cerrado la caja de hoy'], 400);
        }
        DB::beginTransaction();
        try {
            $venta = new Venta();
            $venta->fecha = date('Y-m-d H:i:s');
            $venta->total = 0;
            $venta->nombre = $request->nombre;
            $venta->user_id = $user->id;
            $venta->agencia = $user->sucursal;
            $venta->save();
            $productos = $request->productos;

            $total = 0;
            foreach ($productos as $producto){
                $productoCombo = ProductoCombo::where('producto_padre_id', $producto['id'])->get();
                error_log(json_encode($productoCombo));
                if(count($productoCombo) > 0){
                    foreach ($productoCombo as $productoHijo){
                        $productoHijoFind = Producto::find($productoHijo->producto_hijo_id);
                        $productoHijoFind->stock -= $producto['cantidadVenta'] * $productoHijo->cantidad;
                        $productoHijoFind->save();
                    }
                }else{
                    $productoFind = Producto::find($producto['id']);
                    $productoFind->stock -= $producto['cantidadVenta'];
                    $productoFind->save();
                }
                error_log(json_encode($producto));
                $detalle = new Detalle();
                $detalle->cantidad = $producto['cantidadVenta'];
                $detalle->producto = $producto['nombre'];
                $detalle->precio = $producto['precioVenta'];
                $detalle->producto_id = $producto['id'];
                $detalle->venta_id = $venta->id;
                $detalle->user_id = $request->user()->id;
                $detalle->save();

                $total += $producto['cantidadVenta'] * $producto['precioVenta'];
            }
            $venta->total = $total;
            $venta->save();
            DB::commit();
            return $venta;
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    function anular(Request $request, Venta $venta){
        $venta->anulada = true;
        $venta->save();

        $detalles = Detalle::where('venta_id', $venta->id)->get();
        foreach ($detalles as $detalle){
            // Corregimos la búsqueda de ProductoCombo
            $productoCombo = ProductoCombo::where('producto_padre_id', $detalle['producto_id'])->get();

            if ($productoCombo->count() > 0) {
                foreach ($productoCombo as $productoHijo) {
                    $productoHijoFind = Producto::find($productoHijo->producto_hijo_id);
                    if ($productoHijoFind) {
                        error_log(json_encode($productoHijoFind));
                        $productoHijoFind->stock += $detalle['cantidad'] * $productoHijo->cantidad;
                        $productoHijoFind->save();
                    }
                }
            } else {
                $productoFind = Producto::find($detalle['producto_id']);
                if ($productoFind) {
                    $productoFind->stock += $detalle['cantidad'];
                    $productoFind->save();
                }
            }
        }

        return $venta;
    }
}
