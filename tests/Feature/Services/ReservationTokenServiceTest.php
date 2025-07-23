<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\ReservationToken;
use App\Models\Reservation;
use App\Services\ReservationTokenService;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->service = app(ReservationTokenService::class);
});

test('ReservationTokenService create() 有効なデータで予約トークンを正常に作成できる', function () {
    $reservation = Reservation::factory()->create();
    $data = [
        'reservation_id' => $reservation->id,
        'token' => 'testtoken',
        'expires_at' => now()->addHour(),
    ];
    $result = $this->service->create($data);
    expect($result)->toBeInstanceOf(ReservationToken::class)
        ->and($result->token)->toBe('testtoken')
        ->and($result->reservation_id)->toBe($reservation->id);
    $this->assertDatabaseHas('reservation_tokens', ['token' => 'testtoken', 'reservation_id' => $reservation->id]);
});

test('ReservationTokenService getAll() トークン一覧を取得できる', function () {
    $reservation = Reservation::factory()->create();
    ReservationToken::factory()->count(2)->create([
        'reservation_id' => $reservation->id,
    ]);
    $result = $this->service->getAll();
    expect($result)->toHaveCount(2);
});

test('ReservationTokenService getById() 指定IDのトークンを取得できる', function () {
    $reservation = Reservation::factory()->create();
    $token = ReservationToken::factory()->create([
        'reservation_id' => $reservation->id,
    ]);
    $result = $this->service->getById($token->id);
    expect($result)->toBeInstanceOf(ReservationToken::class)
        ->and($result->id)->toBe($token->id)
        ->and($result->reservation_id)->toBe($reservation->id);
});

test('ReservationTokenService update() トークン情報を更新できる', function () {
    $reservation = Reservation::factory()->create();
    $token = ReservationToken::factory()->create([
        'reservation_id' => $reservation->id,
        'token' => 'oldtoken',
    ]);
    $result = $this->service->update($token->id, ['token' => 'newtoken']);
    expect($result->token)->toBe('newtoken');
    $this->assertDatabaseHas('reservation_tokens', ['id' => $token->id, 'token' => 'newtoken', 'reservation_id' => $reservation->id]);
});

test('ReservationTokenService delete() トークンを削除できる', function () {
    $reservation = Reservation::factory()->create();
    $token = ReservationToken::factory()->create([
        'reservation_id' => $reservation->id,
    ]);
    $result = $this->service->delete($token->id);
    expect($result)->toBeTrue();
    $this->assertDatabaseMissing('reservation_tokens', ['id' => $token->id]);
});
