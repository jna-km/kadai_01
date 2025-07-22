<?php

namespace App\Repositories\Eloquent;

use App\Models\Reservation;
use App\Repositories\Contracts\ReservationRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class ReservationRepository implements ReservationRepositoryInterface
{
    protected $model;

    public function __construct(Reservation $model)
    {
        $this->model = $model;
    }

    /**
     * 全ての予約を取得
     */
    public function all(): Collection
    {
        return $this->model->all();
    }

    /**
     * IDで予約を取得（存在しない場合は例外を投げる）
     */
    public function find(int $id): Reservation
    {
        return $this->model->findOrFail($id);
    }

    /**
     * 新しい予約を作成
     */
    public function create(array $data): Reservation
    {
        return $this->model->create($data);
    }

    /**
     * 予約を更新
     */
    public function update(int $id, array $data): Reservation
    {
        $reservation = $this->find($id);
        $reservation->update($data);
        return $reservation;
    }

    /**
     * 予約を削除
     */
    public function delete(int $id): bool
    {
        return $this->model->destroy($id) > 0;
    }

    /**
     * 指定ユーザーの予約を取得
     */
    public function getByUserId(int $userId): Collection
    {
        return $this->model->where('user_id', $userId)->get();
    }

    /**
     * 指定オペレーターの予約を取得
     */
    public function getByOperatorId(int $operatorId): Collection
    {
        return $this->model->where('operator_id', $operatorId)->get();
    }
}
