<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MetricaController extends Controller{
    function index(Request $request){
        $fechaInicio = $request->input('fechaInicio');
        $fechaFin = $request->input('fechaFin');

    }
}
