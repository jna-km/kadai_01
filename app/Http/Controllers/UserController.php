<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    protected UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    /**
     * ユーザー一覧を取得する
     */
    public function index(): JsonResponse
    {
        $users = $this->userService->getAll();
        return response()->json(['message' => 'ユーザー一覧を取得しました。', 'data' => $users], 200);
    }

    /**
     * 新しいユーザーを登録する
     */
    public function store(StoreUserRequest $request): JsonResponse
    {
        $user = $this->userService->create($request->validated());
        return response()->json([
            'message' => 'ユーザーを登録しました。',
            'data' => $user
        ],201);
    }

    /**
     * 指定したユーザーの詳細を取得する
     */
    public function show(int $id): JsonResponse
    {
        $user = $this->userService->getById($id);

        if (!$user) {
            return response()->json(['message' => 'Not Found'], 404);
        }

        return response()->json(['data' => $user], 200);
    }

    /**
     * 指定したユーザー情報を更新する
     */
    public function update(UpdateUserRequest $request, int $id): JsonResponse
    {
        $user = $this->userService->update($id, $request->validated());
        if (!$user) {
            return response()->json(['message' => 'Not Found'], 404);
        }
        return response()->json(['message' => 'ユーザー情報を更新しました。', 'data' => $user], 200);
    }

    /**
     * 指定したユーザーを削除する
     */
    public function destroy(int $id): JsonResponse
    {
        $user = $this->userService->getById($id);

        if (!$user) {
            return response()->json(['message' => 'Not Found'], 404);
        }

        $this->userService->delete($id);
        return response()->json(null, 204);
    }
}
