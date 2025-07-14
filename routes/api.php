<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Operator;
use App\Http\Controllers\CheckLoginController;
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

Route::middleware('auth:sanctum')->get('/usera', function (Request $request) {
    return response()->json([
        'user' => 'aaa',
        'role' => 'aa',
    ]);
});

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
    Route::apiResource('services', ServiceController::class);
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
    Route::apiResource('operators', OperatorController::class)->only([
        'index', 'store', 'show', 'update', 'destroy'
    ]);
});


// ========================
// ログイン状態確認ルート
// ========================
// 現在のログイン状態を確認するためのルート
// Route::get('/check-login', function (Request $request) {
//     $user = $request->user('user') ?? $request->user('operator');

//     return response()->json([
//         'user' => $user,
//         'role' => $request->user('user') ? 'user' : ($request->user('operator') ? 'operator' : null),
//     ]);
// });

// Route::get('/check-login', function () {
//     if (auth()->check()) {
//         $user = auth()->user();

//         return response()->json([
//             'status' => 'success',
//             'user' => $user,
//             'role' => $user->role,
//         ]);
//     }

//     return response()->json([
//         'status' => 'guest',
//         'user' => null,
//         'role' => null,
//     ]);
// });

// Reactからセッションでログインチェックする用
// Route::middleware('auth:sanctum')->get('/check-login', [CheckLoginController::class, 'check']);
Route::get('/check-login', [CheckLoginController::class, 'check']);
// Route::middleware('web')->get('/check-login', [CheckLoginController::class, 'check']);
// Swagger等トークン認証でログインチェック（必要なら別エンドポイントに）
Route::middleware('auth:api')->get('/token-check', [CheckLoginController::class, 'check']);

// ========================
// 共通ルート
// ========================

Route::middleware(['auth:user,operator'])->group(function () {
    Route::apiResource('reservations', ReservationController::class)->only([
        'index', 'store', 'show', 'update', 'destroy'
    ]);
});

Route::post('/ping', function () {
    return response()->json(['pong' => true]);
});
