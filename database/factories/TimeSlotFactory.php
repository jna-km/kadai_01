<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Operator;
use App\Models\Service;

class TimeSlotFactory extends Factory
{
    public function definition(): array
    {
        return [
            'operator_id' => Operator::factory(),
            'service_id' => Service::factory(),
            'date' => $this->faker->date(),
            'start_time' => $this->faker->time('H:i'),
            'end_time' => $this->faker->time('H:i'),
            'capacity' => $this->faker->numberBetween(1, 5),
        ];
    }
}
