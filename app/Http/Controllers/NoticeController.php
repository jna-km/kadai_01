<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreNoticeRequest;
use App\Http\Requests\UpdateNoticeRequest;
use App\Services\NoticeService;

class NoticeController extends Controller
{
    protected NoticeService $noticeService;

    public function __construct(NoticeService $noticeService)
    {
        $this->noticeService = $noticeService;
    }

    /**
     * お知らせ一覧を取得する
     */
    public function index()
    {
        $notices = $this->noticeService->getAll();
        return response()->json([
            'message' => 'お知らせ一覧を取得しました。',
            'data' => $notices
        ], 200);
    }

    /**
     * 新しいお知らせを登録する
     */
    public function store(StoreNoticeRequest $request)
    {
        $notice = $this->noticeService->create($request->validated());
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
        $notice = $this->noticeService->getById((int)$id);
        if (!$notice) {
            return response()->json(['message' => '指定されたお知らせは見つかりません。'], 404);
        }
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
        $notice = $this->noticeService->getById((int)$id);
        if (!$notice) {
            return response()->json(['message' => '指定されたお知らせは見つかりません。'], 404);
        }
        $updatedNotice = $this->noticeService->update((int)$id, $request->validated());
        return response()->json([
            'message' => 'お知らせ情報を更新しました。',
            'data' => $updatedNotice
        ], 200);
    }

    /**
     * 指定したお知らせを削除する
     */
    public function destroy(string $id)
    {
        $notice = $this->noticeService->getById((int)$id);
        if (!$notice) {
            return response()->json(['message' => '指定されたお知らせは見つかりません。'], 404);
        }
        $this->noticeService->delete((int)$id);
        return response()->json(null, 204);
    }
}
