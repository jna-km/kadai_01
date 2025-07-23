<?php

namespace Database\Factories;

use App\Models\Operator;
use Illuminate\Database\Eloquent\Factories\Factory;

class HolidayFactory extends Factory
{
    public function definition(): array
    {
        return [
            'operator_id' => Operator::factory(),
            'date' => $this->faker->date(),
            'name' => $this->faker->randomElement([
                '海の日', '山の日', '敬老の日', '文化の日', '勤労感謝の日'
            ]),
            'reason' => $this->faker->optional()->sentence(),
        ];
    }
}
