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

    public function update(int $id, array $data)
    {
        $item = $this->model->findOrFail($id);
        $item->update($data);
        return $item;
    }

    public function delete(int $id)
    {
        return $this->model->destroy($id);
    }
}
