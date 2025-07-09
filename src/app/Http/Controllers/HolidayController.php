<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHolidayRequest;
use App\Http\Requests\UpdateHolidayRequest;
use App\Models\Holiday;

class HolidayController extends Controller
{
    /**
     * 祝日一覧を取得する
     */
    public function index()
    {
        return response()->json(Holiday::all());
    }

    /**
     * 新しい祝日を登録する
     */
    public function store(StoreHolidayRequest $request)
    {
        $holiday = Holiday::create($request->validated());
        return response()->json($holiday, 201);
    }

    /**
     * 指定した祝日の詳細を取得する
     */
    public function show(string $id)
    {
        $holiday = Holiday::findOrFail($id);
        return response()->json($holiday);
    }

    /**
     * 指定した祝日情報を更新する
     */
    public function update(UpdateHolidayRequest $request, string $id)
    {
        $holiday = Holiday::findOrFail($id);
        $holiday->update($request->validated());
        return response()->json($holiday);
    }

    /**
     * 指定した祝日を削除する
     */
    public function destroy(string $id)
    {
        $holiday = Holiday::findOrFail($id);
        $holiday->delete();
        return response()->json(null, 204);
    }
}
