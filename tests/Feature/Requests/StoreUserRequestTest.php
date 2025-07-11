<?php

use App\Http\Requests\StoreUserRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

function validateStoreUser(array $data)
{
    $request = new StoreUserRequest();

    return Validator::make(
        $data,
        $request->rules(),
        $request->messages(),
        $request->attributes()
    );
}

dataset('store_user_validation', [
    '正常なデータ' => [
        true,
        fn () => [
            'name' => '山田太郎',
            'email' => 'yamada@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]
    ],
    'name が空' => [
        false,
        fn () => [
            'name' => '',
            'email' => 'yamada@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]
    ],
    'email が不正' => [
        false,
        fn () => [
            'name' => '山田太郎',
            'email' => 'not-an-email',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]
    ],
    'password が一致しない' => [
        false,
        fn () => [
            'name' => '山田太郎',
            'email' => 'yamada@example.com',
            'password' => 'password123',
            'password_confirmation' => 'mismatch123',
        ]
    ],
]);

test('StoreUserRequest のバリデーション', function (bool $expected, Closure $dataProvider) {
    $data = $dataProvider();
    $validator = validateStoreUser($data);
    expect($validator->passes())->toBe($expected);
})->with('store_user_validation');
