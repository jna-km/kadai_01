<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
class CheckLoginController extends Controller
{


public function check(): JsonResponse
{
    Log::info('セッションID: ' . session()->getId());
    Log::info('ユーザー: ', ['user' => Auth::user()]);

    dd(Auth::check(),session());
    if (Auth::check()) {
        return response()->json([
            'status' => 'authenticated',
            'user' => Auth::user(),
            'role' => Auth::user()->role ?? null,
        ]);
    }

    return response()->json([
        'status' => 'guest',
        'user' => null,
        'role' => null,
    ]);
}
}
