<?php

use App\Http\Requests\UpdateOperatorRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);
function validateUpdateOperator(array $data)
{
    $request = new UpdateOperatorRequest();
    return Validator::make(
        $data,
        $request->rules(),
        $request->messages(),
        $request->attributes()
    );
}

dataset('update_operator_validation', [
    'name が空' => [
        false,
        fn () => [
            'name' => '',
            'email' => 'valid@example.com',
        ]
    ],
    'email が不正' => [
        false,
        fn () => [
            'name' => 'Valid Name',
            'email' => 'invalid-email',
        ]
    ],
    '全て正常' => [
        true,
        fn () => [
            'name' => 'Valid Name',
            'email' => 'valid@example.com',
        ]
    ],
]);

test('UpdateOperatorRequest のバリデーション', function (bool $expected, Closure $dataProvider) {
    $data = $dataProvider();
    $validator = validateUpdateOperator($data);
    expect($validator->passes())->toBe($expected);
})->with('update_operator_validation');
