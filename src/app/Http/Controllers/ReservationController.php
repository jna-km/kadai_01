<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreReservationRequest;
use App\Http\Requests\UpdateReservationRequest;
use App\Models\Reservation;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        $reservations = Reservation::with(['user', 'operator'])->get();

        return response()->json([
            'message' => '予約一覧を取得しました。',
            'data' => $reservations
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreReservationRequest $request): JsonResponse
    {
        $reservation = Reservation::create($request->validated());

        return response()->json([
            'message' => '予約が作成されました。',
            'data' => $reservation
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $reservation = Reservation::with(['user', 'operator'])->findOrFail($id);

        return response()->json([
            'message' => '予約詳細を取得しました。',
            'data' => $reservation
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReservationRequest $request, Reservation $reservation): JsonResponse
    {
        $reservation->update($request->validated());

        return response()->json([
            'message' => '予約が更新されました。',
            'data' => $reservation
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id): JsonResponse
    {
        $reservation = Reservation::findOrFail($id);
        $reservation->delete();

        return response()->json([
            'message' => '予約を削除しました。'
        ]);
    }
}
