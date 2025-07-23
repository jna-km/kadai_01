<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Operator;
use App\Repositories\Eloquent\OperatorRepository;

uses(RefreshDatabase::class);

describe('OperatorRepository', function () {
    beforeEach(function () {
        $this->repo = new OperatorRepository(new Operator());
    });

    it('create() オペレーターを作成できる', function () {
        $data = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
        ];
        $operator = $this->repo->create($data);
        expect($operator)->toBeInstanceOf(Operator::class);
        $this->assertDatabaseHas('operators', ['id' => $operator->id]);
    });

    it('all() オペレーター一覧を取得できる', function () {
        Operator::factory()->count(3)->create();
        $all = $this->repo->all();
        expect($all)->toHaveCount(3);
    });

    it('find() 指定IDのオペレーターを取得できる', function () {
        $operator = Operator::factory()->create();
        $found = $this->repo->find($operator->id);
        expect($found)->toBeInstanceOf(Operator::class)
            ->and($found->id)->toBe($operator->id);
    });

    it('update() オペレーター情報を更新できる', function () {
        $operator = Operator::factory()->create(['name' => '旧名']);
        $updated = $this->repo->update($operator->id, ['name' => '新名']);
        expect($updated->name)->toBe('新名');
        $this->assertDatabaseHas('operators', ['id' => $operator->id, 'name' => '新名']);
    });

    it('delete() オペレーターを削除できる', function () {
        $operator = Operator::factory()->create();
        $result = $this->repo->delete($operator->id);
        expect($result)->toBeTrue();
        $this->assertDatabaseMissing('operators', ['id' => $operator->id]);
    });

    it('find() 存在しないIDのオペレーターはnullを返す', function () {
        $found = $this->repo->find(999999);
        expect($found)->toBeNull();
    });

    it('update() 存在しないIDのオペレーターはnullを返す', function () {
        $updated = $this->repo->update(999999, ['name' => '新名']);
        expect($updated)->toBeNull();
    });

    it('delete() 存在しないIDのオペレーターはfalseを返す', function () {
        $result = $this->repo->delete(999999);
        expect($result)->toBeFalse();
    });
});
