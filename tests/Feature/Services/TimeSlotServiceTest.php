<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Operator;
use App\Models\Service;
use App\Models\TimeSlot;
use App\Services\TimeSlotService;
use Carbon\Carbon;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->service = app(TimeSlotService::class);
    $this->operator = Operator::factory()->create();
    $this->srv = Service::factory()->create(['operator_id' => $this->operator->id]);
});

test('TimeSlotService create() 有効なデータでタイムスロットを正常に作成できる', function () {
    $data = [
        'operator_id' => $this->operator->id,
        'service_id' => $this->srv->id,
        'date' => Carbon::today()->format('Y-m-d'),
        'start_time' => '09:00',
        'end_time' => '12:00',
    ];
    $result = $this->service->create($data);
    expect($result)->toBeInstanceOf(TimeSlot::class)
        ->and($result->service_id)->toBe($data['service_id'])
        ->and($result->operator_id)->toBe($this->operator->id);
    $this->assertDatabaseHas('time_slots', [
        'service_id' => $data['service_id'],
        'operator_id' => $this->operator->id]);
});

test('TimeSlotService getAll() タイムスロット一覧を取得できる', function () {
    TimeSlot::factory()->count(2)->create([
        'operator_id' => $this->operator->id,
        'service_id' => $this->srv->id,
    ]);
    $result = $this->service->getAll();
    expect($result)->toHaveCount(2);
});

test('TimeSlotService getById() 指定IDのタイムスロットを取得できる', function () {
    $slot = TimeSlot::factory()->create([
        'operator_id' => $this->operator->id,
        'service_id' => $this->srv->id,
    ]);
    $result = $this->service->getById($slot->id);
    expect($result)->toBeInstanceOf(TimeSlot::class)
        ->and($result->id)->toBe($slot->id)
        ->and($result->operator_id)->toBe($this->operator->id);
});

test('TimeSlotService update() タイムスロット情報を更新できる', function () {
    $slot = TimeSlot::factory()->create([
        'operator_id' => $this->operator->id,
        'service_id' => $this->srv->id,
        'date' => Carbon::today()->format('Y-m-d'),
    ]);
    $newDate = Carbon::today()->addDay()->format('Y-m-d');
    $result = $this->service->update($slot->id, ['date' => $newDate]);
    expect($result->date->format('Y-m-d'))->toBe($newDate);
    $this->assertDatabaseHas('time_slots', ['id' => $slot->id, 'date' => $newDate, 'operator_id' => $this->operator->id]);
});

test('TimeSlotService delete() タイムスロットを削除できる', function () {
    $slot = TimeSlot::factory()->create([
        'operator_id' => $this->operator->id,
        'service_id' => $this->srv->id,
    ]);
    $result = $this->service->delete($slot->id);
    expect($result)->toBeTrue();
    $this->assertDatabaseMissing('time_slots', ['id' => $slot->id]);
});
