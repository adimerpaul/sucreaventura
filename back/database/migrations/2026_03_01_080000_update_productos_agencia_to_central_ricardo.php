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
        DB::table('productos')->where('agencia', 'Ayacucho')->update(['agencia' => 'Central']);
        DB::table('productos')->where('agencia', 'Oquendo')->update(['agencia' => 'Ricardo']);
        DB::table('productos')->whereNull('agencia')->update(['agencia' => 'Central']);
        DB::statement("ALTER TABLE productos ALTER COLUMN agencia SET DEFAULT 'Central'");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('productos')->where('agencia', 'Central')->update(['agencia' => 'Ayacucho']);
        DB::table('productos')->where('agencia', 'Ricardo')->update(['agencia' => 'Oquendo']);
        DB::statement("ALTER TABLE productos ALTER COLUMN agencia SET DEFAULT 'Ayacucho'");
    }
};

