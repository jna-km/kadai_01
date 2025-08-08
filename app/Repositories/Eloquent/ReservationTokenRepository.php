<?php

namespace App\Repositories\Eloquent;

use App\Models\ReservationToken;
use App\Repositories\Contracts\ReservationTokenRepositoryInterface;
use Illuminate\Support\Collection;

class ReservationTokenRepository implements ReservationTokenRepositoryInterface
{
    protected ReservationToken $model;

    public function __construct(ReservationToken $model)
    {
        $this->model = $model;
    }

    public function all(): Collection
    {
        return $this->model->all();
    }

    public function find(int $id): ?ReservationToken
    {
        return $this->model->find($id);
    }

    public function findByToken(string $token): ?ReservationToken
    {
        return $this->model->where('token', $token)->first();
    }

    public function create(array $data): ReservationToken
    {
        return $this->model->create($data);
    }

    public function update(int $id, array $data): ?ReservationToken
    {
        $reservationToken = $this->model->find($id);
        if (!$reservationToken) return null;
        $reservationToken->update($data);
        return $reservationToken;
    }

    public function delete(int $id): bool
    {
        $reservationToken = $this->model->find($id);
        if (!$reservationToken) {
            return false;
        }
        return $reservationToken->delete();
    }
}
