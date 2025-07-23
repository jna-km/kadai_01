<?php

namespace Database\Factories;

use App\Models\WorkingHour;
use App\Models\Operator;
use Illuminate\Database\Eloquent\Factories\Factory;

class WorkingHourFactory extends Factory
{
    protected $model = WorkingHour::class;

    public function definition(): array
    {
        return [
            'operator_id' => Operator::factory(),
            'day_of_week' => $this->faker->numberBetween(0, 6),
            'start_time' => $this->faker->time('H:i'),
            'end_time' => $this->faker->time('H:i'),
        ];
    }
}
