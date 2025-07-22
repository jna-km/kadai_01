<?php

namespace App\Services;

use App\Repositories\Contracts\NoticeRepositoryInterface;

class NoticeService
{
    protected NoticeRepositoryInterface $noticeRepository;

    public function __construct(NoticeRepositoryInterface $noticeRepository)
    {
        $this->noticeRepository = $noticeRepository;
    }

    public function getAll()
    {
        return $this->noticeRepository->all();
    }

    public function getById(int $id)
    {
        return $this->noticeRepository->find($id);
    }

    public function create(array $data)
    {
        return $this->noticeRepository->create($data);
    }

    public function update(int $id, array $data)
    {
        return $this->noticeRepository->update($id, $data);
    }

    public function delete(int $id)
    {
        return $this->noticeRepository->delete($id);
    }
}
