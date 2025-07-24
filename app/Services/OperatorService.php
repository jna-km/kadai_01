<?php

namespace App\Services;

use App\Repositories\Contracts\OperatorRepositoryInterface;
use App\Models\Operator;
use Illuminate\Support\Collection;
/**
 * OperatorService
 *
 * オペレーター関連のビジネスロジックを管理するサービスクラス。
 * Controllerから呼び出され、Repositoryを介してデータ操作を行う。
 */
class OperatorService
{
    /**
     * @var OperatorRepositoryInterface
     * オペレーターリポジトリインターフェース
     */
    protected OperatorRepositoryInterface $operatorRepository;

    /**
     * コンストラクタ
     *
     * @param OperatorRepositoryInterface $operatorRepository
     */
    public function __construct(OperatorRepositoryInterface $operatorRepository)
    {
        $this->operatorRepository = $operatorRepository;
    }

    /**
     * すべてのオペレーターを取得
     *
     * @return mixed
     */
    public function getAll()
    {
        return $this->operatorRepository->all();
    }

    /**
     * 指定IDのオペレーターを取得
     *
     * @param int $id
     * @return mixed
     */
    public function getById(int $id)
    {
        return $this->operatorRepository->find($id);
    }

    /**
     * 新しいオペレーターを作成
     *
     * @param array $data
     * @return mixed
     */
    public function create(array $data)
    {
        return $this->operatorRepository->create($data);
    }

    /**
     * オペレーター情報を更新
     *
     * @param int $id
     * @param array $data
     * @return mixed
     */
    public function update(int $id, array $data)
    {
        return $this->operatorRepository->update($id, $data);
    }

    /**
     * オペレーターを削除
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id)
    {
        return $this->operatorRepository->delete($id);
    }

    /**
     * 公開用オペレーター一覧を取得
     *
     * @return Collection
     */
    public function getPublicList()
    {
        return $this->operatorRepository->getPublicList();
    }

    /**
     * 公開用オペレーター情報を取得
     *
     * @param int $id
     * @return Operator
     */
    public function getPublicById(int $id)
    {
        return $this->operatorRepository->getPublicById($id);
    }
}
