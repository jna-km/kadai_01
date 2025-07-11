<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Reservation;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * 予約確認トークン（ReservationToken）
 *
 * @property int $id
 * @property int $reservation_id
 * @property string $token
 * @property Carbon|null $expired_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * トークン経由で予約確認を行うための一時的なモデル。
 * 対応する予約と1対1でリレーションを持つ。
 */
class ReservationToken extends Model
{
    use HasFactory;

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
     */
    public function reservation(): BelongsTo
    {
        return $this->belongsTo(Reservation::class);
    }
}
