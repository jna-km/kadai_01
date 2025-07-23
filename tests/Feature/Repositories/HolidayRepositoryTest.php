<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Holiday;
use App\Repositories\Eloquent\HolidayRepository;

uses(RefreshDatabase::class);

describe('HolidayRepository', function () {
    beforeEach(function () {
        $this->repo = new HolidayRepository(new Holiday());
    });

    it('create() 休日を作成できる', function () {
        $data = Holiday::factory()->make()->toArray();
        $holiday = $this->repo->create($data);
        expect($holiday)->toBeInstanceOf(Holiday::class);
        $this->assertDatabaseHas('holidays', ['id' => $holiday->id]);
    });

    it('all() 休日一覧を取得できる', function () {
        Holiday::factory()->count(3)->create();
        $all = $this->repo->all();
        expect($all)->toHaveCount(3);
    });

    it('find() 指定IDの休日を取得できる', function () {
        $holiday = Holiday::factory()->create();
        $found = $this->repo->find($holiday->id);
        expect($found)->toBeInstanceOf(Holiday::class)
            ->and($found->id)->toBe($holiday->id);
    });

    it('update() 休日情報を更新できる', function () {
        $holiday = Holiday::factory()->create(['name' => '旧休日']);
        $updated = $this->repo->update($holiday->id, ['name' => '新休日']);
        expect($updated->name)->toBe('新休日');
        $this->assertDatabaseHas('holidays', ['id' => $holiday->id, 'name' => '新休日']);
    });

    it('delete() 休日を削除できる', function () {
        $holiday = Holiday::factory()->create();
        $result = $this->repo->delete($holiday->id);
        expect($result)->toBeTrue();
        $this->assertDatabaseMissing('holidays', ['id' => $holiday->id]);
    });

    it('find() 存在しないIDの休日はnullを返す', function () {
        $found = $this->repo->find(999999);
        expect($found)->toBeNull();
    });

    it('update() 存在しないIDの休日はnullを返す', function () {
        $updated = $this->repo->update(999999, ['name' => '新休日']);
        expect($updated)->toBeNull();
    });

    it('delete() 存在しないIDの休日はfalseを返す', function () {
        $result = $this->repo->delete(999999);
        expect($result)->toBeFalse();
    });
});
