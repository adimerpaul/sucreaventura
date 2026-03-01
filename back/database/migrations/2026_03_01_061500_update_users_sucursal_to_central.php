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
        DB::table('users')->update(['sucursal' => 'Central']);
        DB::statement("ALTER TABLE users ALTER COLUMN sucursal SET DEFAULT 'Central'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("ALTER TABLE users ALTER COLUMN sucursal SET DEFAULT 'Ayacucho'");
    }
};

