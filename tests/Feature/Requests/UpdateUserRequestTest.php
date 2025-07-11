<?php

use App\Http\Requests\UpdateUserRequest;
use Illuminate\Support\Facades\Validator;

use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);
function validateUpdateUser(array $data)
{
    $request = new UpdateUserRequest();

    return Validator::make(
        $data,
        $request->rules(),
        $request->messages(),
        $request->attributes()
    );
}

dataset('update_user_validation', [
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

test('UpdateUserRequest のバリデーション', function (bool $expected, Closure $dataProvider) {
    $data = $dataProvider();
    $validator = validateUpdateUser($data);
    expect($validator->passes())->toBe($expected);
})->with('update_user_validation');
