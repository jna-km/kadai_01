<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\OperatorAuthController;
use App\Http\Controllers\OperatorController;
use App\Http\Controllers\NoticeController;
use App\Http\Controllers\HolidayController;
use App\Http\Controllers\TimeSlotController;
use App\Http\Controllers\WorkingHourController;

// ========================
// ユーザー認証ルート
// ========================

// ログイン（ユーザー）
Route::post('/login', [AuthController::class, 'login']);
// Route::middleware('web')->post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->get('/reservations', [ReservationController::class, 'index']);
Route::middleware('auth:sanctum,user')->get('/my-reservations', [ReservationController::class, 'myReservations']);

Route::middleware('auth:user')->group(function () {
    // ログアウト／自分情報
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // ユーザー用 APIリソース
    Route::apiResource('users', UserController::class);
    // Route::apiResource('services', ServiceController::class);
    Route::apiResource('notices', NoticeController::class);
    Route::apiResource('holidays', HolidayController::class);
    Route::apiResource('time-slots', TimeSlotController::class);
    Route::apiResource('working-hours', WorkingHourController::class);
});

// ========================
// オペレーター認証ルート
// ========================

// ログイン（オペレーター）
Route::post('/operator/login', [OperatorAuthController::class, 'login']);

Route::middleware('auth:operator')->group(function () {
    // ログアウト／自分情報
    Route::post('/operator/logout', [OperatorAuthController::class, 'logout']);
    Route::get('/operator/me', [OperatorAuthController::class, 'me']);

    // オペレーター用 APIリソース
    Route::apiResource('operators', OperatorController::class);
    Route::post('/services', [ServiceController::class, 'store']);
    Route::delete('/services/{service}', [ServiceController::class, 'destroy']);
    Route::put('/services/{id}', [ServiceController::class, 'update']);
    Route::get('/operator/reservations', [ReservationController::class, 'operatorReservations']);
    // Route::apiResource('services', ServiceController::class);
});

// ========================
// 共通ルート
// ========================

Route::middleware(['auth:user,operator'])->group(function () {
    Route::get('/operators', [OperatorController::class, 'index'])->name('operators.index');
    Route::apiResource('reservations', ReservationController::class)->only([
        'index', 'store', 'show', 'update', 'destroy'
    ]);
});

Route::post('/ping', function () {
    return response()->json(['pong' => true]);
});

Route::get('/public/operators/{id}', [OperatorController::class, 'showPublic']);
Route::get('/public/operators/', [OperatorController::class, 'publicIndex']);
