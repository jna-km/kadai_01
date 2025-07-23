<?php
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\WorkingHour;
use App\Models\Operator;
use App\Services\WorkingHourService;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->operator = Operator::factory()->create();
    $this->service = app(WorkingHourService::class);
});

test('WorkingHourService create() 有効なデータで勤務時間を正常に作成できる', function () {
    $data = [
        'operator_id' => $this->operator->id,
        'day_of_week' => 1,
        'start_time' => '09:00',
        'end_time' => '18:00',
    ];
    $result = $this->service->create($data);
    expect($result)->toBeInstanceOf(WorkingHour::class)
        ->and($result->operator_id)->toBe($this->operator->id)
        ->and($result->day_of_week)->toBe(1);
    $this->assertDatabaseHas('working_hours', ['operator_id' => $this->operator->id, 'day_of_week' => 1]);
});

test('WorkingHourService getAll() 勤務時間一覧を取得できる', function () {
    WorkingHour::factory()->count(2)->create([
        'operator_id' => $this->operator->id,
        'day_of_week' => 2,
    ]);
    $result = $this->service->getAll();
    expect($result)->toHaveCount(2);
});

test('WorkingHourService getById() 指定IDの勤務時間を取得できる', function () {
    $wh = WorkingHour::factory()->create([
        'operator_id' => $this->operator->id,
        'day_of_week' => 3,
    ]);
    $result = $this->service->getById($wh->id);
    expect($result)->toBeInstanceOf(WorkingHour::class)
        ->and($result->id)->toBe($wh->id)
        ->and($result->day_of_week)->toBe(3);
});

test('WorkingHourService update() 勤務時間情報を更新できる', function () {
    $wh = WorkingHour::factory()->create([
        'operator_id' => $this->operator->id,
        'day_of_week' => 4,
        'start_time' => '09:00',
    ]);
    $result = $this->service->update($wh->id, ['start_time' => '10:00']);
    expect($result->start_time->format('H:i'))->toBe('10:00');
    $this->assertDatabaseHas('working_hours', ['id' => $wh->id, 'start_time' => '10:00:00', 'day_of_week' => 4]);
});

test('WorkingHourService delete() 勤務時間を削除できる', function () {
    $wh = WorkingHour::factory()->create([
        'operator_id' => $this->operator->id,
        'day_of_week' => 5,
    ]);
    $result = $this->service->delete($wh->id);
    expect($result)->toBeTrue();
    $this->assertDatabaseMissing('working_hours', ['id' => $wh->id]);
});
