<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Reservation;

class ReservationToken extends Model
{
    protected $fillable = [
        'reservation_id',  // 対応する予約のID
        'token',           // 確認用トークン文字列（URLに含めるなどに利用）
        'expired_at',      // トークンの有効期限（一定時間後に無効化）
    ];

    protected $casts = [
        'expired_at' => 'datetime',  // 日付として自動変換（Carbonインスタンス化）
    ];

    /**
     * リレーション：このトークンが属する予約
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function reservation()
    {
        return $this->belongsTo(Reservation::class);
    }
}
