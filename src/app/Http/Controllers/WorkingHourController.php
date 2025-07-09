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
        return WorkingHour::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreWorkingHourRequest $request)
    {
        $workingHour = WorkingHour::create($request->validated());
        return response()->json($workingHour, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $workingHour = WorkingHour::findOrFail($id);
        return response()->json($workingHour);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWorkingHourRequest $request, string $id)
    {
        $workingHour = WorkingHour::findOrFail($id);
        $workingHour->update($request->validated());
        return response()->json($workingHour);
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
