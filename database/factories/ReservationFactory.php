<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Operator;
use App\Models\Service;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $duration = fake()->randomElement([30, 45, 60]);
        $start = fake()->dateTimeBetween('now', '+7 days');
        $end = (clone $start)->modify("+{$duration} minutes");

        return [
            'user_id' => User::factory(),
            'operator_id' => Operator::factory(),
            'service_id' => Service::factory(),
            'duration' => $duration,
            'date' => $start->format('Y-m-d'),
            'start_time' => $start->format('H:i:s'),
            'end_time' => $end->format('H:i:s'),
            'status' => 'reserved',
            'notes' => fake()->optional()->sentence(),
            'cancelled_at' => null,
        ];
    }
}
