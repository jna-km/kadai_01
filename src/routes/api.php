<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\OperatorController;
use App\Http\Controllers\NoticeController;
use App\Http\Controllers\HolidayController;

Route::apiResource('reservations', ReservationController::class)->only([
   'index', 'store', 'show' ,'update', 'destroy'
]);

// 認証系
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
Route::get('/me', [AuthController::class, 'me'])->middleware('auth:sanctum');

// 管理系API
Route::apiResource('users', UserController::class)->middleware('auth:sanctum');
Route::apiResource('services', ServiceController::class)->middleware('auth:sanctum');
Route::apiResource('operators', OperatorController::class)->middleware('auth:sanctum');
Route::apiResource('notices', NoticeController::class)->middleware('auth:sanctum');
Route::apiResource('holidays', HolidayController::class)->middleware('auth:sanctum');

Route::post('/ping', function () {
    return response()->json(['pong' => true]);
});
