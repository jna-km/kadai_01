<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Service;
use App\Models\Operator;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = Operator::where('email', 'admin@example.com')->first();

        if ($admin) {
            Service::factory()->count(5)->create([
                'operator_id' => $admin->id,
            ]);
        }
    }
}
