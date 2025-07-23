<?php

namespace App\Repositories\Eloquent;

use App\Models\Service;
use App\Repositories\Contracts\ServiceRepositoryInterface;

class ServiceRepository implements ServiceRepositoryInterface
{
    protected $model;

    public function __construct(Service $model)
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

    public function update(int $id, array $data): ?Service
    {
        $service = $this->model->find($id);
        if (!$service) return null;
        $service->update($data);
        return $service;
    }

    public function delete(int $id)
    {
        $service = $this->model->find($id);
        if (!$service) {
            return false;
        }
        return $service->delete();
    }
}
