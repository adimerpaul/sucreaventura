<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Producto extends Model{
    use SoftDeletes;
    protected $fillable = [
        'nombre',
        'precio',
        'stock',
        'agencia',
    ];
    protected $hidden = ['deleted_at', 'created_at', 'updated_at'];
    function ventas(){
        return $this->hasMany(Detalle::class);
    }
    function productoCombo(){
        return $this->hasMany(ProductoCombo::class, 'producto_padre_id')->with('producto_hijo');
    }
}
