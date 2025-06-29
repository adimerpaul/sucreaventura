<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Reserva extends Model{
    use SoftDeletes;
    protected $fillable = [
        'nombre',
        'numero_personas',
        'observaciones',
        'estado',
        'json',
        'sala',
        'motivo_cancelacion',
        'adelanto',
        'saldo',
        'total',
        'directo',
        'tiempo',
        'horario',
        'fecha',
        'anulada',
        'fecha_creacion',
        'fecha_confirmacion',
        'fecha_cancelacion',
        'user_id',
        'user_cancelado_id',
        'user_confirmado_id',
        'agencia'
    ];
    function user(){
        return $this->belongsTo(User::class);
    }
    function user_confirmado(){
        return $this->belongsTo(User::class);
    }
    function user_cancelado(){
        return $this->belongsTo(User::class);
    }
    protected $appends = ['color'];
    function getColorAttribute(){
        if($this->estado == 'Reservado'){
            return 'yellow';
        }
        if($this->estado == 'Cancelado'){
            return 'gray';
        }
        if($this->estado == 'Finalizado'){
            return 'red';
        }
    }
    protected $hidden = ['deleted_at', 'created_at', 'updated_at'];
}
