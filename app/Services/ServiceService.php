<?php

namespace App\Services;

use App\Repositories\Contracts\ServiceRepositoryInterface;

class ServiceService
{
    protected $serviceRepository;

    /**
     * @param ServiceRepositoryInterface $serviceRepository
     */
    public function __construct(ServiceRepositoryInterface $serviceRepository)
    {
        $this->serviceRepository = $serviceRepository;
    }

    /**
     * サービス一覧を取得
     *
     * @return \Illuminate\Support\Collection
     */
    public function getAll()
    {
        return $this->serviceRepository->all();
    }

    /**
     * サービスをIDで取得
     *
     * @param int $id
     * @return mixed
     */
    public function getById(int $id)
    {
        return $this->serviceRepository->find($id);
    }

    /**
     * サービスを新規作成
     *
     * @param array $data
     * @return mixed
     */
    public function create(array $data)
    {
        return $this->serviceRepository->create($data);
    }

    /**
     * サービスを更新
     *
     * @param int $id
     * @param array $data
     * @return mixed
     */
    public function update(int $id, array $data)
    {
        return $this->serviceRepository->update($id, $data);
    }

    /**
     * サービスを削除
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id)
    {
        return $this->serviceRepository->delete($id);
    }
}
