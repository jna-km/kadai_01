<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\AuthController;

// Route::post('/api/login', [AuthController::class, 'login']);

// Reactアプリを返すルート（ユーザーログイン画面）
// Route::get('/login', function () {
//     return view('app');
// });

// // Reactアプリを返すルート（オペレーターログイン画面）
// Route::get('/operator/login', function () {
//     return view('app');
// });

Route::get('/{any}', function () {
    return view('app');
})->where('any', '^(?!api).*');

// Route::view('/dashboard', 'dashboard.index')->name('dashboard.index');
// Route::view('/users', 'users.index')->name('users.index');
// Route::view('/services', 'services.index')->name('services.index');
// Route::view('/timeslots', 'timeslots.index')->name('timeslots.index');
// Route::view('/working-hours', 'working_hours.index')->name('working_hours.index');
// Route::view('/notices', 'notices.index')->name('notices.index');
// Route::middleware('web')->get('/ping', function () {
//     return 'pong';
// });
