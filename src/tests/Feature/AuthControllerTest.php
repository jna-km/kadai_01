<?php

use App\Models\User;
use Laravel\Sanctum\Sanctum;
use Illuminate\Testing\Fluent\AssertableJson;

use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('ログインできる', function () {
    $user = User::factory()->create([
        'email' => 'login@example.com',
        'password' => bcrypt('password'),
    ]);

    $response = $this->postJson('/api/login', [
        'email' => 'login@example.com',
        'password' => 'password',
    ]);

    $response->assertStatus(200)
             ->assertJson(fn (AssertableJson $json) =>
                $json->has('access_token')
                     ->has('user')
                     ->where('user.email', 'login@example.com')
                     ->etc()
             );
});

test('ログインに失敗する（パスワード不一致）', function () {
    $user = User::factory()->create([
        'email' => 'fail@example.com',
        'password' => bcrypt('password'),
    ]);

    $response = $this->postJson('/api/login', [
        'email' => 'fail@example.com',
        'password' => 'wrong-password',
    ]);

    $response->assertStatus(401)
             ->assertJson(fn (AssertableJson $json) =>
                $json->where('message', '認証に失敗しました')
             );
});

test('ログアウトできる', function () {
    $user = User::factory()->create([
        'email' => 'logout@example.com',
        'password' => bcrypt('password'),
    ]);

    Sanctum::actingAs($user, ['*'], 'user');

    $response = $this->postJson('/api/logout');

    $response->assertStatus(200)
             ->assertJson(fn (AssertableJson $json) =>
                $json->where('message', 'ログアウトしました')
             );
});

test('認証済みユーザー情報を取得できる', function () {
    $user = User::factory()->create([
        'email' => 'info@example.com',
        'password' => bcrypt('password'),
    ]);

    Sanctum::actingAs($user, ['*'], 'user');

    $response = $this->getJson('/api/user');

    $response->assertStatus(200)
             ->assertJsonFragment(['email' => 'info@example.com']);
});
