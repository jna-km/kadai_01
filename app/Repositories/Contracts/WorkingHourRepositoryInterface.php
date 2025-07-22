<?php

namespace App\Repositories\Contracts;

interface WorkingHourRepositoryInterface
{
    /**
     * 全ての勤務時間を取得
     *
     * @return \Illuminate\Support\Collection
     */
    public function all();


    public function find(int $id);

    /**
     * 勤務時間を登録
     *
     * @param array $data
     * @return \App\Models\WorkingHour
     */
    public function create(array $data);

    /**
     * 勤務時間を更新
     *
     * @param int $id
     * @param array $data
     * @return \App\Models\WorkingHour
     */
    public function update(int $id, array $data);

    /**
     * 勤務時間を削除
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id);
}
