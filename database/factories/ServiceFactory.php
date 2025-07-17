<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Operator;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Service>
 */
class ServiceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->word() . 'サービス',
            'description' => fake()->sentence(),
            'duration' => fake()->numberBetween(15, 90), // 分
            'price' => fake()->numberBetween(1000, 10000), // 料金（円）
            'operator_id' => Operator::inRandomOrder()->first()?->id ?? 1,
        ];
    }
}
