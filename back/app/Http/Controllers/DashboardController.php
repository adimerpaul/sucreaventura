<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use App\Models\User;
use App\Models\Venta;
use Carbon\Carbon;
use Carbon\CarbonPeriod;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $authUser = $request->user();
        $isAdmin = $authUser->role === 'Admin';

        $fechaInicio = $request->input('fechaInicio', Carbon::now()->startOfWeek()->format('Y-m-d'));
        $fechaFin = $request->input('fechaFin', Carbon::now()->endOfWeek()->format('Y-m-d'));
        $fechaInicioCarbon = Carbon::parse($fechaInicio)->startOfDay();
        $fechaFinCarbon = Carbon::parse($fechaFin)->endOfDay();

        $agencia = $request->input('agencia', 'Todo');
        if (!in_array($agencia, ['Todo', 'Central', 'Ricardo'])) {
            return response()->json(['message' => 'Agencia inválida'], 422);
        }

        $userId = (int) $request->input('user_id', 0);
        if (!$isAdmin) {
            $agencia = $authUser->sucursal;
            $userId = $authUser->id;
        }

        $ventasBase = Venta::whereBetween('fecha', [$fechaInicioCarbon, $fechaFinCarbon])
            ->where('anulada', 0);

        $reservasBase = Reserva::whereBetween('fecha', [
                $fechaInicioCarbon->toDateString(),
                $fechaFinCarbon->toDateString()
            ]);

        if ($agencia !== 'Todo') {
            $ventasBase->where('agencia', $agencia);
            $reservasBase->where('agencia', $agencia);
        }

        $ventasFiltradas = clone $ventasBase;
        $reservasFiltradas = clone $reservasBase;
        if ($userId > 0) {
            $ventasFiltradas->where('user_id', $userId);
            $reservasFiltradas->where(function ($q) use ($userId) {
                $q->where('user_id', $userId)
                    ->orWhere('user_confirmado_id', $userId);
            });
        }

        $ventasTotal = (float) (clone $ventasFiltradas)->sum('total');

        $reservasAdelantoQuery = clone $reservasFiltradas;
        $reservasAdelantoQuery->whereIn('estado', ['Reservado', 'Finalizado']);
        if ($userId > 0) {
            $reservasAdelantoQuery->where('user_id', $userId);
        }
        $reservasAdelanto = (float) $reservasAdelantoQuery->sum('adelanto');

        $reservasSaldoQuery = clone $reservasFiltradas;
        $reservasSaldoQuery->where('estado', 'Finalizado');
        if ($userId > 0) {
            $reservasSaldoQuery->where('user_confirmado_id', $userId);
        }
        $reservasSaldo = (float) $reservasSaldoQuery->sum('saldo');

        $reservasEstado = (clone $reservasFiltradas)
            ->select('estado', DB::raw('COUNT(*) as total'))
            ->groupBy('estado')
            ->pluck('total', 'estado');

        $reservasTotal = (int) ((clone $reservasFiltradas)->count());
        $reservasReservadas = (int) ($reservasEstado['Reservado'] ?? 0);
        $reservasFinalizadas = (int) ($reservasEstado['Finalizado'] ?? 0);
        $reservasCanceladas = (int) ($reservasEstado['Cancelado'] ?? 0);

        $ventasPorDia = (clone $ventasFiltradas)
            ->selectRaw('DATE(fecha) as fecha, SUM(total) as total')
            ->groupBy('fecha')
            ->pluck('total', 'fecha');

        $adelantoPorDia = (clone $reservasAdelantoQuery)
            ->selectRaw('DATE(fecha) as fecha, SUM(adelanto) as total')
            ->groupBy('fecha')
            ->pluck('total', 'fecha');

        $saldoPorDia = (clone $reservasSaldoQuery)
            ->selectRaw('DATE(fecha) as fecha, SUM(saldo) as total')
            ->groupBy('fecha')
            ->pluck('total', 'fecha');

        $labels = [];
        $serieVentas = [];
        $serieAdelanto = [];
        $serieSaldo = [];
        $tablaDiaria = [];

        $periodo = CarbonPeriod::create($fechaInicioCarbon->toDateString(), $fechaFinCarbon->toDateString());
        foreach ($periodo as $dia) {
            $fechaKey = $dia->format('Y-m-d');
            $labels[] = $dia->format('d/m');

            $montoVentas = (float) ($ventasPorDia[$fechaKey] ?? 0);
            $montoAdelanto = (float) ($adelantoPorDia[$fechaKey] ?? 0);
            $montoSaldo = (float) ($saldoPorDia[$fechaKey] ?? 0);

            $serieVentas[] = round($montoVentas, 2);
            $serieAdelanto[] = round($montoAdelanto, 2);
            $serieSaldo[] = round($montoSaldo, 2);

            $tablaDiaria[] = [
                'fecha' => $fechaKey,
                'fechaLabel' => $dia->translatedFormat('D d M'),
                'ventas' => round($montoVentas, 2),
                'adelanto' => round($montoAdelanto, 2),
                'saldo' => round($montoSaldo, 2),
                'total' => round($montoVentas + $montoAdelanto + $montoSaldo, 2),
            ];
        }

        $topUsuarios = [];
        if ($isAdmin) {
            $ventasTop = (clone $ventasBase)
                ->select('user_id', DB::raw('SUM(total) as total_ventas'))
                ->groupBy('user_id')
                ->pluck('total_ventas', 'user_id');

            $adelantosTop = (clone $reservasBase)
                ->whereIn('estado', ['Reservado', 'Finalizado'])
                ->select('user_id', DB::raw('SUM(adelanto) as total_adelanto'))
                ->groupBy('user_id')
                ->pluck('total_adelanto', 'user_id');

            $saldosTop = (clone $reservasBase)
                ->where('estado', 'Finalizado')
                ->whereNotNull('user_confirmado_id')
                ->select('user_confirmado_id', DB::raw('SUM(saldo) as total_saldo'))
                ->groupBy('user_confirmado_id')
                ->pluck('total_saldo', 'user_confirmado_id');

            $usuarios = User::select('id', 'name', 'sucursal')->get();
            foreach ($usuarios as $u) {
                $tv = (float) ($ventasTop[$u->id] ?? 0);
                $ta = (float) ($adelantosTop[$u->id] ?? 0);
                $ts = (float) ($saldosTop[$u->id] ?? 0);
                $total = $tv + $ta + $ts;
                if ($total <= 0) {
                    continue;
                }
                $topUsuarios[] = [
                    'id' => $u->id,
                    'name' => $u->name,
                    'sucursal' => $u->sucursal,
                    'ventas' => round($tv, 2),
                    'adelanto' => round($ta, 2),
                    'saldo' => round($ts, 2),
                    'total' => round($total, 2),
                ];
            }

            usort($topUsuarios, function ($a, $b) {
                return $b['total'] <=> $a['total'];
            });
            $topUsuarios = array_slice($topUsuarios, 0, 8);
        }

        return response()->json([
            'is_admin' => $isAdmin,
            'filters' => [
                'fechaInicio' => $fechaInicioCarbon->toDateString(),
                'fechaFin' => $fechaFinCarbon->toDateString(),
                'agencia' => $agencia,
                'user_id' => $userId,
            ],
            'kpis' => [
                'ventas_total' => round($ventasTotal, 2),
                'reservas_adelanto' => round($reservasAdelanto, 2),
                'reservas_saldo' => round($reservasSaldo, 2),
                'ingresos_totales' => round($ventasTotal + $reservasAdelanto + $reservasSaldo, 2),
                'reservas_total' => $reservasTotal,
                'reservas_reservadas' => $reservasReservadas,
                'reservas_finalizadas' => $reservasFinalizadas,
                'reservas_canceladas' => $reservasCanceladas,
            ],
            'charts' => [
                'daily' => [
                    'labels' => $labels,
                    'series' => [
                        ['name' => 'Ventas', 'data' => $serieVentas],
                        ['name' => 'Adelantos', 'data' => $serieAdelanto],
                        ['name' => 'Saldos', 'data' => $serieSaldo],
                    ],
                ],
                'payments_pie' => [
                    'labels' => ['Ventas', 'Adelantos', 'Saldos'],
                    'series' => [
                        round($ventasTotal, 2),
                        round($reservasAdelanto, 2),
                        round($reservasSaldo, 2),
                    ],
                ],
                'reservas_estado' => [
                    'labels' => ['Reservado', 'Finalizado', 'Cancelado'],
                    'series' => [
                        $reservasReservadas,
                        $reservasFinalizadas,
                        $reservasCanceladas,
                    ],
                ],
                'top_usuarios' => $topUsuarios,
            ],
            'daily_table' => $tablaDiaria,
        ]);
    }
}

