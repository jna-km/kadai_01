<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;
use App\Repositories\Eloquent\UserRepository;

uses(RefreshDatabase::class);

describe('UserRepository', function () {
    beforeEach(function () {
        $this->repo = new UserRepository(new User());
    });

    it('create() ユーザーを作成できる', function () {
        $data = [
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
        ];
        $user = $this->repo->create($data);
        expect($user)->toBeInstanceOf(User::class);
        $this->assertDatabaseHas('users', ['id' => $user->id]);
    });

    it('all() ユーザー一覧を取得できる', function () {
        User::factory()->count(3)->create();
        $all = $this->repo->all();
        expect($all)->toHaveCount(3);
    });

    it('find() 指定IDのユーザーを取得できる', function () {
        $user = User::factory()->create();
        $found = $this->repo->find($user->id);
        expect($found)->toBeInstanceOf(User::class)
            ->and($found->id)->toBe($user->id);
    });

    it('update() ユーザー情報を更新できる', function () {
        $user = User::factory()->create(['name' => '旧ユーザー']);
        $updated = $this->repo->update($user->id, ['name' => '新ユーザー']);
        expect($updated->name)->toBe('新ユーザー');
        $this->assertDatabaseHas('users', ['id' => $user->id, 'name' => '新ユーザー']);
    });

    it('delete() ユーザーを削除できる', function () {
        $user = User::factory()->create();
        $result = $this->repo->delete($user->id);
        expect($result)->toBeTrue();
        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    });

    it('find() 存在しないIDのユーザーはnullを返す', function () {
        $found = $this->repo->find(999999);
        expect($found)->toBeNull();
    });

    it('update() 存在しないIDのユーザーはnullを返す', function () {
        $updated = $this->repo->update(999999, ['name' => '新ユーザー']);
        expect($updated)->toBeNull();
    });

    it('delete() 存在しないIDのユーザーはfalseを返す', function () {
        $result = $this->repo->delete(999999);
        expect($result)->toBeFalse();
    });
});
