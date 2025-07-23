<?php

namespace App\Services\Auth;

use App\Models\Operator;
use Exception;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

/**
 * オペレーター認証サービス
 *
 * オペレーター用の認証処理を提供する。
 */
class OperatorAuthService extends AuthService
{
    /**
     * オペレーターのログイン処理（セッション＋トークン発行）
     *
     * @param array $credentials 認証情報（email, password）
     * @param bool $remember ログイン状態を保持するか
     * @return array|null トークンとオペレーター情報、またはnull（認証失敗時）
     */
    public function loginOperator(array $credentials, bool $remember = false): ?array
    {
        if (! Auth::guard('operator')->attempt($credentials, $remember)) {
            return null;
        }

        /** @var Operator $operator */
        $operator = Auth::guard('operator')->user();
        $token = $operator->createToken('operator-token')->plainTextToken;

        return [
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => $operator, // フロントエンドでの一貫性のため 'user' キーで返す
        ];
    }

    /**
     * オペレーターのログアウト処理
     *
     * @return void
     */
    public function logoutOperator(): void
    {
        try {
            parent::logout('operator');
        } catch (Exception $e) {
            Log::error('Operator logout failed', ['error' => $e->getMessage()]);
        }
    }

    /**
     * 認証済みオペレーター情報取得
     *
     * @return object|null オペレーター情報（関連データ込み）またはnull
     */
    public function getAuthenticatedOperatorWithRelations(): ?object
    {
        try {
            $operator = auth('operator')->user();
            if ($operator) {
                $operator->load(['reservations.user', 'reservations.service', 'services']);
            }
            return $operator;
        } catch (Exception $e) {
            Log::error('Failed to load authenticated operator relations', ['error' => $e->getMessage()]);
            return null;
        }
    }
}
