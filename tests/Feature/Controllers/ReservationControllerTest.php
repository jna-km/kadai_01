<?php

use App\Models\User;
use App\Models\Operator;
use App\Models\Service;
use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;
use function Pest\Laravel\postJson;
use function Pest\Laravel\put;
use function Pest\Laravel\putJson;
use function Pest\Laravel\delete;
use function Pest\Laravel\getJson;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->operator = Operator::factory()->create();
});

test('未ログインユーザーは予約一覧画面にアクセスできない（401）', function () {
    $response = getJson('/api/reservations');
    $response->assertStatus(401);
});

test('ユーザーは予約一覧画面にアクセスできる', function () {
    actingAs($this->user);
    $response = get('/api/reservations');
    $response->assertStatus(200);
});

test('管理者は予約一覧画面にアクセスできる', function () {
    actingAs($this->operator, 'operator');
    $response = get('/api/reservations');
    $response->assertStatus(200);
});

test('予約を作成できる', function () {
    actingAs($this->user);
    $service = Service::factory()->create();
    $payload = [
        'user_id' => $this->user->id,
        'operator_id' => $this->operator->id,
        'service_id' => $service->id,
        'duration' => 60,
        'date' => Carbon::today()->format('Y-m-d'),
        'start_time' => '10:00',
        'end_time' => '11:00',
        'status' => 'reserved',
        'notes' => '',
    ];

    $response = postJson('/api/reservations', $payload);

    $response->assertStatus(201);
    $this->assertDatabaseHas('reservations', ['service_id' => $service->id]);
});

test('予約を更新できる', function () {
    actingAs($this->user);
    $service1 = Service::factory()->create();
    $service2 = Service::factory()->create(['name' => 'カラー']);
    $reservation = Reservation::factory()->create([
        'user_id' => $this->user->id,
        'operator_id' => $this->operator->id,
        'service_id' => $service1->id,
    ]);

    $payload = [
        'user_id' => $this->user->id,
        'operator_id' => $this->operator->id,
        'service_id' => $service2->id,
        'duration' => 45,
        'date' => Carbon::today()->addDay()->format('Y-m-d'),
        'start_time' => '10:00',
        'end_time' => '10:45',
        'status' => 'reserved',
        'notes' => '',
    ];

    $response = putJson("/api/reservations/{$reservation->id}", $payload);

    $response->assertStatus(200);
    $response->assertJsonFragment(['service_id' => $service2->id]);
    // $reservation = $reservation->fresh();
    $this->assertDatabaseHas('reservations', [
        'id' => $reservation->id,
        'service_id' => $service2->id,
    ]);
});

test('予約を削除できる', function () {
    actingAs($this->user);
    $reservation = Reservation::factory()->create([
        'user_id' => $this->user->id,
        'operator_id' => $this->operator->id,
    ]);

    $response = delete("/api/reservations/{$reservation->id}");

    // $response->assertRedirect();
    $this->assertDatabaseMissing('reservations', ['id' => $reservation->id]);
});

test('予約詳細を取得できる', function () {
    actingAs($this->user);
    $reservation = Reservation::factory()->create([
        'user_id' => $this->user->id,
        'operator_id' => $this->operator->id,
    ]);

    $response = getJson("/api/reservations/{$reservation->id}");

    $response->assertStatus(200)
             ->assertJsonFragment(['id' => $reservation->id]);
});

test('ログインユーザーの予約一覧を取得できる', function () {
    actingAs($this->user);
    $reservations = Reservation::factory()->count(2)->create([
        'user_id' => $this->user->id,
        'operator_id' => $this->operator->id,
    ]);

    $response = getJson('/api/my-reservations');

    $response->assertStatus(200)
             ->assertJsonCount(2, 'data');
});

test('オペレーターの予約一覧を取得できる', function () {
    actingAs($this->operator, 'operator');
    $reservations = Reservation::factory()->count(3)->create([
        'operator_id' => $this->operator->id,
        'user_id' => $this->user->id,
    ]);

    $response = getJson('/api/operator/reservations');

    $response->assertStatus(200)
             ->assertJsonCount(3, 'data');
});
