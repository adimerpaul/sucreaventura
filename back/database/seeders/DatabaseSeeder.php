<?php

namespace Database\Seeders;

use App\Models\Producto;
use App\Models\ProductoCombo;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

//        User::factory()->create([
//            'name' => 'Test User',
//            'email' => 'test@example.com',
//        ]);
        $user = User::create([
            'name' => 'Adimer Paul Chambi Ajata',
            'username' => 'admin',
            'avatar' => 'default.png',
//            'email' => 'admin@gmail.com',
            'password' => bcrypt('admin123Admin'),
            'role' => 'Admin',
        ]);
        $user = User::create([
            'name' => 'Roger Guillermo Arias Rodriguez',
            'username' => 'roger',
            'avatar' => 'default.png',
//            'email' => 'admin@gmail.com',
            'password' => bcrypt('roger123Roger'),
        ]);
//        MOGUL CEREBRITOS	0	5	222
//MINI TRULULU	0	6	153
//GASEOSA 600 ML.	207	6	3421
//AGUA 750 ML	24	6	394
//POWERADE 473 ML.	65	8	221
//GASEOSA 300 ML	-22	4	273
//OREO	51	4	230
//MOGUL EXTREM	9	5	251
//TRULULU SABORES	7	3	182
//BELDENT	68	4	94
//CHOCOLATE MOMENTO	15	3	283
//TRULULU FEROZ	23	2	374
//SUBLIME	1	5	1
//PIPOCA GRANDE	158	10	2019
//COMBO PIPOCA Y 2 GASEOSA	86	20	14
//PAPAS PRINGLES PEQUEÑO	9	14	101
//PAPAS PRINGLES GRANDES	0	26	112
//monster	63	18	82
//PAPAS CRISPY CHIPS	9	3	312
//Galletas ronditas	1	2	93
//Galletas wafs	0	5	59
//HALLS	12	5	31
//galletas infinitas	1	3	24
//TRULULU GIGANTE	37	8	61
//Del valle 300ml	21	4	283
//takis	28	10	19
//ciclon	10	7	13
//MARUCHAN	30	14	6
//AJINOMEN	46	13	26
//frappé	98	10	2
//FRAPPÉ DUO	239	18	8
//MISTER CRISPY	18	20	1
//        protected $fillable = [
//        'nombre',
//        'precio',
//        'stock'
//    ];
        Producto::create(['id'=>1,'nombre' => 'MOGUL CEREBRITOS', 'precio' => 5, 'stock' => 222,]);
        Producto::create(['id'=>2,'nombre' => 'MINI TRULULU', 'precio' => 6, 'stock' => 153,]);
        Producto::create(['id'=>3,'nombre' => 'GASEOSA 600 ML.', 'precio' => 6, 'stock' => 3421,]);
        Producto::create(['id'=>4,'nombre' => 'AGUA 750 ML', 'precio' => 6, 'stock' => 394,]);
        Producto::create(['id'=>5,'nombre' => 'POWERADE 473 ML.', 'precio' => 8, 'stock' => 221,]);
        Producto::create(['id'=>6,'nombre' => 'GASEOSA 300 ML', 'precio' => 4, 'stock' => 273,]);
        Producto::create(['id'=>7,'nombre' => 'OREO', 'precio' => 4, 'stock' => 230,]);
        Producto::create(['id'=>8,'nombre' => 'MOGUL EXTREM', 'precio' => 5, 'stock' => 251,]);
        Producto::create(['id'=>9,'nombre' => 'TRULULU SABORES', 'precio' => 3, 'stock' => 182,]);
        Producto::create(['id'=>10,'nombre' => 'BELDENT', 'precio' => 4, 'stock' => 94,]);
        Producto::create(['id'=>11,'nombre' => 'CHOCOLATE MOMENTO', 'precio' => 3, 'stock' => 283,]);
        Producto::create(['id'=>12,'nombre' => 'TRULULU FEROZ', 'precio' => 2, 'stock' => 374,]);
        Producto::create(['id'=>13,'nombre' => 'SUBLIME', 'precio' => 5, 'stock' => 1,]);
        Producto::create(['id'=>14,'nombre' => 'PIPOCA GRANDE', 'precio' => 10, 'stock' => 2019,]);
        Producto::create(['id'=>15,'nombre' => 'COMBO PIPOCA Y 2 GASEOSA', 'precio' => 20, 'stock' => 14,]);
        Producto::create(['id'=>16,'nombre' => 'PAPAS PRINGLES PEQUEÑO', 'precio' => 14, 'stock' => 101,]);
        Producto::create(['id'=>17,'nombre' => 'PAPAS PRINGLES GRANDES', 'precio' => 26, 'stock' => 112,]);
        Producto::create(['id'=>18,'nombre' => 'MONSTER', 'precio' => 18, 'stock' => 82,]);
        Producto::create(['id'=>19,'nombre' => 'PAPAS CRISPY CHIPS', 'precio' => 3, 'stock' => 312,]);
        Producto::create(['id'=>20,'nombre' => 'Galletas ronditas', 'precio' => 2, 'stock' => 93,]);
        Producto::create(['id'=>21,'nombre' => 'Galletas wafs', 'precio' => 5, 'stock' => 59,]);
        Producto::create(['id'=>22,'nombre' => 'HALLS', 'precio' => 5, 'stock' => 31,]);
        Producto::create(['id'=>23,'nombre' => 'galletas infinitas', 'precio' => 3, 'stock' => 24,]);
        Producto::create(['id'=>24,'nombre' => 'TRULULU GIGANTE', 'precio' => 8, 'stock' => 61,]);
        Producto::create(['id'=>25,'nombre' => 'Del valle 300ml', 'precio' => 4, 'stock' => 283,]);
        Producto::create(['id'=>26,'nombre' => 'TAKIS', 'precio' => 10, 'stock' => 19,]);
        Producto::create(['id'=>27,'nombre' => 'CICLON', 'precio' => 7, 'stock' => 13,]);
        Producto::create(['id'=>28,'nombre' => 'MARUCHAN', 'precio' => 14, 'stock' => 6,]);
        Producto::create(['id'=>29,'nombre' => 'AJINOMEN', 'precio' => 13, 'stock' => 26,]);
        Producto::create(['id'=>30,'nombre' => 'FRAPPÉ', 'precio' => 10, 'stock' => 2,]);
        Producto::create(['id'=>31,'nombre' => 'FRAPPÉ DUO', 'precio' => 18, 'stock' => 8,]);
        Producto::create(['id'=>32,'nombre' => 'MISTER CRISPY', 'precio' => 20, 'stock' => 1,]);
        Producto::create(['id'=>33,'nombre' => 'MISTER CRISPY', 'precio' => 20, 'stock' => 1,]);

        ProductoCombo::create(['producto_padre_id'=>15,'producto_hijo_id'=>14,'cantidad'=>1]);
        ProductoCombo::create(['producto_padre_id'=>15,'producto_hijo_id'=>3,'cantidad'=>2]);
    }
}
