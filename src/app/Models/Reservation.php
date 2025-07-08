<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;
use App\Models\Operator;

class Reservation extends Model
{
    use HasFactory;
    //

    // 一括代入を許可するカラム（フォームなどからの登録用）
    protected $fillable = [
        'user_id',         // 予約を行ったユーザーID
        'operator_id',     // 対応するオペレーターID（管理者）
        'service_name',    // サービス名（IDではなく文字列）
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
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * リレーション：この予約を受けるオペレーター（管理者）
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function operator()
    {
        return $this->belongsTo(Operator::class);
    }
}
