<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\JsonResponse;

class OperatorAuthController extends Controller
{
    /**
     * オペレーターのログイン処理。成功時にアクセストークンを返す。
     */
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        $remember = $request->boolean('remember');
        // 'operator' ガードを指定して認証を試みる
        if (! Auth::guard('operator')->attempt($request->only('email', 'password'), $remember)) {
            throw ValidationException::withMessages([
                'email' => ['認証情報が正しくありません。'],
            ]);
        }

        /** @var \App\Models\Operator $operator */
        $operator = Auth::guard('operator')->user();
        $token = $operator->createToken('operator-token')->plainTextToken;

        // AuthControllerとレスポンス形式を合わせる
        return response()->json([
            'status' => 'success',
            'message' => 'オペレーターとしてログインしました',
            'data' => [
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $operator, // フロントエンドのために 'user' キーで返す
            ]
        ]);
    }

    /**
     * ログアウト処理。現在のアクセストークンを削除する。
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'ログアウトしました。'
        ], 200);
    }

    /**
     * ログイン中のオペレーター情報を取得する。
     */
    public function me(Request $request): JsonResponse
    {
        /** @var \App\Models\Operator $operator */
        $operator = $request->user(); // Sanctum認証済みオペレーター

        // 予約（ユーザー・サービス情報付き）＋提供サービス一覧をロード
        $operator->load(['reservations.user', 'reservations.service', 'services']);

        return response()->json([
            'message' => 'ログイン中のオペレーター情報を取得しました。',
            'data' => $operator,
        ], 200);
    }
}
