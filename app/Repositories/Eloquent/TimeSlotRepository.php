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
        return $this->model->find($id);
    }

    public function create(array $data)
    {
        return $this->model->create($data);
    }

    public function update(int $id, array $data): ?TimeSlot
    {
        $timeSlot = $this->model->find($id);
        if (!$timeSlot) return null;
        $timeSlot->update($data);
        return $timeSlot;
    }

    public function delete(int $id)
    {
        $timeSlot = $this->model->find($id);
        if (!$timeSlot) {
            return false;
        }
        return $timeSlot->delete();
    }
}
