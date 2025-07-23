<?php
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Operator;
use App\Services\OperatorService;
use Illuminate\Support\Facades\Hash;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->service = app(OperatorService::class);
});

test('OperatorService create() 有効なデータでオペレーターを正常に作成できる', function () {
    // オペレーター作成データ
    $data = ['name' => 'テストオペレーター', 'email' => 'test@example.com', 'password' => 'password123'];
    $result = $this->service->create($data);
    expect($result)->toBeInstanceOf(Operator::class)
        ->and($result->name)->toBe('テストオペレーター')
        ->and(Hash::check('password123', $result->password))->toBeTrue();
    $this->assertDatabaseHas('operators', ['email' => 'test@example.com']);
});

test('OperatorService getAll() オペレーター一覧を取得できる', function () {
    Operator::factory()->count(2)->create();
    $result = $this->service->getAll();
    expect($result)->toHaveCount(2);
});

test('OperatorService getById() 指定IDのオペレーターを取得できる', function () {
    $operator = Operator::factory()->create();
    $result = $this->service->getById($operator->id);
    expect($result)->toBeInstanceOf(Operator::class)
        ->and($result->id)->toBe($operator->id);
});

test('OperatorService update() オペレーター情報を更新できる', function () {
    $operator = Operator::factory()->create(['name' => '旧名']);
    $result = $this->service->update($operator->id, ['name' => '新名']);
    expect($result->name)->toBe('新名');
    $this->assertDatabaseHas('operators', ['id' => $operator->id, 'name' => '新名']);
});

test('OperatorService delete() オペレーターを削除できる', function () {
    $operator = Operator::factory()->create();
    $result = $this->service->delete($operator->id);
    expect($result)->toBe(1); // 件数で判定
    $this->assertDatabaseMissing('operators', ['id' => $operator->id]);
});
