<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;
use App\Models\Operator;

/**
 * 勤務時間（WorkingHour）モデル
 *
 * @property int $id
 * @property int $operator_id
 * @property int $weekday
 * @property Carbon $start_time
 * @property Carbon $end_time
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * 担当オペレーターに紐づく曜日ごとの勤務時間帯を管理。
 */
class WorkingHour extends Model
{
    use HasFactory;

    protected $fillable = [
        'operator_id',
        'weekday',     // 曜日（0〜6など、日曜始まり）
        'start_time',  // 開始時刻
        'end_time',    // 終了時刻
    ];

    /**
     * 型変換の定義
     */
    protected $casts = [
        'start_time' => 'datetime:H:i:s',
        'end_time' => 'datetime:H:i:s',
    ];

    /**
     * 担当オペレーターとの関連
     */
    public function operator(): BelongsTo
    {
        return $this->belongsTo(Operator::class);
    }
}
