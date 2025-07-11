<?php

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Testing\Fluent\AssertableJson;

uses(RefreshDatabase::class);

test('ユーザー一覧を取得できる', function () {
    $user = User::factory()->create();
    $this->actingAs($user, 'user');

    User::factory()->count(3)->create();

    $response = $this->getJson('/api/users');

    $response->assertStatus(200)
             ->assertJsonCount(2);
});

test('新規ユーザーを登録できる', function () {
    $user = User::factory()->create();
    $this->actingAs($user, 'user');

    $payload = [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ];

    $response = $this->postJson('/api/users', $payload);

    $response->assertStatus(201)
             ->assertJsonPath('data.name', 'Test User')
             ->assertJsonPath('data.email', 'test@example.com');

    $this->assertDatabaseHas('users', ['email' => 'test@example.com']);
});

test('ユーザーの詳細を取得できる', function () {
    $user = User::factory()->create();
    $this->actingAs($user, 'user');
    $response = $this->getJson("/api/users/{$user->id}");

    $response->assertStatus(200)
             ->assertJson(fn (AssertableJson $json) =>
                 $json->where('id', $user->id)
                      ->where('name', $user->name)
                      ->etc()
             );
});

test('ユーザー情報を更新できる', function () {
    $user = User::factory()->create();
    $this->actingAs($user, 'user');
    $payload = ['name' => 'Updated Name', 'email' => 'updated@example.com'];

    $response = $this->putJson("/api/users/{$user->id}", $payload);

    $response->assertStatus(200);

    $updatedUser = $user->fresh();

    $this->assertSame($payload['name'], $updatedUser->name);
    $this->assertSame($payload['email'], $updatedUser->email);
});

test('ユーザーを削除できる', function () {
    $user = User::factory()->create();
    $this->actingAs($user, 'user');

    $response = $this->deleteJson("/api/users/{$user->id}");

    $response->assertStatus(204);

    $this->assertDatabaseMissing('users', ['id' => $user->id]);
});

test('存在しないユーザーIDを参照しようとすると404が返る', function () {
    $user = User::factory()->create();
    $this->actingAs($user, 'user');

    $response = $this->getJson('/api/users/999999');
    $response->assertStatus(404);
});

test('存在しないユーザーIDを更新しようとすると404が返る', function () {
    $user = User::factory()->create();
    $this->actingAs($user, 'user');

    $payload = ['name' => 'Nope', 'email' => 'nope@example.com'];
    $response = $this->putJson('/api/users/999999', $payload);
    $response->assertStatus(404);
});

test('存在しないユーザーIDを削除しようとすると404が返る', function () {
    $user = User::factory()->create();
    $this->actingAs($user, 'user');

    $response = $this->deleteJson('/api/users/999999');
    $response->assertStatus(404);
});


test('ログインしていない状態でユーザー一覧取得は401が返る', function () {
    $response = $this->getJson('/api/users');
    $response->assertStatus(401);
});

test('ログインしていない状態でユーザー登録は401が返る', function () {
    $payload = [
        'name' => 'Guest User',
        'email' => 'guest@example.com',
        'password' => 'guest1234',
        'password_confirmation' => 'guest1234',
    ];
    $response = $this->postJson('/api/users', $payload);
    $response->assertStatus(401);
});

test('ログインしていない状態でユーザー更新は401が返る', function () {
    $user = User::factory()->create();
    $payload = ['name' => 'Hacker', 'email' => 'hacker@example.com'];
    $response = $this->putJson("/api/users/{$user->id}", $payload);
    $response->assertStatus(401);
});

test('ログインしていない状態でユーザー削除は401が返る', function () {
    $user = User::factory()->create();
    $response = $this->deleteJson("/api/users/{$user->id}");
    $response->assertStatus(401);
});
