<?php

namespace App\Repositories\Contracts;

use Illuminate\Database\Eloquent\Collection;
use App\Models\Notice;


interface NoticeRepositoryInterface
{
    /**
     * 全件取得
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function all();

    /**
     * IDで取得（失敗時404）
     *
     * @param int $id
     * @return \App\Models\Notice
     */
    public function find(int $id);

    /**
     * 新規作成
     *
     * @param array $data
     * @return \App\Models\Notice
     */
    public function create(array $data);

    /**
     * 更新
     *
     * @param int $id
     * @param array $data
     * @return \App\Models\Notice
     */
    public function update(int $id, array $data);

    /**
     * 削除
     *
     * @param int $id
     * @return bool|null
     */
    public function delete(int $id);
}
