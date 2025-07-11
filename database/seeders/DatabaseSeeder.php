<?php

namespace Database\Seeders;

use Database\Seeders\UserSeeder;
use Database\Seeders\OperatorSeeder;
use Database\Seeders\ServiceSeeder;
use Database\Seeders\ReservationSeeder;
use Database\Seeders\NoticeSeeder;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            OperatorSeeder::class,
            ServiceSeeder::class,
            ReservationSeeder::class,
            NoticeSeeder::class,
        ]);
    }
}
