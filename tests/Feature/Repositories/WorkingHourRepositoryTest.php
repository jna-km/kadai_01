<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\WorkingHour;
use App\Repositories\Eloquent\WorkingHourRepository;

uses(RefreshDatabase::class);

describe('WorkingHourRepository', function () {
    beforeEach(function () {
        $this->repo = new WorkingHourRepository(new WorkingHour());
    });

    it('create() 勤務時間を作成できる', function () {
        $data = WorkingHour::factory()->make()->toArray();
        $wh = $this->repo->create($data);
        expect($wh)->toBeInstanceOf(WorkingHour::class);
        $this->assertDatabaseHas('working_hours', ['id' => $wh->id]);
    });

    it('all() 勤務時間一覧を取得できる', function () {
        WorkingHour::factory()->count(3)->create();
        $all = $this->repo->all();
        expect($all)->toHaveCount(3);
    });

    it('find() 指定IDの勤務時間を取得できる', function () {
        $wh = WorkingHour::factory()->create();
        $found = $this->repo->find($wh->id);
        expect($found)->toBeInstanceOf(WorkingHour::class)
            ->and($found->id)->toBe($wh->id);
    });

    it('update() 勤務時間情報を更新できる', function () {
        $wh = WorkingHour::factory()->create(['start_time' => '09:00']);
        $updated = $this->repo->update($wh->id, ['start_time' => '10:00']);
        expect($updated->start_time->format('H:i'))->toBe('10:00');
        $this->assertDatabaseHas('working_hours', ['id' => $wh->id, 'start_time' => '10:00:00']);
    });

    it('delete() 勤務時間を削除できる', function () {
        $wh = WorkingHour::factory()->create();
        $result = $this->repo->delete($wh->id);
        expect($result)->toBeTrue();
        $this->assertDatabaseMissing('working_hours', ['id' => $wh->id]);
    });

    it('find() 存在しないIDの勤務時間はnullを返す', function () {
        $found = $this->repo->find(999999);
        expect($found)->toBeNull();
    });

    it('update() 存在しないIDの勤務時間はnullを返す', function () {
        $updated = $this->repo->update(999999, ['start_time' => '10:00']);
        expect($updated)->toBeNull();
    });

    it('delete() 存在しないIDの勤務時間はfalseを返す', function () {
        $result = $this->repo->delete(999999);
        expect($result)->toBeFalse();
    });
});
