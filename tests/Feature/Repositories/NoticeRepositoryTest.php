<?php

use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Notice;
use App\Repositories\Eloquent\NoticeRepository;

uses(RefreshDatabase::class);

describe('NoticeRepository', function () {
    beforeEach(function () {
        $this->repo = new NoticeRepository(new Notice());
    });

    it('create() お知らせを作成できる', function () {
        $data = Notice::factory()->make()->toArray();
        $notice = $this->repo->create($data);
        expect($notice)->toBeInstanceOf(Notice::class);
        $this->assertDatabaseHas('notices', ['id' => $notice->id]);
    });

    it('all() お知らせ一覧を取得できる', function () {
        Notice::factory()->count(3)->create();
        $all = $this->repo->all();
        expect($all)->toHaveCount(3);
    });

    it('find() 指定IDのお知らせを取得できる', function () {
        $notice = Notice::factory()->create();
        $found = $this->repo->find($notice->id);
        expect($found)->toBeInstanceOf(Notice::class)
            ->and($found->id)->toBe($notice->id);
    });

    it('update() お知らせ情報を更新できる', function () {
        $notice = Notice::factory()->create(['title' => '旧タイトル']);
        $updated = $this->repo->update($notice->id, ['title' => '新タイトル']);
        expect($updated->title)->toBe('新タイトル');
        $this->assertDatabaseHas('notices', ['id' => $notice->id, 'title' => '新タイトル']);
    });

    it('delete() お知らせを削除できる', function () {
        $notice = Notice::factory()->create();
        $result = $this->repo->delete($notice->id);
        expect($result)->toBeTrue();
        $this->assertDatabaseMissing('notices', ['id' => $notice->id]);
    });

    it('find() 存在しないIDのお知らせはnullを返す', function () {
        $found = $this->repo->find(999999);
        expect($found)->toBeNull();
    });

    it('update() 存在しないIDのお知らせはnullを返す', function () {
        $updated = $this->repo->update(999999, ['title' => '新タイトル']);
        expect($updated)->toBeNull();
    });

    it('delete() 存在しないIDのお知らせはfalseを返す', function () {
        $result = $this->repo->delete(999999);
        expect($result)->toBeFalse();
    });
});
