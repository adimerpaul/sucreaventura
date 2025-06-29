<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('cajas', function (Blueprint $table) {
            $table->id();
            $table->dateTime('fecha_cierre');
            $table->decimal('monto_inicial', 10, 2);
            $table->decimal('monto_final', 10, 2);
            $table->decimal('monto_real', 10, 2);
            $table->decimal('monto_diferencia', 10, 2);
            $table->decimal('monto_caja', 10, 2);
            $table->decimal('monto_reserva', 10, 2);
            $table->decimal('monto_venta', 10, 2);
            $table->string('observacion')->nullable();
            $table->unsignedBigInteger('user_id');
            $table->foreign('user_id')->references('id')->on('users');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cajas');
    }
};
