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
        Schema::create('reservas', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->integer('numero_personas');
            $table->string('observaciones')->nullable();
            $table->enum('estado', ['Reservado', 'Cancelado', 'Finalizado'])->default('Reservado');
            $table->text('json')->nullable();
            $table->string('sala')->nullable();
            $table->string('motivo_cancelacion')->nullable();
            $table->decimal('adelanto', 10, 2)->nullable();
            $table->decimal('saldo', 10, 2)->nullable();
            $table->decimal('total', 10, 2)->nullable();
            $table->boolean('directo')->default(false);
            $table->string('tiempo')->nullable();
            $table->string('horario')->nullable();
            $table->string('agencia')->nullable()->default('Ayacucho');
            $table->boolean('anulada')->default(false);

            $table->date('fecha');
            $table->dateTime('fecha_creacion')->useCurrent();
            $table->dateTime('fecha_confirmacion')->nullable();
            $table->dateTime('fecha_cancelacion')->nullable();

            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('user_cancelado_id')->nullable();
            $table->unsignedBigInteger('user_confirmado_id')->nullable();
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('user_cancelado_id')->references('id')->on('users');
            $table->foreign('user_confirmado_id')->references('id')->on('users');
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('reservas');
    }
};
