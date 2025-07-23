<?php
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Service;
use App\Models\Operator;
use App\Services\ServiceService;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->operator = Operator::factory()->create();
    $this->service = app(ServiceService::class);
});

test('ServiceService create() 有効なデータでサービスを正常に作成できる', function () {
    // サービスデータの準備
    $data = [
        'name' => 'カット',
        'description' => 'カットサービス',
        'duration' => 30,
        'price' => 1000,
        'operator_id' => $this->operator->id,
    ];
    $result = $this->service->create($data);
    expect($result)->toBeInstanceOf(Service::class)
        ->and($result->name)->toBe('カット');
    $this->assertDatabaseHas('services', ['name' => 'カット', 'operator_id' => $this->operator->id]);
});

test('ServiceService getAll() サービス一覧を取得できる', function () {
    Service::factory()->count(2)->create(['operator_id' => $this->operator->id]);
    $result = $this->service->getAll();
    expect($result)->toHaveCount(2);
});

test('ServiceService getById() 指定IDのサービスを取得できる', function () {
    $service = Service::factory()->create(['operator_id' => $this->operator->id]);
    $result = $this->service->getById($service->id);
    expect($result)->toBeInstanceOf(Service::class)
        ->and($result->id)->toBe($service->id);
});

test('ServiceService update() サービス情報を更新できる', function () {
    $service = Service::factory()->create(['name' => '旧サービス', 'operator_id' => $this->operator->id]);
    $result = $this->service->update($service->id, ['name' => '新サービス']);
    expect($result->name)->toBe('新サービス');
    $this->assertDatabaseHas('services', ['id' => $service->id, 'name' => '新サービス']);
});

test('ServiceService delete() サービスを削除できる', function () {
    $service = Service::factory()->create(['operator_id' => $this->operator->id]);
    $result = $this->service->delete($service->id);
    expect($result)->toBe(1);
    $this->assertDatabaseMissing('services', ['id' => $service->id]);
});
