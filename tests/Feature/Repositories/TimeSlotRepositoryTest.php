<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\TimeSlot;
use App\Repositories\Eloquent\TimeSlotRepository;

uses(RefreshDatabase::class);

describe('TimeSlotRepository', function () {
    beforeEach(function () {
        $this->repo = new TimeSlotRepository(new TimeSlot());
    });

    it('create() タイムスロットを作成できる', function () {
        $data = TimeSlot::factory()->make()->toArray();
        $slot = $this->repo->create($data);
        expect($slot)->toBeInstanceOf(TimeSlot::class);
        $this->assertDatabaseHas('time_slots', ['id' => $slot->id]);
    });

    it('all() タイムスロット一覧を取得できる', function () {
        TimeSlot::factory()->count(3)->create();
        $all = $this->repo->all();
        expect($all)->toHaveCount(3);
    });

    it('find() 指定IDのタイムスロットを取得できる', function () {
        $slot = TimeSlot::factory()->create();
        $found = $this->repo->find($slot->id);
        expect($found)->toBeInstanceOf(TimeSlot::class)
            ->and($found->id)->toBe($slot->id);
    });

    it('update() タイムスロット情報を更新できる', function () {
        $slot = TimeSlot::factory()->create(['date' => '2025-08-01']);
        $updated = $this->repo->update($slot->id, ['date' => '2025-08-02']);
        expect($updated->date->format('Y-m-d'))->toBe('2025-08-02');
        $this->assertDatabaseHas('time_slots', ['id' => $slot->id, 'date' => '2025-08-02']);
    });

    it('delete() タイムスロットを削除できる', function () {
        $slot = TimeSlot::factory()->create();
        $result = $this->repo->delete($slot->id);
        expect($result)->toBeTrue();
        $this->assertDatabaseMissing('time_slots', ['id' => $slot->id]);
    });

    it('find() 存在しないIDのタイムスロットはnullを返す', function () {
        $found = $this->repo->find(999999);
        expect($found)->toBeNull();
    });

    it('update() 存在しないIDのタイムスロットはnullを返す', function () {
        $updated = $this->repo->update(999999, ['date' => '2025-08-02']);
        expect($updated)->toBeNull();
    });

    it('delete() 存在しないIDのタイムスロットはfalseを返す', function () {
        $result = $this->repo->delete(999999);
        expect($result)->toBeFalse();
    });
});
