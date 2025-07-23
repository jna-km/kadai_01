<?php

use App\Http\Requests\UpdateNoticeRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);
function validateUpdateNotice(array $data)
{
    $request = new UpdateNoticeRequest();
    return Validator::make(
        $data,
        $request->rules(),
        $request->messages(),
        $request->attributes()
    );
}

dataset('update_notice_validation', [
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

test('UpdateNoticeRequest のバリデーション', function (bool $expected, Closure $dataProvider) {
    $data = $dataProvider();
    $validator = validateUpdateNotice($data);
    expect($validator->passes())->toBe($expected);
})->with('update_notice_validation');
