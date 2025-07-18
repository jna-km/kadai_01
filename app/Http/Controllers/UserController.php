<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;

class UserController extends Controller
{
    /**
     * ユーザー一覧を取得する
     */
    public function index()
    {
        return response()->json([
            'message' => 'ユーザー一覧を取得しました。',
            'data' => User::all()
        ], 200);
    }

    /**
     * 新しいユーザーを登録する
     */
    public function store(StoreUserRequest $request)
    {
        $user = User::create($request->all());
        return response()->json([
            'message' => 'ユーザーを登録しました。',
            'data' => $user
        ], 201);
    }

    /**
     * 指定したユーザーの詳細を取得する
     */
    public function show(string $id)
    {
        $user = User::findOrFail($id);
        return response()->json($user);
    }

    /**
     * 指定したユーザー情報を更新する
     */
    public function update(UpdateUserRequest $request, string $id)
    {
        $user = User::findOrFail($id);
        $user->update($request->all());
        return response()->json([
            'message' => 'ユーザー情報を更新しました。',
            'data' => $user
        ], 200);
    }

    /**
     * 指定したユーザーを削除する
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(null, 204);
    }
}
