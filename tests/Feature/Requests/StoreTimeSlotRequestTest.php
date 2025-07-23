<?php

use App\Http\Requests\StoreTimeSlotRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);
function validateStoreTimeSlot(array $data)
{
    $request = new StoreTimeSlotRequest();
    return Validator::make(
        $data,
        $request->rules(),
        $request->messages(),
        $request->attributes()
    );
}

dataset('store_time_slot_validation', [
    'start_time が空' => [
        false,
        fn () => [
            'start_time' => '',
            'end_time' => '10:00',
        ]
    ],
    'end_time が start_time より前' => [
        false,
        fn () => [
            'start_time' => '10:00',
            'end_time' => '09:00',
        ]
    ],
    '全て正常' => [
        true,
        fn () => [
            'start_time' => '09:00',
            'end_time' => '10:00',
        ]
    ],
]);

test('StoreTimeSlotRequest のバリデーション', function (bool $expected, Closure $dataProvider) {
    $data = $dataProvider();
    $validator = validateStoreTimeSlot($data);
    expect($validator->passes())->toBe($expected);
})->with('store_time_slot_validation');
