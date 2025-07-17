<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreServiceRequest;
use App\Http\Requests\UpdateServiceRequest;
use App\Models\Service;
use Illuminate\Support\Facades\Auth;

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
    public function destroy(Service $service)
    {
        // 認可チェック: このサービスが、現在認証されているユーザー（オペレーター）のものであるか確認
        // Auth::id() は、認証済みユーザーのIDを返す
        if ($service->operator_id !== Auth::id()) {
            return response()->json(['message' => '権限がありません。'], 403);
        }

        // 予約で使用されているかチェック
        if ($service->reservations()->count() > 0) {
            return response()->json([
                'message' => 'このサービスは予約で使用されているため削除できません。'
            ], 409); // 409 Conflict: リソースの現在の状態と競合するため、リクエストを完了できない
        }

        $service->delete();

        // 成功時は204 No Contentを返すのが一般的
        return response()->noContent(); 
    }
}
