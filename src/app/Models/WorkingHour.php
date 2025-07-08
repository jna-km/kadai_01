<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * 勤務時間（WorkingHour）モデル
 *
 * @property int $weekday
 * @property \Carbon\Carbon $start_time
 * @property \Carbon\Carbon $end_time
 */
class WorkingHour extends Model
{
    use HasFactory;

    protected $fillable = [
        'weekday',     // 曜日（0〜6など、日曜始まり）
        'start_time',  // 開始時刻
        'end_time',    // 終了時刻
    ];

    protected $casts = [
        'start_time' => 'datetime:H:i:s',
        'end_time' => 'datetime:H:i:s',
    ];
}
