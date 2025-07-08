<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReservationController;

Route::apiResource('reservations', ReservationController::class)->only([
    'store', 'update'
]);

Route::post('/ping', function () {
    return response()->json(['pong' => true]);
});