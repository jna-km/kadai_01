<?php

namespace App\Repositories\Eloquent;

use App\Models\WorkingHour;
use App\Repositories\Contracts\WorkingHourRepositoryInterface;

class WorkingHourRepository implements WorkingHourRepositoryInterface
{
    protected WorkingHour $model;

    public function __construct(WorkingHour $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        return $this->model->all();
    }

    public function find(int $id)
    {
        return $this->model->find($id);
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update(int $id, array $data): ?WorkingHour
    {
        $workingHour = $this->model->find($id);
        if (!$workingHour) return null;
        $workingHour->update($data);
        return $workingHour;
    }

    public function delete(int $id)
    {
        $workingHour = $this->model->find($id);
        if (!$workingHour) {
            return false;
        }
        return $workingHour->delete();
    }
}
