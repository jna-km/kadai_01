<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReservationController;

Route::apiResource('reservations', ReservationController::class)->only([
   'index', 'store', 'show' ,'update', 'destroy'
]);

Route::post('/ping', function () {
    return response()->json(['pong' => true]);
});