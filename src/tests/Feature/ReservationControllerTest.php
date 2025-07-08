<?php

use App\Models\User;
use App\Models\Operator;
use App\Models\Reservation;
use Illuminate\Foundation\Testing\RefreshDatabase;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function Pest\Laravel\put;
use function Pest\Laravel\putJson;
use function Pest\Laravel\delete;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->operator = Operator::factory()->create();
    actingAs($this->user);
});

test('予約一覧画面にアクセスできる', function () {
    $response = get('/api/reservations');

    $response->assertStatus(200);
});

test('予約を作成できる', function () {
    $payload = [
        'user_id' => $this->user->id,
        'operator_id' => $this->operator->id,
        'service_name' => 'カット',
        'duration' => 60,
        'date' => '2025-07-20',
        'start_time' => '10:00',
        'end_time' => '11:00',
        'status' => 'reserved',
        'notes' => '',
    ];

    $response = post('/api/reservations', $payload);

    $response->assertRedirect(); // 一般的なControllerのPOSTはリダイレクト
    $this->assertDatabaseHas('reservations', ['service_name' => 'カット']);
});

test('予約を更新できる', function () {
    $reservation = Reservation::factory()->create([
        'user_id' => $this->user->id,
        'operator_id' => $this->operator->id,
        'service_name' => '初期',
    ]);

    $payload = [
        'user_id' => $this->user->id,
        'operator_id' => $this->operator->id,
        'service_name' => 'カラー',
        'duration' => 45,
        'date' => '2025-07-20',
        'start_time' => '10:00',
        'end_time' => '10:45',
        'status' => 'reserved',
        'notes' => '',
    ];

    $response = putJson("/api/reservations/{$reservation->id}", $payload);

    $response->assertStatus(200);
    $response->assertJsonFragment(['service_name' => 'カラー']);
    // $reservation = $reservation->fresh();
    $this->assertDatabaseHas('reservations', [
        'service_name' => 'カラー',
    ]);
});

test('予約を削除できる', function () {
    $reservation = Reservation::factory()->create([
        'user_id' => $this->user->id,
        'operator_id' => $this->operator->id,
    ]);

    $response = delete("/api/reservations/{$reservation->id}");

    // $response->assertRedirect();
    $this->assertDatabaseMissing('reservations', ['id' => $reservation->id]);
});