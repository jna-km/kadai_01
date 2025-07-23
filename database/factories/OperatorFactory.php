<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Operator>
 */
class OperatorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'password' => '$2y$04$ZDdx7OAQDXCZp5g5X9X1SuNrxhcoPgbW1.kOKFG20nUbOJ07OdiPC', // 固定パスワードでログイン確認しやすく
            'role' => 'staff',
            'remember_token' => Str::random(10),
        ];
    }
}
