<?php

namespace App\Repositories\Eloquent;

use App\Models\Notice;
use App\Repositories\Contracts\NoticeRepositoryInterface;

class NoticeRepository implements NoticeRepositoryInterface
{
    protected Notice $model;

    public function __construct(Notice $model)
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

    public function update(int $id, array $data): ?Notice
    {
        $notice = $this->model->find($id);
        if (!$notice) return null;
        $notice->update($data);
        return $notice;
    }

    public function delete(int $id)
    {
        $notice = $this->model->find($id);
        if (!$notice) {
            return false;
        }
        return $notice->delete();
    }
}
