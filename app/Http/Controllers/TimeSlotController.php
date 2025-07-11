<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTimeSlotRequest;
use App\Http\Requests\UpdateTimeSlotRequest;
use App\Models\TimeSlot;

class TimeSlotController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json([
            'message' => '時間枠一覧を取得しました。',
            'data' => TimeSlot::all()
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTimeSlotRequest $request)
    {
        $timeslot = TimeSlot::create($request->validated());
        return response()->json([
            'message' => '時間枠を登録しました。',
            'data' => $timeslot
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(TimeSlot $timeSlot)
    {
        return response()->json([
            'message' => '時間枠詳細を取得しました。',
            'data' => $timeSlot
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTimeSlotRequest $request, string $id)
    {
        $timeslot = TimeSlot::findOrFail($id);
        $timeslot->update($request->validated());
        return response()->json([
            'message' => '時間枠情報を更新しました。',
            'data' => $timeslot
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(TimeSlot $timeSlot)
    {
        $timeSlot->delete();
        return response()->json(null, 204);
    }
}
