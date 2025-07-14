<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;
use App\Models\User;
use App\Models\Operator;

class CheckLoginController extends Controller
{
    /**
     * ログイン状態を確認し、ユーザー情報を返す
     *
     * @return JsonResponse
     */
    public function check(Request $request): JsonResponse
    {
        // Auth::guard('web')->user()
        // dd(Auth::guard('web'),Auth::user());
        if (Auth::guard('web')->check()) {
            return response()->json([
                'role' => 'user',
                'user' => Auth::guard('web')->user(),
            ]);
        }

        if (Auth::guard('operator')->check()) {
            return response()->json([
                'role' => 'operator',
                'user' => Auth::guard('operator')->user(),
            ]);
        }

        return response()->json([
            'role' => '',
            'user' => null,
        ]);
    }
}
