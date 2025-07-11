<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWorkingHourRequest;
use App\Http\Requests\UpdateWorkingHourRequest;
use App\Models\WorkingHour;

class WorkingHourController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'message' => '勤務時間一覧を取得しました。',
            'data' => WorkingHour::all()
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWorkingHourRequest $request)
    {
        $workingHour = WorkingHour::create($request->validated());
        return response()->json([
            'message' => '勤務時間を登録しました。',
            'data' => $workingHour
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $workingHour = WorkingHour::findOrFail($id);
        return response()->json([
            'message' => '勤務時間詳細を取得しました。',
            'data' => $workingHour
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWorkingHourRequest $request, string $id)
    {
        $workingHour = WorkingHour::findOrFail($id);
        $workingHour->update($request->validated());
        return response()->json([
            'message' => '勤務時間情報を更新しました。',
            'data' => $workingHour
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $workingHour = WorkingHour::findOrFail($id);
        $workingHour->delete();
        return response()->json(null, 204);
    }
}
