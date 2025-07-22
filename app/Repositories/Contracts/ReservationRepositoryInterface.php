<?php

namespace App\Repositories\Contracts;

interface ReservationRepositoryInterface
{
    public function getAll();
    public function findById(int $id);
    public function create(array $data);
    public function update(int $id, array $data);
    public function delete(int $id);
    public function getByUserId(int $userId);
    public function getByOperatorId(int $operatorId);
}
