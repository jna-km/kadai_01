<?php

use App\Http\Requests\StoreReservationRequest;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\Service;
use App\Models\Operator;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->operator = Operator::factory()->create();
    $this->service = Service::factory()->create();
});

function validate(array $data)
{
    $request = new StoreReservationRequest();

    return Validator::make(
        $data,
        $request->rules(),
        $request->messages(),
        $request->attributes()
    );
}

dataset('reservation_validation', [
    '正常なデータ' => [
        true,
        fn () => [
            'user_id' => test()->user->id,
            'operator_id' => test()->operator->id,
            'service_id' => test()->service->id,
            'duration' => 45,
            'date' => now()->addDay()->format('Y-m-d'),
            'start_time' => '11:00',
            'end_time' => '11:45',
            'status' => 'reserved',
            'notes' => '特になし',
        ]
    ],
    'service_id が空' => [
        false,
        fn () => [
            'user_id' => test()->user->id,
            'operator_id' => test()->operator->id,
            'service_id' => '',
            'duration' => 45,
            'date' => now()->addDay()->format('Y-m-d'),
            'start_time' => '11:00',
            'end_time' => '11:45',
            'status' => 'reserved',
            'notes' => '特になし',
        ]
    ],
    'end_time が欠けている' => [
        false,
        fn () => [
            'user_id' => test()->user->id,
            'operator_id' => test()->operator->id,
            'service_id' => test()->service->id,
            'duration' => 45,
            'date' => now()->addDay()->format('Y-m-d'),
            'start_time' => '11:00',
            // 'end_time' => '11:45', ← 省略
            'status' => 'reserved',
            'notes' => '特になし',
        ]
    ],
]);

test('StoreReservationRequest のバリデーション', function (bool $expected, Closure $dataProvider) {
    $data = $dataProvider();
    $validator = validate($data);
    expect($validator->passes())->toBe($expected);
})->with('reservation_validation');
