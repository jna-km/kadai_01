<?php

use App\Http\Requests\StoreNoticeRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);
function validateStoreNotice(array $data)
{
    $request = new StoreNoticeRequest();
    return Validator::make(
        $data,
        $request->rules(),
        $request->messages(),
        $request->attributes()
    );
}

dataset('store_notice_validation', [
    'title が空' => [
        false,
        fn () => [
            'title' => '',
            'body' => '本文',
        ]
    ],
    '全て正常' => [
        true,
        fn () => [
            'title' => 'お知らせ',
            'body' => '本文',
        ]
    ],
]);

test('StoreNoticeRequest のバリデーション', function (bool $expected, Closure $dataProvider) {
    $data = $dataProvider();
    $validator = validateStoreNotice($data);
    expect($validator->passes())->toBe($expected);
})->with('store_notice_validation');
