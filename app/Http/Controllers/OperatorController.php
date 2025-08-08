<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreOperatorRequest;
use App\Http\Requests\UpdateOperatorRequest;
use App\Services\OperatorService;
use Illuminate\Http\JsonResponse;

class OperatorController extends Controller
{
    protected OperatorService $operatorService;

    public function __construct(OperatorService $operatorService)
    {
        $this->operatorService = $operatorService;
    }

    /**
     * オペレーター一覧を取得
     *
     * @return JsonResponse
     */
    public function index()
    {
        return response()->json([
            'message' => 'オペレーター一覧を取得しました。',
            'data' => $this->operatorService->getAll()
        ], 200);
    }

    /**
     * 新しいオペレーターを登録
     *
     * @param StoreOperatorRequest $request
     * @return JsonResponse
     */
    public function store(StoreOperatorRequest $request)
    {
        $operator = $this->operatorService->create($request->validated());
        return response()->json([
            'message' => 'オペレーターを登録しました。',
            'data' => $operator
        ], 201);
    }

    /**
     * 指定IDのオペレーター詳細を取得
     *
     * @param int $id
     * @return JsonResponse
     */
    public function show(int $id)
    {
        $operator = $this->operatorService->getById($id);
        return response()->json([
            'message' => 'オペレーター詳細を取得しました。',
            'data' => $operator
        ], 200);
    }

    /**
     * 指定IDのオペレーター情報を更新
     *
     * @param UpdateOperatorRequest $request
     * @param int $id
     * @return JsonResponse
     */
    public function update(UpdateOperatorRequest $request, int $id)
    {
        $operator = $this->operatorService->update($id, $request->validated());
        return response()->json([
            'message' => 'オペレーター情報を更新しました。',
            'data' => $operator
        ], 200);
    }

    /**
     * 指定IDのオペレーターを削除
     *
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(int $id)
    {
        $this->operatorService->delete($id);
        return response()->json(null, 204);
    }

    /**
     * 公開用オペレーター情報を取得
     *
     * @param int $id
     * @return JsonResponse
     */
    public function showPublic(int $id)
    {
        $operator = $this->operatorService->getPublicById($id);

        return response()->json([
            'message' => 'オペレーター情報を取得しました。',
            'data' => $operator
        ], 200);
    }

    /**
     * 公開用オペレーター一覧を取得
     *
     * @return JsonResponse
     */
    public function publicIndex()
    {
        $operators = $this->operatorService->getPublicList();

        return response()->json([
            'message' => '公開用オペレーター一覧を取得しました。',
            'data' => $operators
        ], 200);
    }
}
