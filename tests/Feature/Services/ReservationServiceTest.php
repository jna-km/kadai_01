<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

use App\Models\User;
use App\Models\Operator;
use App\Models\Service;
use App\Models\Reservation;
use App\Services\ReservationService;
use Carbon\Carbon;
use function Pest\Laravel\actingAs;

uses(RefreshDatabase::class);

beforeEach(function () {
    // テスト用ユーザー作成＆認証
    $this->user = User::factory()->create();
    actingAs($this->user);
    $this->operator = Operator::factory()->create();
    $this->srv = Service::factory()->create();
    // サービスインスタンス生成（DIでリポジトリ自動注入）
    $this->service = app(ReservationService::class);
});

test('ReservationService create() 有効なデータで予約を正常に作成できる', function () {
    // 1. 予約データの準備
    $data = [
        'user_id' => $this->user->id,
        'operator_id' => $this->operator->id,
        'service_id' => $this->srv->id,
        'duration' => 60,
        'date' => Carbon::today()->format('Y-m-d'),
        'start_time' => '10:00',
        'end_time' => '11:00',
        'status' => 'reserved',
        'notes' => 'テスト予約',
    ];

    // 2. サービス経由で作成
    $result = $this->service->create($data);

    // 3. DBに保存されていることを検証
    expect($result)->toBeInstanceOf(Reservation::class)
        ->and($result->user_id)->toBe($data['user_id'])
        ->and($result->notes)->toBe('テスト予約');
    $this->assertDatabaseHas('reservations', [
        'user_id' => $data['user_id'],
        'notes' => 'テスト予約',
    ]);
});

test('ReservationService getAll() 複数の予約データが正しく取得できる', function () {
    // 1. 複数の予約データをDBに保存
    $user = $this->user;
    $reservations = Reservation::factory()->count(3)->create(['user_id' => $user->id]);

    // 2. サービス経由で取得
    $result = $this->service->getAll();

    // 3. 取得結果を検証
    expect($result)->toHaveCount(3)
        ->and($result->first())->toBeInstanceOf(Reservation::class);
});

test('ReservationService getById() 特定のIDの予約が取得できる', function () {
    // 1. 予約データをDBに保存
    $user = $this->user;
    $reservation = Reservation::factory()->create(['user_id' => $user->id]);

    // 2. サービス経由で取得
    $result = $this->service->getById($reservation->id);

    // 3. 取得結果を検証
    expect($result)->toBeInstanceOf(Reservation::class)
        ->and($result->id)->toBe($reservation->id);
});

test('ReservationService getById() 存在しないID指定時はnullを返す', function () {
    // 1. 存在しないIDで取得
    $result = $this->service->getById(999999);
    $this->assertNull($result);
});

// サービス実装が例外スローする場合のみ有効
// test('find() 存在しないID指定時に例外をスローする場合のテスト', function () {
//     $this->expectException(\Exception::class);
//     $this->service->find(1000);
// });

test('ReservationService update() 予約内容を更新できる', function () {
    // 1. 予約データをDBに保存
    $user = $this->user;
    $reservation = Reservation::factory()->create(['user_id' => $user->id, 'notes' => 'before']);
    $updateData = [
        'notes' => 'after',
    ];
    // 2. サービス経由で更新
    $result = $this->service->update($reservation->id, $updateData);
    // 3. DB・返却値を検証
    expect($result)->toBeInstanceOf(Reservation::class)
        ->and($result->notes)->toBe('after');
    $this->assertDatabaseHas('reservations', [
        'id' => $reservation->id,
        'notes' => 'after',
    ]);
});

test('ReservationService delete() 予約を削除できる', function () {
    // 1. 予約データをDBに保存
    $user = $this->user;
    $reservation = Reservation::factory()->create(['user_id' => $user->id]);
    // 2. サービス経由で削除
    $result = $this->service->delete($reservation->id);
    // 3. DBから消えていることを検証
    expect($result)->toBeTrue();
    $this->assertDatabaseMissing('reservations', [
        'id' => $reservation->id,
    ]);
});

test('ReservationService getMyReservations() ユーザーIDで予約一覧を取得できる', function () {
    // 1. 複数の予約データをDBに保存
    $user = $this->user;
    Reservation::factory()->count(2)->create(['user_id' => $user->id]);
    Reservation::factory()->count(1)->create(); // 他ユーザー分
    // 2. サービス経由で取得
    $result = $this->service->getMyReservations($user->id);
    // 3. 取得結果を検証
    expect($result)->toHaveCount(2);
    foreach ($result as $r) {
        expect($r->user_id)->toBe($user->id);
    }
});

test('ReservationService getOperatorReservations() オペレーターIDで予約一覧を取得できる', function () {
    // 1. 複数の予約データをDBに保存
    $operator = $this->operator;
    Reservation::factory()->count(2)->create(['operator_id' => $operator->id]);
    Reservation::factory()->count(1)->create(); // 他オペレーター分
    // 2. サービス経由で取得
    $result = $this->service->getOperatorReservations($operator->id);
    // 3. 取得結果を検証
    expect($result)->toHaveCount(2);
    foreach ($result as $r) {
        expect($r->operator_id)->toBe($operator->id);
    }
});

