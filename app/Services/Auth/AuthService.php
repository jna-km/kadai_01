<?php

namespace App\Services\Auth;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Exception;

class AuthService
{
    /**
     * ログアウト処理
     *
     * @param string|null $guard 使用するガード名
     * @return void
     */
    public function logout(?string $guard = null): void
    {
        try {
            Auth::guard($guard)->logout();
        } catch (Exception $e) {
            Log::error('Logout failed', ['error' => $e->getMessage()]);
        }
    }

    /**
     * ログイン中ユーザー情報取得（予約＋サービス情報込み）
     *
     * @return object|null ユーザー情報（関連データ込み）またはnull
     */
    public function getAuthenticatedUserWithRelations(): ?object
    {
        try {
            $user = Auth::user();
            if ($user) {
                $user->load(['reservations.service']);
            }
            return $user;
        } catch (Exception $e) {
            Log::error('Failed to load authenticated user relations', ['error' => $e->getMessage()]);
            return null;
        }
    }
}
