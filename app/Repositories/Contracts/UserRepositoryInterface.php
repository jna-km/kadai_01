<?php

namespace App\Repositories\Contracts;

use Illuminate\Database\Eloquent\Collection;
use App\Models\User;

interface UserRepositoryInterface
{
    public function all();

    /**
     * 指定IDのユーザーを取得（存在しない場合はnull）
     *
     * @param int $id
     * @return User|null
     */
    public function find(int $id): ?User;

    /**
     * ユーザーを作成
     *
     * @param array $data
     * @return User
     */
    public function create(array $data): User;

    /**
     * ユーザーを更新
     *
     * @param int $id
     * @param array $data
     * @return User|null
     */
    public function update(int $id, array $data): ?User;

    /**
     * ユーザーを削除
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool;
}
