<?php

use App\Http\Requests\StoreServiceRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);
function validateStoreService(array $data)
{
    $request = new StoreServiceRequest();
    return Validator::make(
        $data,
        $request->rules(),
        $request->messages(),
        $request->attributes()
    );
}

dataset('store_service_validation', [
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

test('StoreServiceRequest のバリデーション', function (bool $expected, Closure $dataProvider) {
    $data = $dataProvider();
    $validator = validateStoreService($data);
    expect($validator->passes())->toBe($expected);
})->with('store_service_validation');
