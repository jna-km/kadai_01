<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Reservation;
use App\Repositories\Eloquent\ReservationRepository;

uses(RefreshDatabase::class);

describe('ReservationRepository', function () {
    beforeEach(function () {
        $this->repo = new ReservationRepository(new Reservation());
    });

    it('create() 予約を作成できる', function () {
        $data = Reservation::factory()->make()->toArray();
        $reservation = $this->repo->create($data);
        expect($reservation)->toBeInstanceOf(Reservation::class);
        $this->assertDatabaseHas('reservations', ['id' => $reservation->id]);
    });

    it('all() 予約一覧を取得できる', function () {
        Reservation::factory()->count(3)->create();
        $all = $this->repo->all();
        expect($all)->toHaveCount(3);
    });

    it('find() 指定IDの予約を取得できる', function () {
        $reservation = Reservation::factory()->create();
        $found = $this->repo->find($reservation->id);
        expect($found)->toBeInstanceOf(Reservation::class)
            ->and($found->id)->toBe($reservation->id);
    });

    it('update() 予約情報を更新できる', function () {
        $reservation = Reservation::factory()->create(['status' => 'reserved']);
        $updated = $this->repo->update($reservation->id, ['status' => 'confirmed']);
        expect($updated->status)->toBe('confirmed');
        $this->assertDatabaseHas('reservations', ['id' => $reservation->id, 'status' => 'confirmed']);
    });

    it('delete() 予約を削除できる', function () {
        $reservation = Reservation::factory()->create();
        $result = $this->repo->delete($reservation->id);
        expect($result)->toBeTrue();
        $this->assertDatabaseMissing('reservations', ['id' => $reservation->id]);
    });

    it('find() 存在しないIDの予約はnullを返す', function () {
        $found = $this->repo->find(999999);
        expect($found)->toBeNull();
    });

    it('update() 存在しないIDの予約はnullを返す', function () {
        $updated = $this->repo->update(999999, ['status' => 'confirmed']);
        expect($updated)->toBeNull();
    });

    it('delete() 存在しないIDの予約はfalseを返す', function () {
        $result = $this->repo->delete(999999);
        expect($result)->toBeFalse();
    });
});
