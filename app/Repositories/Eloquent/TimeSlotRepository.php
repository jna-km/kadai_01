<?php

namespace App\Repositories\Eloquent;

use App\Models\TimeSlot;
use App\Repositories\Contracts\TimeSlotRepositoryInterface;

class TimeSlotRepository implements TimeSlotRepositoryInterface
{
    protected TimeSlot $model;

    public function __construct(TimeSlot $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        return $this->model->all();
    }

    public function find(int $id)
    {
        return $this->model->findOrFail($id);
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update(int $id, array $data)
    {
        $timeSlot = $this->model->findOrFail($id);
        $timeSlot->update($data);
        return $timeSlot;
    }

    public function delete(int $id)
    {
        return $this->model->destroy($id);
    }
}
