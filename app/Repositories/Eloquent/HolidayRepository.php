<?php

namespace App\Repositories\Eloquent;

use App\Models\Holiday;
use App\Repositories\Contracts\HolidayRepositoryInterface;

class HolidayRepository implements HolidayRepositoryInterface
{
    protected Holiday $model;

    public function __construct(Holiday $model)
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
        $holiday = $this->model->findOrFail($id);
        $holiday->update($data);
        return $holiday;
    }

    public function delete(int $id)
    {
        return $this->model->destroy($id);
    }
}
