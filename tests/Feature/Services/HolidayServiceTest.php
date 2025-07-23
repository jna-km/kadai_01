<?php
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Holiday;
use App\Models\Operator;
use App\Services\HolidayService;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->operator = Operator::factory()->create();
    $this->service = app(HolidayService::class);
});

test('HolidayService create() 有効なデータで祝日を正常に作成できる', function () {
    // 祝日データの準備（operator_id追加）
    $data = [
        'name' => 'テスト祝日',
        'date' => now()->addMonth()->format('Y-m-d'),
        'operator_id' => $this->operator->id,
    ];
    $result = $this->service->create($data);
    expect($result)->toBeInstanceOf(Holiday::class)
        ->and($result->name)->toBe('テスト祝日');
    $this->assertDatabaseHas('holidays', ['name' => 'テスト祝日', 'operator_id' => $this->operator->id]);
});

test('HolidayService getAll() 祝日一覧を取得できる', function () {
    Holiday::factory()->count(2)->create(['operator_id' => $this->operator->id]);
    $result = $this->service->getAll();
    expect($result)->toHaveCount(2);
});

test('HolidayService getById() 指定IDの祝日を取得できる', function () {
    $holiday = Holiday::factory()->create(['operator_id' => $this->operator->id]);
    $result = $this->service->getById($holiday->id);
    expect($result)->toBeInstanceOf(Holiday::class)
        ->and($result->id)->toBe($holiday->id);
});

test('HolidayService update() 祝日情報を更新できる', function () {
    $holiday = Holiday::factory()->create(['name' => '旧祝日', 'operator_id' => $this->operator->id]);
    $result = $this->service->update($holiday->id, ['name' => '新祝日']);
    expect($result->name)->toBe('新祝日');
    $this->assertDatabaseHas('holidays', ['id' => $holiday->id, 'name' => '新祝日']);
});

test('HolidayService delete() 祝日を削除できる', function () {
    $holiday = Holiday::factory()->create(['operator_id' => $this->operator->id]);
    $result = $this->service->delete($holiday->id);
    expect($result)->toBeTrue();
    $this->assertDatabaseMissing('holidays', ['id' => $holiday->id]);
});
