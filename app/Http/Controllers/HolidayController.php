<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHolidayRequest;
use App\Http\Requests\UpdateHolidayRequest;
use App\Models\Holiday;
use App\Services\HolidayService;
use Illuminate\Http\JsonResponse;

class HolidayController extends Controller
{
    protected HolidayService $holidayService;

    public function __construct(HolidayService $holidayService)
    {
        $this->holidayService = $holidayService;
    }

    /**
     * 祝日一覧を取得する
     */
    public function index()
    {
        $holidays = $this->holidayService->getAll();
        return response()->json(['data' => $holidays], 200);
    }

    /**
     * 新しい祝日を登録する
     */
    public function store(StoreHolidayRequest $request)
    {
        $holiday = $this->holidayService->create($request->validated());
        return response()->json(['data' => $holiday], 201);
    }

    /**
     * 指定した祝日の詳細を取得する
     */
    public function show(string $id)
    {
        $holiday = $this->holidayService->getById((int)$id);
        if (!$holiday) {
            return response()->json(['message' => '指定された祝日は見つかりません。'], 404);
        }
        return response()->json(['data' => $holiday], 200);
    }

    /**
     * 指定した祝日情報を更新する
     */
    public function update(UpdateHolidayRequest $request, string $id)
    {
        $holiday = $this->holidayService->update((int)$id, $request->validated());
        if (!$holiday) {
            return response()->json(['message' => '指定された祝日は見つかりません。'], 404);
        }
        return response()->json(['data' => $holiday], 200);
    }

    /**
     * 指定した祝日を削除する
     */
    public function destroy(string $id)
    {
        $deleted = $this->holidayService->delete((int)$id);
        if (!$deleted) {
            return response()->json(['message' => '指定された祝日は見つかりません。'], 404);
        }
        return response()->noContent();
    }
}
