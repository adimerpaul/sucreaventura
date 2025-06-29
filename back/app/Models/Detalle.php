<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Detalle extends Model{
    use SoftDeletes;
    protected $fillable = [
        'cantidad',
        'producto',
        'precio',
        'producto_id',
        'venta_id',
        'user_id'
    ];
    protected $hidden = ['deleted_at', 'created_at', 'updated_at'];
    function producto(){
        return $this->belongsTo(Producto::class);
    }
    function venta(){
        return $this->belongsTo(Venta::class);
    }
    function user(){
        return $this->belongsTo(User::class);
    }
}
