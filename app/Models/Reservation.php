<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;
use App\Models\User;
use App\Models\Operator;
use App\Models\Service;

/**
 * 予約（Reservation）
 *
 * @property int $id
 * @property int $user_id
 * @property int $operator_id
 * @property int $service_id
 * @property int $duration
 * @property Carbon $date
 * @property Carbon $start_time
 * @property Carbon $end_time
 * @property string $status
 * @property string|null $notes
 * @property Carbon|null $cancelled_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * ユーザーとオペレーターに紐づく予約情報を管理するモデル。
 */
class Reservation extends Model
{
    use HasFactory;
    //

    // 一括代入を許可するカラム（フォームなどからの登録用）
    protected $fillable = [
        'user_id',         // 予約を行ったユーザーID
        'operator_id',     // 対応するオペレーターID（管理者）
        'service_id',    // サービスID
        'duration',        // 所要時間（分などの整数）
        'date',            // 予約日
        'start_time',      // 開始時間
        'end_time',        // 終了時間
        'status',          // ステータス（reserved など）
        'notes',           // 備考
        'cancelled_at',    // キャンセル日時（nullable）
    ];

    // 自動的に型変換するカラムの定義
    protected $casts = [
        'date' => 'date',                  // 予約日を日付型にキャスト
        'start_time' => 'datetime:H:i:s',  // 開始時間を時刻型にキャスト
        'end_time' => 'datetime:H:i:s',    // 終了時間を時刻型にキャスト
        'cancelled_at' => 'datetime',      // キャンセル日時を日付型にキャスト
    ];

    /**
     * リレーション：この予約を行ったユーザー
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * リレーション：この予約を受けるオペレーター（管理者）
     */
    public function operator(): BelongsTo
    {
        return $this->belongsTo(Operator::class);
    }

    /**
     * リレーション：この予約に紐づくサービス
     */
    public function service(): BelongsTo
    {
        return $this->belongsTo(Service::class);
    }
}
