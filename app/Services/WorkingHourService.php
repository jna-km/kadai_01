<?php

namespace App\Services;

use App\Repositories\Contracts\WorkingHourRepositoryInterface;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class WorkingHourService
{
    protected WorkingHourRepositoryInterface $workingHourRepository;

    public function __construct(WorkingHourRepositoryInterface $workingHourRepository)
    {
        $this->workingHourRepository = $workingHourRepository;
    }

    public function getAll()
    {
        return $this->workingHourRepository->all();
    }

    public function getById(int $id)
    {
        return $this->workingHourRepository->find($id);
    }

    public function create(array $data)
    {
        return $this->workingHourRepository->create($data);
    }

    public function update(int $id, array $data)
    {
        // 存在確認の例外はここで捕捉し、コントローラに投げる
        return $this->workingHourRepository->update($id, $data);
    }

    public function delete(int $id): bool
    {
        $deleted = $this->workingHourRepository->delete($id);
        return $deleted > 0;
    }
}
