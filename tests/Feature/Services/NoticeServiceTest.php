<?php
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Notice;
use App\Services\NoticeService;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->service = app(NoticeService::class);
});

test('NoticeService create() 有効なデータでお知らせを正常に作成できる', function () {
    // お知らせデータの準備（published_at追加）
    $data = [
        'title' => 'テストお知らせ',
        'body' => '本文',
        'published_at' => now(),
    ];
    $result = $this->service->create($data);
    expect($result)->toBeInstanceOf(Notice::class)
        ->and($result->title)->toBe('テストお知らせ');
    $this->assertDatabaseHas('notices', ['title' => 'テストお知らせ', 'published_at' => $data['published_at']]);
});

test('NoticeService getAll() お知らせ一覧を取得できる', function () {
    Notice::factory()->count(2)->create(['published_at' => now()]);
    $result = $this->service->getAll();
    expect($result)->toHaveCount(2);
});

test('NoticeService getById() 指定IDのお知らせを取得できる', function () {
    $notice = Notice::factory()->create(['published_at' => now()]);
    $result = $this->service->getById($notice->id);
    expect($result)->toBeInstanceOf(Notice::class)
        ->and($result->id)->toBe($notice->id);
});

test('NoticeService update() お知らせ情報を更新できる', function () {
    $notice = Notice::factory()->create(['title' => '旧タイトル', 'published_at' => now()]);
    $result = $this->service->update($notice->id, ['title' => '新タイトル']);
    expect($result->title)->toBe('新タイトル');
    $this->assertDatabaseHas('notices', ['id' => $notice->id, 'title' => '新タイトル']);
});

test('NoticeService delete() お知らせを削除できる', function () {
    $notice = Notice::factory()->create(['published_at' => now()]);
    $result = $this->service->delete($notice->id);
    expect($result)->toBe(1); // 件数で判定
    $this->assertDatabaseMissing('notices', ['id' => $notice->id]);
});
