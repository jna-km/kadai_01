<?php

use App\Models\Service;
use App\Models\Reservation;
use App\Models\User;
use App\Models\Operator;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function () {
    $this->user = User::factory()->create();
    $this->operator = Operator::factory()->create();
    $this->operator2 = Operator::factory()->create();
});

// test('サービス一覧を取得できる', function () {
//     actingAs($this->operator, 'operator');
//     Service::factory()->count(3)->create(['operator_id' => $this->operator->id]);

//     $response = $this->getJson('/api/services');

//     $response->assertStatus(200)
//              ->assertJsonStructure(['data']);
// });

test('サービスを作成できる', function () {
    $this->actingAs($this->operator, 'operator');
    $payload = [
        'name' => 'テストサービス',
        'description' => '説明文',
        'duration' => 30,
        'price' => 1000
    ];

    $response = $this->postJson('/api/services', $payload);

    $response->assertStatus(201)
             ->assertJsonFragment(['name' => 'テストサービス']);
    $this->assertDatabaseHas('services', ['name' => 'テストサービス']);
});

// test('サービスの詳細を取得できる', function () {
//     actingAs($this->operator, 'operator');
//     $service = Service::factory()->create(['operator_id' => $this->operator->id]);

//     $response = $this->getJson("/api/services/{$service->id}");

//     $response->assertStatus(200)
//              ->assertJsonFragment(['id' => $service->id]);
// });

test('サービスを更新できる', function () {
    $this->actingAs($this->operator, 'operator');
    $service = Service::factory()->create(['name' => '旧サービス', 'operator_id' => $this->operator->id]);

    $payload = [
        'name' => '新サービス',
        'description' => '更新説明',
        'duration' => 60,
        'price' => 2000
    ];

    $response = $this->putJson("/api/services/{$service->id}", $payload);

    $response->assertStatus(200)
             ->assertJsonFragment(['name' => '新サービス']);
    $this->assertDatabaseHas('services', ['id' => $service->id, 'name' => '新サービス']);
});

test('予約がない場合にサービスを削除できる', function () {
    $this->actingAs($this->operator, 'operator');
    $service = Service::factory()->create(['operator_id' => $this->operator->id]);

    $response = $this->deleteJson("/api/services/{$service->id}");

    $response->assertStatus(204);
    $this->assertDatabaseMissing('services', ['id' => $service->id]);
});

test('他のオペレーターはサービスを削除できない', function () {
    $this->actingAs($this->operator2, 'operator');
    $service = Service::factory()->create(['operator_id' => $this->operator->id]);
    Reservation::factory()->create(['service_id' => $service->id]);

    $response = $this->deleteJson("/api/services/{$service->id}");

    $response->assertStatus(403);
});

test('予約がある場合はサービスを削除できない', function () {
    $this->actingAs($this->operator, 'operator');
    // actingAs($this->operator, 'operator');
    $service = Service::factory()->create(['operator_id' => $this->operator->id]);
    Reservation::factory()->create(['service_id' => $service->id]);

    $response = $this->deleteJson("/api/services/{$service->id}");

    $response->assertStatus(409);
});
