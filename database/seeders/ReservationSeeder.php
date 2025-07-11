<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Reservation;
use App\Models\User;
use App\Models\Operator;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::where('email', 'user@example.com')->first();
        $admin = Operator::where('email', 'admin@example.com')->first();

        if ($user && $admin) {
            Reservation::factory()->count(5)->create([
                'user_id' => $user->id,
                'operator_id' => $admin->id,
            ]);
        }
    }
}
