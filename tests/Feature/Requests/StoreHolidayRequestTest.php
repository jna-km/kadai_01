<?php

use App\Http\Requests\StoreHolidayRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);
function validateStoreHoliday(array $data)
{
    $request = new StoreHolidayRequest();
    return Validator::make(
        $data,
        $request->rules(),
        $request->messages(),
        $request->attributes()
    );
}

dataset('store_holiday_validation', [
    'name が空' => [
        false,
        fn () => [
            'name' => '',
            'date' => '2025-08-01',
        ]
    ],
    'date が空' => [
        false,
        fn () => [
            'name' => '夏季休暇',
            'date' => '',
        ]
    ],
    '全て正常' => [
        true,
        fn () => [
            'name' => '夏季休暇',
            'date' => '2025-08-01',
        ]
    ],
]);

test('StoreHolidayRequest のバリデーション', function (bool $expected, Closure $dataProvider) {
    $data = $dataProvider();
    $validator = validateStoreHoliday($data);
    expect($validator->passes())->toBe($expected);
})->with('store_holiday_validation');
