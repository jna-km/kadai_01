<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNoticeRequest;
use App\Http\Requests\UpdateNoticeRequest;
use App\Models\Notice;

class NoticeController extends Controller
{
    /**
     * お知らせ一覧を取得する
     */
    public function index()
    {
        return response()->json([
            'message' => 'お知らせ一覧を取得しました。',
            'data' => Notice::all()
        ], 200);
    }

    /**
     * 新しいお知らせを登録する
     */
    public function store(StoreNoticeRequest $request)
    {
        $notice = Notice::create($request->all());
        return response()->json([
            'message' => 'お知らせを登録しました。',
            'data' => $notice
        ], 201);
    }

    /**
     * 指定したお知らせの詳細を取得する
     */
    public function show(string $id)
    {
        $notice = Notice::findOrFail($id);
        return response()->json([
            'message' => 'お知らせ詳細を取得しました。',
            'data' => $notice
        ], 200);
    }

    /**
     * 指定したお知らせ情報を更新する
     */
    public function update(UpdateNoticeRequest $request, string $id)
    {
        $notice = Notice::findOrFail($id);
        $notice->update($request->all());
        return response()->json([
            'message' => 'お知らせ情報を更新しました。',
            'data' => $notice
        ], 200);
    }

    /**
     * 指定したお知らせを削除する
     */
    public function destroy(string $id)
    {
        $notice = Notice::findOrFail($id);
        $notice->delete();
        return response()->json(null, 204);
    }
}
