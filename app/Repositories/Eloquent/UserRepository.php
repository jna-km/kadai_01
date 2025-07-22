<?php

namespace App\Repositories\Eloquent;

use App\Models\User;
use App\Repositories\Contracts\UserRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

class UserRepository implements UserRepositoryInterface
{
    protected User $model;

    public function __construct(User $model)
    {
        $this->model = $model;
    }

    public function all()
    {
        return $this->model->all();
    }

    /**
     * IDでユーザーを検索（存在しない場合はnullを返す）
     *
     * @param int $id
     * @return User|null
     */
    public function find(int $id): ?User
    {
        return $this->model->find($id);
    }

    /**
     * ユーザーを作成
     *
     * @param array $data
     * @return User
     */
    public function create(array $data): User
    {
        return $this->model->create($data);
    }

    /**
     * ユーザーを更新
     *
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function update(int $id, array $data): bool
    {
        $item = $this->model->findOrFail($id);
        return $item->update($data);
    }

    /**
     * ユーザーを削除
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool
    {
        return (bool)$this->model->destroy($id);
    }
}
