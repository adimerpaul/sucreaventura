<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Caja extends Model{
    use SoftDeletes;
    protected $fillable = [
        'fecha_cierre',
        'monto_inicial',
        'monto_final',
        'monto_real',
        'monto_diferencia',
        'monto_caja',
        'monto_reserva',
        'monto_venta',
        'user_id',
        'observacion',
        'agencia',
    ];
    protected $hidden = ['created_at', 'updated_at', 'deleted_at'];
    function user(){
        return $this->belongsTo(User::class);
    }
}
