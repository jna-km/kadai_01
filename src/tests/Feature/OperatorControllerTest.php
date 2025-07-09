<?php

use App\Models\Operator;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;

uses(RefreshDatabase::class);

test('オペレーター一覧を取得できる', function () {
    $operator = Operator::factory()->create();
    $this->actingAs($operator, 'operator');

    Operator::factory()->count(3)->create();

    $response = $this->getJson('/api/operators');

    $response->assertStatus(200)
             ->assertJsonCount(4);
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

    $response->assertStatus(201)
             ->assertJson(fn ($json) =>
                 $json->where('name', 'Test Operator')
                      ->where('email', 'operator@example.com')
                      ->etc()
             );

    $this->assertDatabaseHas('operators', ['email' => 'operator@example.com']);
});

test('オペレーターの詳細を取得できる', function () {
    $operator = Operator::factory()->create();

    $response = $this->getJson("/api/operators/{$operator->id}");

    Sanctum::actingAs($operator, guard: 'operator');

    $response = $this->getJson("/api/operators/{$operator->id}");

    $response->assertStatus(200)
             ->assertJson(fn ($json) =>
                 $json->where('id', $operator->id)
                      ->where('name', $operator->name)
                      ->where('email', $operator->email)
                      ->etc()
             );
});

test('オペレーターを削除できる', function () {
    $operator = Operator::factory()->create();

    Sanctum::actingAs($operator, guard: 'operator');

    $response = $this->deleteJson("/api/operators/{$operator->id}");

    $response->assertStatus(204);

    $this->assertDatabaseMissing('operators', ['id' => $operator->id]);
});
