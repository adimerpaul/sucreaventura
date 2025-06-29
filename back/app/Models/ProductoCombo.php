<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ProductoCombo extends Model{
    use SoftDeletes;
    protected $fillable = [
        'cantidad',
        'producto_padre_id',
        'producto_hijo_id'
    ];
    protected $hidden = ['deleted_at', 'created_at', 'updated_at'];
    function producto_padre(){
        return $this->belongsTo(Producto::class);
    }
    function producto_hijo(){
        return $this->belongsTo(Producto::class);
    }
}
