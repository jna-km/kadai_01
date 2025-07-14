<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;

// Route::post('/api/login', [AuthController::class, 'login']);

// Reactアプリを返すルート（ユーザーログイン画面）
Route::get('/login', function () {
    return view('app'); // resources/views/app.blade.php
});

// Reactアプリを返すルート（オペレーターログイン画面）
Route::get('/operator/login', function () {
    return view('app'); // 同上（フロント側で出し分け）
});

Route::get('/{any}', function () {
    return view('index');
})->where('any', '.*');

Route::view('/dashboard', 'dashboard.index')->name('dashboard.index');
Route::view('/users', 'users.index')->name('users.index');
Route::view('/services', 'services.index')->name('services.index');
Route::view('/timeslots', 'timeslots.index')->name('timeslots.index');
Route::view('/working-hours', 'working_hours.index')->name('working_hours.index');
Route::view('/notices', 'notices.index')->name('notices.index');
