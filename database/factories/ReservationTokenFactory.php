<?php

namespace Database\Factories;

use App\Models\Reservation;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use Carbon\Carbon;

class ReservationTokenFactory extends Factory
{
    public function definition(): array
    {
        return [
            'reservation_id' => Reservation::factory(), // 予約と関連付け
            'token' => Str::random(40), // ランダムなトークン
            'expired_at' => Carbon::now()->addMinutes(30), // デフォルト30分後に期限切れ
        ];
    }
}
