<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Venta extends Model{
    use SoftDeletes;
    protected $fillable = [
        'fecha',
        'total',
        'nombre',
        'anulada',
        'user_id',
        'agencia',
    ];
    protected $hidden = ['deleted_at', 'created_at', 'updated_at'];
    function detalles(){
        return $this->hasMany(Detalle::class);
    }
    function user(){
        return $this->belongsTo(User::class);
    }
    protected $appends = ['detalleText'];

    function getDetalleTextAttribute(){
        $detalleText = '';
//        error_log($this->id);
//        error_log($this->detalles);
        foreach ($this->detalles as $detalle){
            $detalleText .= $detalle->cantidad.' '.$detalle->producto.' '.$detalle->precio.', ';
        }
        $detalleText = substr($detalleText, 0, -2);
        return $detalleText;
    }
}
