<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreReservationRequest;
use App\Http\Requests\UpdateReservationRequest;
use Illuminate\Http\JsonResponse;
use App\Services\ReservationService;

/**
 * ReservationController
 *
 * 予約のCRUD操作およびユーザー・オペレーター別の予約取得を管理するコントローラ。
 */
class ReservationController extends Controller
{
    /**
     * @var ReservationService
     * 予約サービスクラス
     */
    protected $reservationService;

    /**
     * コンストラクタ：サービスクラスを注入
     *
     * @param ReservationService $reservationService
     */
    public function __construct(ReservationService $reservationService)
    {
        $this->reservationService = $reservationService;
    }

    /**
     * 予約一覧を取得
     */
    public function index(): JsonResponse
    {
        return response()->json([
            'message' => '予約一覧を取得しました。',
            'data' => $this->reservationService->getAllReservations()
        ]);
    }

    /**
     * 新規予約を作成
     */
    public function store(StoreReservationRequest $request): JsonResponse
    {
        $reservation = $this->reservationService->createReservation($request->validated());

        return response()->json([
            'message' => '予約が作成されました。',
            'data' => $reservation
        ], 201);
    }

    /**
     * 指定IDの予約詳細を取得
     */
    public function show(string $id): JsonResponse
    {
        $reservation = $this->reservationService->getReservation((int)$id);

        return response()->json([
            'message' => '予約詳細を取得しました。',
            'data' => $reservation
        ]);
    }

    /**
     * 予約を更新
     */
    public function update(UpdateReservationRequest $request, string $id): JsonResponse
    {
        $reservation = $this->reservationService->updateReservation((int)$id, $request->validated());

        return response()->json([
            'message' => '予約が更新されました。',
            'data' => $reservation
        ]);
    }

    /**
     * 予約を削除
     */
    public function destroy(string $id): JsonResponse
    {
        $this->reservationService->deleteReservation((int)$id);

        return response()->json([
            'message' => '予約を削除しました。'
        ]);
    }

    /**
     * ログインユーザーの予約一覧を取得
     */
    public function myReservations(Request $request): JsonResponse
    {
        $user = $request->user();
        if (!$user) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $reservations = $this->reservationService->getMyReservations($user->id);

        return response()->json([
            'message' => '予約一覧を取得しました。',
            'data' => $reservations
        ], 200);
    }

    /**
     * オペレーター用：予約一覧を取得
     */
    public function operatorReservations(Request $request): JsonResponse
    {
        $operator = $request->user();
        if (!$operator) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

        $reservations = $this->reservationService->getOperatorReservations($operator->id);

        return response()->json([
            'message' => 'オペレーターの予約一覧を取得しました。',
            'data' => $reservations
        ], 200);
    }
}
