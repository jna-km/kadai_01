<?php

use App\Models\Operator;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('オペレーター一覧を取得できる', function () {
    $operator = Operator::factory()->create();
    $this->actingAs($operator, 'operator');

    Operator::factory()->count(3)->create();

    $response = $this->getJson('/api/operators');

    $response->assertStatus(200)
             ->assertJsonCount(2);
});

test('新規オペレーターを登録できる', function () {
    $operator = Operator::factory()->create();
    $this->actingAs($operator, 'operator');

    $payload = [
        'name' => 'Test Operator',
        'email' => 'operator@example.com',
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ];

    $response = $this->postJson('/api/operators', $payload);

    $response->assertStatus(201);

    $this->assertDatabaseHas('operators', ['email' => 'operator@example.com']);
});

test('オペレーターの詳細を取得できる', function () {
    $operator = Operator::factory()->create();
    $this->actingAs($operator, 'operator');

    $response = $this->getJson("/api/operators/{$operator->id}");

    $response->assertStatus(200)
             ->assertJsonPath('data.id', $operator->id)
             ->assertJsonPath('data.name', $operator->name)
             ->assertJsonPath('data.email', $operator->email);
});

test('オペレーターを削除できる', function () {
    $operator = Operator::factory()->create();
    $this->actingAs($operator, 'operator');

    $response = $this->deleteJson("/api/operators/{$operator->id}");

    $response->assertStatus(204);

    $this->assertDatabaseMissing('operators', ['id' => $operator->id]);
});


test('未ログインではオペレーター一覧を取得できない', function () {
    $response = $this->getJson('/api/operators');

    $response->assertStatus(401);
});

test('未ログインではオペレーターを登録できない', function () {
    $payload = [
        'name' => 'Unauthorized Operator',
        'email' => 'unauth@example.com',
        'password' => 'password123',
        'password_confirmation' => 'password123',
    ];

    $response = $this->postJson('/api/operators', $payload);

    $response->assertStatus(401);
});

test('未ログインではオペレーターの詳細を取得できない', function () {
    $operator = Operator::factory()->create();

    $response = $this->getJson("/api/operators/{$operator->id}");

    $response->assertStatus(401);
});

test('未ログインではオペレーターを削除できない', function () {
    $operator = Operator::factory()->create();

    $response = $this->deleteJson("/api/operators/{$operator->id}");

    $response->assertStatus(401);
});
