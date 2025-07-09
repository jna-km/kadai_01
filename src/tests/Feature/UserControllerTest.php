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
             ->assertJsonCount(4);
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
             ->assertJson(fn (AssertableJson $json) =>
                 $json->where('name', 'Test User')
                      ->where('email', 'test@example.com')
                      ->etc()
             );

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

    $response->assertStatus(200)
             ->assertJsonPath('name', 'Updated Name');

    $this->assertDatabaseHas('users', ['id' => $user->id, 'name' => 'Updated Name']);
});

test('ユーザーを削除できる', function () {
    $user = User::factory()->create();
    $this->actingAs($user, 'user');

    $response = $this->deleteJson("/api/users/{$user->id}");

    $response->assertStatus(204);

    $this->assertDatabaseMissing('users', ['id' => $user->id]);
});
