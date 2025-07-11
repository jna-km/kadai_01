<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Models\Service;

class ServiceController extends Controller
{
    /**
     * サービス一覧を取得する
     */
    public function index()
    {
        return response()->json([
            'message' => 'サービス一覧を取得しました。',
            'data' => Service::all()
        ], 200);
    }

    /**
     * 新しいサービスを登録する
     */
    public function store(StoreServiceRequest $request)
    {
        $service = Service::create($request->validated());
        return response()->json([
            'message' => 'サービスを登録しました。',
            'data' => $service
        ], 201);
    }

    /**
     * 指定したサービスの詳細を取得する
     */
    public function show(string $id)
    {
        $service = Service::findOrFail($id);
        return response()->json([
            'message' => 'サービス詳細を取得しました。',
            'data' => $service
        ], 200);
    }

    /**
     * 指定したサービス情報を更新する
     */
    public function update(UpdateServiceRequest $request, string $id)
    {
        $service = Service::findOrFail($id);
        $service->update($request->validated());
        return response()->json([
            'message' => 'サービス情報を更新しました。',
            'data' => $service
        ], 200);
    }

    /**
     * 指定したサービスを削除する
     */
    public function destroy(string $id)
    {
        $service = Service::findOrFail($id);
        $service->delete();
        return response()->json(null, 204);
    }
}
