<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOperatorRequest;
use App\Http\Requests\UpdateOperatorRequest;
use App\Models\Operator;

class OperatorController extends Controller
{
    /**
     * オペレーター一覧を取得する
     */
    public function index()
    {
        return response()->json([
            'message' => 'オペレーター一覧を取得しました。',
            'data' => Operator::all()
        ], 200);
    }

    /**
     * 新しいオペレーターを登録する
     */
    public function store(StoreOperatorRequest $request)
    {
        $operator = Operator::create($request->all());
        return response()->json([
            'message' => 'オペレーターを登録しました。',
            'data' => $operator
        ], 201);
    }

    /**
     * 指定したオペレーターの詳細を取得する
     */
    public function show(string $id)
    {
        $operator = Operator::findOrFail($id);
        return response()->json([
            'message' => 'オペレーター詳細を取得しました。',
            'data' => $operator
        ], 200);
    }

    /**
     * 指定したオペレーター情報を更新する
     */
    public function update(UpdateOperatorRequest $request, string $id)
    {
        $operator = Operator::findOrFail($id);
        $operator->update($request->all());
        return response()->json([
            'message' => 'オペレーター情報を更新しました。',
            'data' => $operator
        ], 200);
    }

    /**
     * 指定したオペレーターを削除する
     */
    public function destroy(string $id)
    {
        $operator = Operator::findOrFail($id);
        $operator->delete();
        return response()->json(null, 204);
    }
}
