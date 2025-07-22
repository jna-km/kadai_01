<?php

namespace App\Services;

use App\Repositories\Contracts\ReservationRepositoryInterface;

/**
 * ReservationService
 *
 * 予約関連のビジネスロジックを管理するサービスクラス。
 * Controllerから呼び出され、Repositoryを介してデータアクセスを行う。
 */
class ReservationService
{
    /**
     * @var ReservationRepositoryInterface
     * 予約リポジトリインターフェース
     */
    protected $reservationRepository;

    /**
     * コンストラクタ
     *
     * @param ReservationRepositoryInterface $reservationRepository
     */
    public function __construct(ReservationRepositoryInterface $reservationRepository)
    {
        $this->reservationRepository = $reservationRepository;
    }

    /**
     * 全ての予約を取得
     *
     * @return mixed
     */
    public function getAllReservations()
    {
        return $this->reservationRepository->getAll();
    }

    /**
     * 指定IDの予約を取得
     *
     * @param int $id
     * @return mixed
     */
    public function getReservation(int $id)
    {
        return $this->reservationRepository->findById($id);
    }

    /**
     * 新しい予約を作成
     *
     * @param array $data
     * @return mixed
     */
    public function createReservation(array $data)
    {
        return $this->reservationRepository->create($data);
    }

    /**
     * 予約を更新
     *
     * @param int $id
     * @param array $data
     * @return mixed
     */
    public function updateReservation(int $id, array $data)
    {
        return $this->reservationRepository->update($id, $data);
    }

    /**
     * 予約を削除
     *
     * @param int $id
     * @return bool
     */
    public function deleteReservation(int $id)
    {
        return $this->reservationRepository->delete($id);
    }

    /**
     * ユーザーIDで予約を取得
     *
     * @param int $userId
     * @return mixed
     */
    public function getMyReservations(int $userId)
    {
        return $this->reservationRepository->getByUserId($userId);
    }

    /**
     * オペレーターIDで予約を取得
     *
     * @param int $operatorId
     * @return mixed
     */
    public function getOperatorReservations(int $operatorId)
    {
        return $this->reservationRepository->getByOperatorId($operatorId);
    }
}
