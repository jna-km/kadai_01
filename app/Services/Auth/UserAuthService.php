<?php

namespace App\Services\Auth;

use Illuminate\Support\Facades\Auth;

/**
 * ユーザー認証サービス
 * 
 * ユーザー用の認証処理を提供する。
 */
class UserAuthService extends AuthService
{
    /**
     * ユーザーログイン処理（セッション＋トークン発行）
     *
     * @param array $credentials 認証情報（email, password）
     * @param bool $remember ログイン状態を保持するか
     * @return array|null トークンとユーザー情報、またはnull（認証失敗時）
     */
    public function loginUser(array $credentials, bool $remember = false): ?array
    {
        if (Auth::attempt($credentials, $remember)) {
            $user = Auth::user();
            $token = $user->createToken('auth_token')->plainTextToken;

            return [
                'access_token' => $token,
                'token_type' => 'Bearer',
                'user' => $user,
            ];
        }

        return null;
    }

    /**
     * 認証済みユーザー情報取得
     *
     * @return object|null ユーザー情報（関連データ込み）またはnull
     */
    public function getAuthenticatedUserWithRelations(): ?object
    {
        return parent::getAuthenticatedUserWithRelations();
    }
}
