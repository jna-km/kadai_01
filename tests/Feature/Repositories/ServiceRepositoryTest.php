<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Service;
use App\Repositories\Eloquent\ServiceRepository;

uses(RefreshDatabase::class);

describe('ServiceRepository', function () {
    beforeEach(function () {
        $this->repo = new ServiceRepository(new Service());
    });

    it('create() サービスを作成できる', function () {
        $data = Service::factory()->make()->toArray();
        $service = $this->repo->create($data);
        expect($service)->toBeInstanceOf(Service::class);
        $this->assertDatabaseHas('services', ['id' => $service->id]);
    });

    it('all() サービス一覧を取得できる', function () {
        Service::factory()->count(3)->create();
        $all = $this->repo->all();
        expect($all)->toHaveCount(3);
    });

    it('find() 指定IDのサービスを取得できる', function () {
        $service = Service::factory()->create();
        $found = $this->repo->find($service->id);
        expect($found)->toBeInstanceOf(Service::class)
            ->and($found->id)->toBe($service->id);
    });

    it('update() サービス情報を更新できる', function () {
        $service = Service::factory()->create(['name' => '旧サービス']);
        $updated = $this->repo->update($service->id, ['name' => '新サービス']);
        expect($updated->name)->toBe('新サービス');
        $this->assertDatabaseHas('services', ['id' => $service->id, 'name' => '新サービス']);
    });

    it('delete() サービスを削除できる', function () {
        $service = Service::factory()->create();
        $result = $this->repo->delete($service->id);
        expect($result)->toBeTrue();
        $this->assertDatabaseMissing('services', ['id' => $service->id]);
    });

    it('find() 存在しないIDのサービスはnullを返す', function () {
        $found = $this->repo->find(999999);
        expect($found)->toBeNull();
    });

    it('update() 存在しないIDのサービスはnullを返す', function () {
        $updated = $this->repo->update(999999, ['name' => '新サービス']);
        expect($updated)->toBeNull();
    });

    it('delete() 存在しないIDのサービスはfalseを返す', function () {
        $result = $this->repo->delete(999999);
        expect($result)->toBeFalse();
    });
});
