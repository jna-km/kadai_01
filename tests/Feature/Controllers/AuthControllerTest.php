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
                $json->has('data.access_token')
                     ->has('data.user')
                     ->where('data.user.email', 'login@example.com')
                     ->etc()
             );
});

test('「ログイン状態を保持する」でログインできる', function () {
    $user = User::factory()->create([
        'email' => 'remember@example.com',
        'password' => bcrypt('password'),
    ]);

    $response = $this->withHeaders([
        'Referer' => config('app.url'),
    ])->postJson('/api/login', [
        'email' => 'remember@example.com',
        'password' => 'password',
        'remember' => true,
    ]);

    $response->assertStatus(200);

    $cookieName = collect($response->headers->getCookies())->first(function ($cookie) {
        return str_starts_with($cookie->getName(), 'remember_web_');
    })?->getName();

    $this->assertNotNull($cookieName, 'Remember cookie not found on the response.');
    $response->assertCookieNotExpired($cookieName);
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
             ->assertJson([
                 'status' => 'error',
                 'message' => '認証情報が正しくありません。',
             ]);
});

test('ログアウトできる', function () {
    $user = User::factory()->create([
        'email' => 'logout@example.com',
        'password' => bcrypt('password'),
    ]);

    Sanctum::actingAs($user, ['*'], 'user');

    $response = $this->postJson('/api/logout');

    $response->assertStatus(200);
});

test('認証済みユーザー情報を取得できる', function () {
    $user = User::factory()->create([
        'email' => 'info@example.com',
        'password' => bcrypt('password'),
    ]);

    Sanctum::actingAs($user, ['*'], 'user');

    $response = $this->getJson('/api/me');

    $response->assertStatus(200)
             ->assertJsonFragment(['email' => 'info@example.com']);
});


test('未認証でmeにアクセスすると401を返す', function () {
    $response = $this->getJson('/api/me');
    $response->assertStatus(401);
});

test('未認証でlogoutにアクセスすると401を返す', function () {
    $response = $this->postJson('/api/logout');
    $response->assertStatus(401);
});

test('ログインでバリデーションエラー（email必須）', function () {
    $response = $this->postJson('/api/login', [
        'password' => 'password123'
    ]);

    $response->assertStatus(422)
             ->assertJsonValidationErrors(['email']);
});

test('ログインでバリデーションエラー（password必須）', function () {
    $response = $this->postJson('/api/login', [
        'email' => 'test@example.com'
    ]);

    $response->assertStatus(422)
             ->assertJsonValidationErrors(['password']);
});

test('ログインでバリデーションエラー（passwordが短すぎる）', function () {
    $response = $this->postJson('/api/login', [
        'email' => 'test@example.com',
        'password' => 'short'
    ]);

    $response->assertStatus(422)
             ->assertJsonValidationErrors(['password']);
});
