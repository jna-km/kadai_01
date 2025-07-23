<?php

use App\Http\Requests\StoreWorkingHourRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);
function validateStoreWorkingHour(array $data)
{
    $request = new StoreWorkingHourRequest();
    return Validator::make(
        $data,
        $request->rules(),
        $request->messages(),
        $request->attributes()
    );
}

dataset('store_working_hour_validation', [
    'day_of_week が空' => [
        false,
        fn () => [
            'day_of_week' => '',
            'start_time' => '09:00',
            'end_time' => '18:00',
        ]
    ],
    'start_time が空' => [
        false,
        fn () => [
            'day_of_week' => 1,
            'start_time' => '',
            'end_time' => '18:00',
        ]
    ],
    'end_time が start_time より前' => [
        false,
        fn () => [
            'day_of_week' => 1,
            'start_time' => '18:00',
            'end_time' => '09:00',
        ]
    ],
    '全て正常' => [
        true,
        fn () => [
            'day_of_week' => 1,
            'start_time' => '09:00',
            'end_time' => '18:00',
        ]
    ],
]);

test('StoreWorkingHourRequest のバリデーション', function (bool $expected, Closure $dataProvider) {
    $data = $dataProvider();
    $validator = validateStoreWorkingHour($data);
    expect($validator->passes())->toBe($expected);
})->with('store_working_hour_validation');
