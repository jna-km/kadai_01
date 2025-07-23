<?php

namespace App\Http\Controllers;

use App\Services\Auth\UserAuthService;
use Illuminate\Http\JsonResponse;
use App\Http\Requests\Auth\LoginRequest;

class AuthController extends Controller
{
    protected UserAuthService $userAuthService;
    public function __construct(UserAuthService $userAuthService)
    {
        $this->userAuthService = $userAuthService;
    }

    /**
     * ユーザー認証を行い、アクセストークンを発行する
     *
     * @param LoginRequest $request
     * @return JsonResponse
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $validated = $request->validated();
        $remember = $request->boolean('remember');

        $result = $this->userAuthService->loginUser($validated, $remember);

        if (!$result) {
            return response()->json([
                'status' => 'error',
                'message' => '認証情報が正しくありません。',
            ], 401);
        }

        return response()->json([
            'status' => 'success',
            'message' => 'ログインしました',
            'data' => $result,
        ]);
    }

    /**
     * 現在のアクセストークンを無効化し、ログアウト処理を行う
     *
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        $this->userAuthService->logout();
        return response()->json([
            'status' => 'success',
            'message' => 'ログアウトしました',
        ]);
    }

    /**
     * ログイン中のユーザー情報を返す
     *
     * @return JsonResponse
     */
    public function me(): JsonResponse
    {
        $user = $this->userAuthService->getAuthenticatedUserWithRelations();
        return response()->json([
            'status' => 'success',
            'message' => 'ログインユーザー情報を取得しました。',
            'data' => $user,
        ]);
    }
}
