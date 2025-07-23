<?php

use App\Http\Requests\UpdateServiceRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);
function validateUpdateService(array $data)
{
    $request = new UpdateServiceRequest();
    return Validator::make(
        $data,
        $request->rules(),
        $request->messages(),
        $request->attributes()
    );
}

dataset('update_service_validation', [
    'name が空' => [
        false,
        fn () => [
            'name' => '',
            'duration' => 30,
            'price' => 1000,
        ]
    ],
    'duration が小さすぎる' => [
        false,
        fn () => [
            'name' => 'サービス',
            'duration' => 0,
            'price' => 1000,
        ]
    ],
    'price が負数' => [
        false,
        fn () => [
            'name' => 'サービス',
            'duration' => 30,
            'price' => -1,
        ]
    ],
    '全て正常' => [
        true,
        fn () => [
            'name' => 'サービス',
            'duration' => 30,
            'price' => 1000,
        ]
    ],
]);

test('UpdateServiceRequest のバリデーション', function (bool $expected, Closure $dataProvider) {
    $data = $dataProvider();
    $validator = validateUpdateService($data);
    expect($validator->passes())->toBe($expected);
})->with('update_service_validation');
