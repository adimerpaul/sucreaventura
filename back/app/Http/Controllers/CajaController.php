<?php

namespace App\Http\Controllers;

use App\Models\Caja;
use App\Models\Reserva;
use App\Models\Venta;
use Carbon\Carbon;
use Illuminate\Http\Request;
use function Pest\Laravel\json;

class CajaController extends Controller{
    function verificarCaja(Request $request){
        $hoy = date('Y-m-d');
        $user = $request->user();
        $caja = Caja::whereDate('fecha_cierre', $hoy)->where('user_id', $user->id)->first();
        if($caja){
            return [
                'estado' => 'cerrada',
                'caja' => $caja,
            ];
        }
        return null;
    }
    function metricas(Request $request){
        $user = $request->user();
        $agencia = $user->sucursal;
        $fechaInicio = $request->input('fechaInicio');
        $fechaFin = $request->input('fechaFin');
        Carbon::setLocale('es');

        $fechaInicioCarbon = \Carbon\Carbon::parse($fechaInicio);
        $fechaFinCarbon = \Carbon\Carbon::parse($fechaFin);

        $arrayFecha = [];
        $dias = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
        for($i = $fechaInicioCarbon; $i->lessThanOrEqualTo($fechaFinCarbon); $i->addDay()){
            $fecha = $i->format('Y-m-d');
            $cajas = Caja::whereDate('fecha_cierre', $fecha)
                ->with('user')
                ->where('agencia', $agencia)
                ->get();

            $arrayFecha[] = [
                'fecha' => $fecha,
                'fechaFormat' => $dias[$i->dayOfWeek] . ' ' . $i->format('d'),
                'monto_total' => $cajas->sum('monto_real'),
                'cajas' => $cajas
            ];
        }

        return [
            'fechaInicio' => $fechaInicio,
            'fechaFin' => $fechaFin,
            'arrayFecha' => $arrayFecha,
            'cajas' => Caja::whereBetween('fecha_cierre', [$fechaInicio, $fechaFin])
                ->with('user')
                ->where('agencia', $agencia)
                ->get()
        ];
    }
    function store(Request $request){
        $user = $request->user();
        $user_id = $user->id;
        $hoy = date('Y-m-d');
//        $user_id = 4;
//        $hoy = '2025-03-11';
        $fechaInicio = $hoy . ' 00:00:00';
        $fechaFin = $hoy . ' 23:59:59';
//        $montoInicial = $request->monto_inicial;
        $montoInicial = 0;
        $montoFinal = $request->monto_final;

        $montoReal = $montoFinal - $montoInicial;

//        $ventasSum = $user->ventas()
//            ->whereDate('fecha', $hoy)
//            ->where('anulada', 0)
//            ->sum('total');
        $ventasSum = Venta::whereDate('fecha', '>=', $fechaInicio)
            ->whereDate('fecha', '<=', $fechaFin)
            ->where('user_id', $user_id)
            ->where('anulada', 0)
            ->sum('total');

//        $reservasSum = $user->reservas()
//            ->whereDate('fecha', $hoy)
//            ->whereRaw('(estado = "Finalizado" or estado = "Confirmado")')
//            ->sum('total');

        $reservasSumAdelanto = Reserva::whereDate('fecha', '>=', $fechaInicio)
            ->whereDate('fecha', '<=', $fechaFin)
            ->where('user_id', $user_id)
            ->whereRaw("(estado = 'Finalizado' OR estado = 'Reservado')")
            ->sum('adelanto');
//        error_log('reservasSumAdelanto iiiiiiiiii: '.$reservasSumAdelanto);
        $reservasSumSaldo = Reserva::whereDate('fecha', '>=', $fechaInicio)
            ->whereDate('fecha', '<=', $fechaFin)
            ->where('user_confirmado_id', $user_id)
            ->whereRaw('(estado = "Finalizado" OR estado = "Reservado")')
            ->sum('saldo');
//        error_log('reservasSumSaldo iiiiiiiiiii: '.$reservasSumSaldo);


        $reservasSum = $reservasSumAdelanto + $reservasSumSaldo;

        $montoRealVentas = $ventasSum + $reservasSum;

        $verificar = Caja::whereDate('fecha_cierre', $hoy)->where('user_id', $user_id)->first();
        if($verificar){
//            error_log(json_encode($verificar));
            $verificar->monto_inicial = $montoInicial;
            $verificar->monto_final = $montoFinal;
            $verificar->observacion = $request->observacion;
            $verificar->monto_real = $montoReal;
            error_log('reservasSum iiiiiiii: '.$reservasSum);
            $verificar->monto_reserva = $reservasSum;
            $verificar->monto_venta = $ventasSum;
            $verificar->monto_caja = $montoRealVentas;
            $verificar->monto_diferencia = $montoReal - $montoRealVentas;
            $verificar->save();
            return "Caja actualizada";
//            ya nose puede actualizar la caja
//            return response()->json(['message' => 'Ya se ha cerrado la caja de hoy'], 400);
        }
        $caja = new Caja();
        $caja->fecha_cierre = $hoy.date(' H:i:s');
        $caja->monto_inicial = $montoInicial;
        $caja->monto_final = $montoFinal;
        $caja->monto_real = $montoReal;
        $caja->monto_caja = $montoRealVentas;
        $caja->monto_reserva = $reservasSum;
        $caja->monto_venta = $ventasSum;
        $caja->monto_diferencia = $montoReal - $montoRealVentas;
        $caja->observacion = $request->observacion;
        $caja->user_id = $user_id;
        $caja->agencia = $user->sucursal;
        $caja->save();
        return "Caja guardada";
    }
}
