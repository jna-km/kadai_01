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
            'operator_id' => Operator::factory(), // 関連するオペレーターを自動生成
            'weekday' => $this->faker->numberBetween(0, 6), // 0:日曜〜6:土曜
            'start_time' => $this->faker->time('H:i:s', '09:00:00'),
            'end_time' => $this->faker->time('H:i:s', '18:00:00'),
        ];
    }
}
