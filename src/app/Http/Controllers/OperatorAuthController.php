<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Operator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
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

        $operator = Operator::where('email', $request->email)->first();

        if (! $operator || ! Hash::check($request->password, $operator->password)) {
            throw ValidationException::withMessages([
                'email' => ['ログイン情報が正しくありません。'],
            ]);
        }

        $token = $operator->createToken('operator-token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'operator' => $operator,
        ]);
    }

    /**
     * ログアウト処理。現在のアクセストークンを削除する。
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'ログアウトしました'
        ]);
    }

    /**
     * ログイン中のオペレーター情報を取得する。
     */
    public function me(Request $request): JsonResponse
    {
        return response()->json([
            'operator' => $request->user(),
        ]);
    }
}
