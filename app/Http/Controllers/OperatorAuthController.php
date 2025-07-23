<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use App\Http\Requests\Auth\LoginRequest;
use App\Services\Auth\OperatorAuthService;

class OperatorAuthController extends Controller
{
    public function __construct(
        protected OperatorAuthService $authService
    ) {}

    /**
     * オペレーターのログイン処理。成功時にアクセストークンを返す。
     *
     * @param LoginRequest $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $remember = $request->boolean('remember');

        $result = $this->authService->loginOperator($validated, $remember);

        if (!$result) {
            return response()->json([
                'status' => 'error',
                'message' => '認証情報が正しくありません。',
            ], 401);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'オペレーターとしてログインしました',
            'data' => $result,
        ]);
    }

    /**
     * オペレーターのログアウト処理。
     *
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        $this->authService->logoutOperator();

        return response()->json([
            'status' => 'success',
            'message' => 'ログアウトしました。',
        ], 200);
    }

    /**
     * 認証中のオペレーター情報を取得。
     *
     * @return JsonResponse
     */
    public function me(): JsonResponse
    {
        $operator = $this->authService->getAuthenticatedOperatorWithRelations();

        if (!$operator) {
            return response()->json([
                'status' => 'error',
                'message' => 'オペレーター情報を取得できません。',
            ], 401);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'ログイン中のオペレーター情報を取得しました。',
            'data' => $operator,
        ], 200);
    }
}
