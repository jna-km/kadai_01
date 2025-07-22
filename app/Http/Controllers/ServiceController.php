<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Models\Service;
use Illuminate\Support\Facades\Auth;
use App\Services\ServiceService;

class ServiceController extends Controller
{
    protected ServiceService $serviceService;

    public function __construct(ServiceService $serviceService)
    {
        $this->serviceService = $serviceService;
    }

    /**
     * サービス一覧を取得する
     */
    public function index()
    {
        return response()->json([
            'message' => 'サービス一覧を取得しました。',
            'data' => $this->serviceService->getAll()
        ], 200);
    }

    /**
     * 新しいサービスを登録する
     */
    public function store(StoreServiceRequest $request)
    {
        $validated = $request->validated();
        $validated['operator_id'] = Auth::guard('operator')->id();
        $service = $this->serviceService->create($validated);
        return response()->json([
            'message' => 'サービスを登録しました。',
            'data' => $service
        ], 201);
    }

    /**
     * 指定したサービスの詳細を取得する
     */
    public function show(int $id)
    {
        $service = $this->serviceService->getById($id);
        return response()->json([
            'message' => 'サービス詳細を取得しました。',
            'data' => $service
        ], 200);
    }

    /**
     * 指定したサービス情報を更新する
     */
    public function update(UpdateServiceRequest $request, int $id)
    {
        $service = $this->serviceService->getById($id);
         if ($service->operator_id !== Auth::guard('operator')->id()) {
            return response()->json(['message' => '権限がありません。'], 403);
        }
        $service = $this->serviceService->update($service->id, $request->validated());
        return response()->json([
            'message' => 'サービス情報を更新しました。',
            'data' => $service
        ], 200);
    }

    /**
     * 指定したサービスを削除する
     */
    public function destroy(Service $service)
    {
        if ($service->operator_id !== Auth::guard('operator')->id()) {
            return response()->json(['message' => '権限がありません。'], 403);
        }
        if ($service->reservations()->count() > 0) {
            return response()->json([
                'message' => 'このサービスは予約で使用されているため削除できません。'
            ], 409);
        }
        $this->serviceService->delete($service->id);
        return response()->noContent(); 
    }
}
