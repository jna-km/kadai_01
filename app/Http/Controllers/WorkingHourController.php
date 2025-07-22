<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWorkingHourRequest;
use App\Http\Requests\UpdateWorkingHourRequest;
use App\Services\WorkingHourService;

class WorkingHourController extends Controller
{
    protected WorkingHourService $workingHourService;

    public function __construct(WorkingHourService $workingHourService)
    {
        $this->workingHourService = $workingHourService;
    }

    /**
     * 勤務時間一覧を取得
     */
    public function index()
    {
        $workingHours = $this->workingHourService->getAll();
        return response()->json([
            'message' => '勤務時間一覧を取得しました。',
            'data' => $workingHours
        ], 200);
    }

    /**
     * 勤務時間を新規登録
     */
    public function store(StoreWorkingHourRequest $request)
    {
        $workingHour = $this->workingHourService->create($request->validated());
        return response()->json([
            'message' => '勤務時間を登録しました。',
            'data' => $workingHour
        ], 201);
    }

    /**
     * 勤務時間詳細を取得
     */
    public function show(string $id)
    {
        $workingHour = $this->workingHourService->getById((int)$id);
        return response()->json([
            'message' => '勤務時間詳細を取得しました。',
            'data' => $workingHour
        ], 200);
    }

    /**
     * 勤務時間情報を更新
     */
    public function update(UpdateWorkingHourRequest $request, string $id)
    {
        $workingHour = $this->workingHourService->update((int)$id, $request->validated());
        return response()->json([
            'message' => '勤務時間情報を更新しました。',
            'data' => $workingHour
        ], 200);
    }

    /**
     * 勤務時間を削除
     */
    public function destroy(string $id)
    {
        $deleted = $this->workingHourService->delete((int)$id);
        if (!$deleted) {
            return response()->json(['message' => '指定された勤務時間が存在しません。'], 404);
        }
        return response()->json(null, 204);
    }
}
