<?php

use Illuminate\Support\Facades\Route;
// use App\Http\Controllers\ReservationController;

// Route::get('/reservations', [ReservationController::class, 'index']);
// Route::post('/reservations', [ReservationController::class, 'store']);
// Route::put('/reservations/{id}', [ReservationController::class, 'update']);
// Route::delete('/reservations/{id}', [ReservationController::class, 'destroy']);

Route::get('/', function () {
    return view('welcome');
});

Route::view('/dashboard', 'dashboard.index')->name('dashboard.index');
Route::view('/users', 'users.index')->name('users.index');
Route::view('/services', 'services.index')->name('services.index');
Route::view('/timeslots', 'timeslots.index')->name('timeslots.index');
Route::view('/working-hours', 'working_hours.index')->name('working_hours.index');
Route::view('/notices', 'notices.index')->name('notices.index');
