<?php

use App\Http\Requests\UpdateHolidayRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);
function validateUpdateHoliday(array $data)
{
    $request = new UpdateHolidayRequest();
    return Validator::make(
        $data,
        $request->rules(),
        $request->messages(),
        $request->attributes()
    );
}

dataset('update_holiday_validation', [
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

test('UpdateHolidayRequest のバリデーション', function (bool $expected, Closure $dataProvider) {
    $data = $dataProvider();
    $validator = validateUpdateHoliday($data);
    expect($validator->passes())->toBe($expected);
})->with('update_holiday_validation');
