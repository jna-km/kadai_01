<?php

namespace App\Repositories\Eloquent;

use App\Models\Operator;
use App\Repositories\Contracts\OperatorRepositoryInterface;

class OperatorRepository implements OperatorRepositoryInterface
{
    protected Operator $model;

    public function __construct(Operator $model)
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

    public function update(int $id, array $data): ?Operator
    {
        $operator = $this->model->find($id);
        if (!$operator) return null;
        $operator->update($data);
        return $operator;
    }

    public function delete(int $id)
    {
        $operator = $this->model->find($id);
        if (!$operator) {
            return false;
        }
        return $operator->delete();
    }
}
