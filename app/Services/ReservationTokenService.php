<?php

namespace App\Services;

use App\Repositories\Contracts\ReservationTokenRepositoryInterface;

class ReservationTokenService
{
    protected ReservationTokenRepositoryInterface $reservationTokenRepository;

    public function __construct(ReservationTokenRepositoryInterface $reservationTokenRepository)
    {
        $this->reservationTokenRepository = $reservationTokenRepository;
    }

    /**
     * 予約トークン一覧取得
     */
    public function getAll()
    {
        return $this->reservationTokenRepository->all();
    }

    /**
     * 指定IDの予約トークン取得
     */
    public function getById(int $id)
    {
        return $this->reservationTokenRepository->find($id);
    }

    /**
     * 新規予約トークンを作成
     */
    public function create(array $data)
    {
        // TODO: トークンの一意性確認や有効期限ロジックを追加
        return $this->reservationTokenRepository->create($data);
    }

    /**
     * 予約トークンを更新
     */
    public function update(int $id, array $data)
    {
        return $this->reservationTokenRepository->update($id, $data);
    }

    /**
     * 予約トークンを削除
     */
    public function delete(int $id)
    {
        return $this->reservationTokenRepository->delete($id);
    }
}
