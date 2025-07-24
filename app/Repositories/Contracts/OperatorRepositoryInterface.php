<?php

namespace App\Repositories\Contracts;

/**
 * OperatorRepositoryInterface
 *
 * オペレーター関連のデータアクセスを定義するインターフェース。
 * 実装クラスはDB操作を行い、ビジネスロジック層（サービス）から呼び出される。
 */
interface OperatorRepositoryInterface
{
    /**
     * 全オペレーターを取得
     *
     * @return \Illuminate\Support\Collection
     */
    public function all();

    /**
     * IDでオペレーターを取得
     *
     * @param int $id
     * @return mixed
     */
    public function find(int $id);

    /**
     * オペレーターを新規作成
     *
     * @param array $data
     * @return mixed
     */
    public function create(array $data);

    /**
     * オペレーター情報を更新
     *
     * @param int $id
     * @param array $data
     * @return mixed
     */
    public function update(int $id, array $data);

    /**
     * オペレーターを削除
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id);

    public function getPublicList();
    public function getPublicById(int $id);
}
