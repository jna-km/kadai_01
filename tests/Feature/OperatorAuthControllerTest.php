<?php

use App\Models\Operator;
use Laravel\Sanctum\Sanctum;
use Illuminate\Testing\Fluent\AssertableJson;

use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('ログインできる', function () {
    $operator = Operator::factory()->create([
        'email' => 'login@example.com',
        'password' => bcrypt('password'),
    ]);

    $response = $this->postJson('/api/operator/login', [
        'email' => 'login@example.com',
        'password' => 'password',
    ]);

    $response->assertStatus(200);
});

test('ログインに失敗する（パスワード不一致）', function () {
    $operator = Operator::factory()->create([
        'email' => 'fail@example.com',
        'password' => bcrypt('password'),
    ]);

    $response = $this->postJson('/api/login', [
        'email' => 'fail@example.com',
        'password' => 'wrong-password',
    ]);

    $response->assertStatus(401);
});

test('ログアウトできる', function () {
    $operator = Operator::factory()->create([
        'email' => 'logout@example.com',
        'password' => bcrypt('password'),
    ]);

    Sanctum::actingAs($operator, ['*'], 'operator');

    $response = $this->postJson('/api/operator/logout');

    $response->assertStatus(200);
});

test('認証済みユーザー情報を取得できる', function () {
    $operator = Operator::factory()->create([
        'email' => 'info@example.com',
        'password' => bcrypt('password'),
    ]);

    Sanctum::actingAs($operator, ['*'], 'operator');

    $response = $this->getJson('/api/operator/me');

    $response->assertStatus(200);
});
