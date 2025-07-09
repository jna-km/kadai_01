<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Operator;

class OperatorController extends Controller
{
    /**
     * オペレーター一覧を取得する
     */
    public function index()
    {
        return response()->json(Operator::all());
    }

    /**
     * 新しいオペレーターを登録する
     */
    public function store(Request $request)
    {
        $operator = Operator::create($request->all());
        return response()->json($operator, 201);
    }

    /**
     * 指定したオペレーターの詳細を取得する
     */
    public function show(string $id)
    {
        $operator = Operator::findOrFail($id);
        return response()->json($operator);
    }

    /**
     * 指定したオペレーター情報を更新する
     */
    public function update(Request $request, string $id)
    {
        $operator = Operator::findOrFail($id);
        $operator->update($request->all());
        return response()->json($operator);
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
