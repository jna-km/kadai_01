<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;

class AuthController extends Controller
{
    /**
     * ユーザー認証を行い、アクセストークンを発行する
     */
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');
        $remember = $request->boolean('remember');

        if (Auth::attempt($credentials, $remember)) {
            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;
            // $request->session()->regenerate();

            return response()->json([
                'status' => 'success',
                'message' => 'ログインしました',
                'data' => [
                    'access_token' => $token,
                    'token_type' => 'Bearer',
                    'user' => $user,
                ]
            ]);
        }

        throw ValidationException::withMessages([
            'email' => ['認証情報が正しくありません。'],
        ]);
    }
    /**
     * 現在のアクセストークンを無効化し、ログアウト処理を行う
     */
    public function logout(Request $request)
    {
        try {
            $request->user()->currentAccessToken()->delete();

            return response()->json([
                'status' => 'success',
                'message' => 'ログアウトしました',
            ]);
        } catch (\Throwable $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'ログアウト処理に失敗しました',
            ], 500);
        }
    }

    /**
     * ログイン中のユーザー情報を返す
     */
    public function me(Request $request)
    {
        return response()->json([
            'status' => 'success',
            'message' => 'ログインユーザー情報を取得しました。',
            'data' => $request->user(),
        ]);
    }
}
