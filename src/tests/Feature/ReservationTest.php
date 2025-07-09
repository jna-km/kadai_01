<?php

use App\Models\User;
use App\Models\Operator;
use App\Models\Reservation;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\postJson;
use function Pest\Laravel\putJson;
use function Pest\Laravel\deleteJson;
use function Pest\Laravel\getJson;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->operator = Operator::factory()->create();
    actingAs($this->user);
});

test('未ログインユーザーは予約一覧画面にアクセスできない（401）', function () {
    auth()->logout(); // ← actingAs を解除

    $response = getJson('/api/reservations');
    $response->assertStatus(401);
});

test('無効なデータでは予約が作成できない', function () {
    $response = postJson('/api/reservations', [
        'user_id' => '',
        'status' => 'invalid'
    ]);

    $response->assertStatus(422);
    $response->assertJsonValidationErrors([
        'user_id',
        'service_name',
        'duration',
        'date',
        'start_time',
        'end_time',
        'status'
    ]);
});

test('正常なデータで予約を作成できる', function () {
    $user = User::factory()->create();
    $operator = Operator::factory()->create();
    $payload = [
        'user_id' => $user->id,
        'operator_id' => $operator->id,
        'service_name' => 'カット＆シャンプー',
        'duration' => 60,
        'date' => '2025-07-15',
        'start_time' => '10:00',
        'end_time' => '11:00',
        'status' => 'reserved',
        'notes' => '初回予約'
    ];

    $response = postJson('/api/reservations', $payload);

    $response->assertStatus(201);
    $response->assertJsonFragment(['service_name' => 'カット＆シャンプー']);
});

test('存在しない予約IDを更新しようとすると404が返る', function () {
    $user = User::factory()->create();
    $operator = Operator::factory()->create();
    $response = putJson('/api/reservations/99999', [
        'user_id' => $user->id,
        'operator_id' => $operator->id,
        'service_name' => '更新',
        'duration' => 45,
        'date' => '2025-07-15',
        'start_time' => '11:00',
        'end_time' => '11:45',
        'status' => 'reserved',
        'notes' => '存在しないID'
    ]);

    $response->assertStatus(404);
});

test('予約を削除できる', function () {
    $user = User::factory()->create();
    $operator = Operator::factory()->create();
    $reservation = Reservation::factory()->create([
        'user_id' => $user->id,
        'operator_id' => $operator->id,
    ]);

    $response = deleteJson("/api/reservations/{$reservation->id}");

    $response->assertStatus(200);
    $this->assertDatabaseMissing('reservations', ['id' => $reservation->id]);
});

test('予約一覧を取得できる', function () {
    $user = User::factory()->create();
    $operator = Operator::factory()->create();
    Reservation::factory()->count(3)->create([
        'user_id' => $user->id,
        'operator_id' => $operator->id,
    ]);

    $response = getJson('/api/reservations');

    $response->assertStatus(200);
    $response->assertJsonCount(3, 'data');
});

test('特定の予約情報を取得できる', function () {
    $user = User::factory()->create();
    $operator = Operator::factory()->create();
    $reservation = Reservation::factory()->create([
        'user_id' => $user->id,
        'operator_id' => $operator->id,
    ]);

    $response = getJson("/api/reservations/{$reservation->id}");

    $response->assertStatus(200);
    $response->assertJsonFragment(['id' => $reservation->id]);
});
