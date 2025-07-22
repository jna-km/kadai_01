<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTimeSlotRequest;
use App\Http\Requests\UpdateTimeSlotRequest;
use App\Services\TimeSlotService;
use Illuminate\Http\JsonResponse;

class TimeSlotController extends Controller
{
    protected TimeSlotService $timeSlotService;

    public function __construct(TimeSlotService $timeSlotService)
    {
        $this->timeSlotService = $timeSlotService;
    }

    /**
     * 時間枠一覧を取得
     */
    public function index(): JsonResponse
    {
        $timeSlots = $this->timeSlotService->getAll();
        return response()->json([
            'message' => '時間枠一覧を取得しました。',
            'data' => $timeSlots
        ], 200);
    }

    /**
     * 新しい時間枠を登録
     */
    public function store(StoreTimeSlotRequest $request): JsonResponse
    {
        $timeSlot = $this->timeSlotService->create($request->validated());
        return response()->json([
            'message' => '時間枠を登録しました。',
            'data' => $timeSlot
        ], 201);
    }

    /**
     * 指定した時間枠を取得
     */
    public function show(int $id): JsonResponse
    {
        $timeSlot = $this->timeSlotService->getById($id);
        return response()->json([
            'message' => '時間枠詳細を取得しました。',
            'data' => $timeSlot
        ], 200);
    }

    /**
     * 指定した時間枠を更新
     */
    public function update(UpdateTimeSlotRequest $request, int $id): JsonResponse
    {
        $updated = $this->timeSlotService->update($id, $request->validated());
        return response()->json([
            'message' => '時間枠情報を更新しました。',
            'data' => $updated
        ], 200);
    }

    /**
     * 指定した時間枠を削除
     */
    public function destroy(int $id): JsonResponse
    {
        $this->timeSlotService->delete($id);
        return response()->json(null, 204);
    }
}
