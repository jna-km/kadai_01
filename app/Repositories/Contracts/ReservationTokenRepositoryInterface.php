<?php

namespace App\Repositories\Contracts;

use App\Models\ReservationToken;
use Illuminate\Support\Collection;

interface ReservationTokenRepositoryInterface
{
    /** @return Collection|ReservationToken[] */
    public function all(): Collection;

    public function find(int $id): ?ReservationToken;

    public function findByToken(string $token): ?ReservationToken;

    public function create(array $data): ReservationToken;

    public function update(int $id, array $data): ReservationToken;

    public function delete(int $id): bool;
}
