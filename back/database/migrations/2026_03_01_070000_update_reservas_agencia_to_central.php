<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::table('reservas')->update(['agencia' => 'Central']);
        DB::statement("ALTER TABLE reservas ALTER COLUMN agencia SET DEFAULT 'Central'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("ALTER TABLE reservas ALTER COLUMN agencia SET DEFAULT 'Ayacucho'");
    }
};

